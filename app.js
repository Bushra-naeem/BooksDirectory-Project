const express = require("express");
const app = express();

const booksRouter = require("./books");

app.use(express.json());

app.use("/api/v1/books", booksRouter);

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
