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

function element(ele, innerHtml) {
  const element = document.createElement(ele);
  element.innerHTML = innerHtml;
  return element;
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

function bookButton(caption, callback) {
  const btn = element("button", caption);
  btn.classList.add("btn");
  btn.classList.add("btn-primary");
  btn.addEventListener("click", callback);
  return btn;
}

function newBookCard({ name, author, pages, read }, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-index", String(index));

  const bookName = element("h5", name);
  bookName.classList.add("card-title");

  card.appendChild(bookName);
  const bookDetails = [
    { content: author, caption: "Author :" },
    { content: pages, caption: "Number of pages :" },
    { content: read, caption: "Read Status :" },
  ].map((ele) => {
    const p = element("p", ele.caption + ele.content);
    p.classList.add("card-text");
    return p;
  });

  bookDetails.forEach((element) => card.appendChild(element));
  const removeBtn = bookButton("Remove book", () => {
    myLibrary.splice(card.dataset.index, 1);
    printBooks();
  });

  const changeReadBtn = bookButton("Change read status", () => {
    let current_book = myLibrary[card.dataset.index];
    current_book.read = !current_book.read;
    printBooks();
  });

  card.appendChild(removeBtn);
  card.appendChild(changeReadBtn);
  console.log(myLibrary);
  return card;
}
