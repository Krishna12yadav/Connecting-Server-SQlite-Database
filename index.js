const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "goodreads.db");
let db = null;
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Connected to Database");
      console.log("Server is running at  PORT 3000");
    });
  } catch (e) {
    console.log(`DB ERROR:${e.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();

app.get("/books/", async (req, res) => {
  const getBooksQuery = `
    SELECT * FROM book ORDER BY book_id`;
  const booksArray = await db.all(getBooksQuery);
  res.send(booksArray);
});
