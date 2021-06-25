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

function AddToBooksList(book, index) {
  const bookContent = newBookCard(book, index);
  books.appendChild(bookContent);
}

function printBooks() {
  books.innerHTML = "";
  myLibrary.forEach((book, index) => AddToBooksList(book, index));
}

const bookForm = document.getElementById("newBookForm");
const readCheck = document.getElementById("readStatus");
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
  const read = Boolean(readCheck.checked);
  addBookToLibrary(name, author, pages, read);
  printBooks();
  bookForm.reset();
});

function newBookCard({ name, author, pages, read }, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-index", String(index));

  const bookName = document.createElement("h5");
  bookName.innerHTML = name;
  bookName.classList.add("card-title");

  card.appendChild(bookName);
  const bookDetails = [author, pages].map((ele) => {
    const p = document.createElement("p");
    p.classList.add("card-text");
    p.innerHTML = ele;
    return p;
  });

  const readStatus = document.createElement("p");
  readStatus.classList.add("card-text");
  readStatus.innerHTML = `Book Read: ${read}`;
  bookDetails.push(readStatus);

  bookDetails.forEach((element) => card.appendChild(element));
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("btn");
  removeBtn.classList.add("btn-primary");
  removeBtn.innerHTML = "Remove Book";

  removeBtn.addEventListener("click", function removeBook() {
    myLibrary.splice(card.dataset.index, 1);
    printBooks();
  });
  const changeReadBtn = document.createElement("button");
  changeReadBtn.classList.add("btn");
  changeReadBtn.classList.add("btn-primary");
  changeReadBtn.innerHTML = "Read";
  changeReadBtn.addEventListener("click", function removeBook() {
    let current_book = myLibrary[card.dataset.index];
    current_book.read = !current_book.read;
    printBooks();
  });

  card.appendChild(removeBtn);
  card.appendChild(changeReadBtn);
  console.log(myLibrary);
  return card;
}
