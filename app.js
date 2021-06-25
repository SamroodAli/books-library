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

function AddToBooksList(book) {
  const bookContent = newBookCard(book);
  books.appendChild(bookContent);
}

function printBooks() {
  books.innerHTML = "";
  myLibrary.forEach((book) => AddToBooksList(book));
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
  bookForm.reset();
});

function newBookCard({ name, author, pages, read }) {
  const card = document.createElement("div");
  card.setAttribute("data-index", String(myLibrary.length - 1));
  card.classList.add("card");

  const bookName = document.createElement("h5");
  bookName.innerHTML = name;
  bookName.classList.add("card-title");

  card.appendChild(bookName);
  const bookDetails = [author, pages, read].map((ele) => {
    const p = document.createElement("p");
    p.classList.add("card-text");
    p.innerHTML = ele;
    return p;
  });

  bookDetails.forEach((element) => card.appendChild(element));
  const remove_button = document.createElement("button");
  remove_button.classList.add("btn");
  remove_button.classList.add("btn-primary");
  remove_button.innerHTML = "Submit";
  card.appendChild(remove_button);
  return card;
}
