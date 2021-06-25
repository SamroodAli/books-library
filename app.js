let myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(name, author, pages, read) {
  const newBook = new Book(name, author, pages, read);
  myLibrary.push(newBook);
}

const books = document.getElementById("books");

function AddToBooksList(bookName) {
  const book = document.createElement("li");
  const title = document.createTextNode(bookName);
  book.appendChild(title);
  books.appendChild(book);
}

function printBooks() {
  books.innerHTML = "";
  myLibrary.forEach((book) => AddToBooksList(book.name));
}

const bookForm = document.getElementById("newBookForm");
const newBookButton = document.getElementById("addBook");

function visibilityToggler() {
  bookForm.classList.toggle("hidden");
  bookForm.classList.toggle("visible");
}
newBookButton.addEventListener("click", visibilityToggler);

function onNewBookSubmit() {}
bookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const bookData = bookForm.elements;
  const name = bookData[0].value;
  const author = bookData[1].value;
  const pages = bookData[2].value;
  const read = Boolean(bookData[3].value);
  addBookToLibrary(name, author, pages, read);
  printBooks();
});

function addBookOnScreen(bookName, author, pages, read) {
  const card = document.createElement("div");
  card.classList.add("card");

  const name = document.createElement("h5");
  name.innerHTML = bookName;
  name.classList.add("card-title");

  const texts = new Array(3).map((ele) => {
    const p = document.createElement("p");
    p.classList.add("card-text");
  });

  [author, pages, read] = texts;
  author.innerHTML = author;
  pages.innerHTML = pages;
  read.innerHTML = read;

  card.append([name, author, pages, read]);
  return card;
}
