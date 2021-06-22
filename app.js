let myLibrary = [];

function Book(name) {
  this.name = name;
}

function addBookToLibrary(name) {
  const newBook = new Book(name);
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
  myLibrary.forEach(AddToBooksList);
}

const bookForm = document.getElementById("newBookForm");
const newBookButton = document.getElementById("addBook");

function visibilityToggler() {
  bookForm.classList.toggle("hidden");
  bookForm.classList.toggle("visible");
}
newBookButton.addEventListener("click", visibilityToggler);
