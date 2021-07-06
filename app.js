const myLibrary = [];
const books = document.getElementById("books");

function element(ele, innerHtml, className) {
  const newElement = document.createElement(ele);

  if (innerHtml) {
    newElement.innerHTML = innerHtml;
  }

  if (className) {
    className
      .split(" ")
      .forEach((classKeyWord) => newElement.classList.add(classKeyWord));
  }
  return newElement;
}

function createCard(index) {
  const card = element("div", undefined, "card");
  card.setAttribute("data-index", String(index));
  return card;
}

function bookButton(caption, callback) {
  const btn = element("button", caption, "btn btn-primary");
  btn.addEventListener("click", callback);
  return btn;
}

function insertTo(parent, child) {
  parent.appendChild(child);
}

function asBookCaption(ele) {
  return element("p", ele.caption + ele.content, "card-text");
}

function newBookIn(card, book) {
  const bookName = element("h5", book, "card-title");
  insertTo(card, bookName);
  return bookName;
}

function newButtonIn(card, title, callback) {
  const button = bookButton(title, callback);
  insertTo(card, button);
}

function printBooksAs(newBookCard) {
  books.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const bookContent = newBookCard(index, book);
    books.appendChild(bookContent);
  });
}

function changeReadStatusIn(card, newBookCard) {
  const currentBook = myLibrary[card.dataset.index];
  currentBook.read = !currentBook.read;
  printBooksAs(newBookCard);
}

function removeBookFrom(card, newBookCard) {
  myLibrary.splice(card.dataset.index, 1);
  printBooksAs(newBookCard);
}

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

function AddbookButtonGroupTo(currentCard, newBookCard) {
  newButtonIn(currentCard, "Remove book", () =>
    removeBookFrom(newBookCard, currentCard)
  );
  newButtonIn(currentCard, "Change read status", () =>
    changeReadStatusIn(newBookCard, currentCard)
  );
}

function newBookCard(index, { name, author, pages, read }) {
  const currentCard = createCard(index);
  newBookIn(currentCard, name);
  const bookDetails = [
    { content: author, caption: "Author :" },
    { content: pages, caption: "Number of pages :" },
    { content: read, caption: "Read Status :" },
  ].map(asBookCaption);
  bookDetails.forEach((book) => insertTo(currentCard, book));
  AddbookButtonGroupTo(currentCard, newBookCard);
  return currentCard;
}

function toggleVisibilityOf(form) {
  form.classList.toggle("hidden");
  form.classList.toggle("visible");
}

function submitBook(bookInfo, readStatus) {
  const [name, author, pages] = bookInfo;
  addBookToLibrary(name, author, pages, readStatus);
  printBooksAs(newBookCard);
}

function submit(form, event, readCheck) {
  event.preventDefault();
  const bookInfo = Array.from(form.elements).map((ele) => ele.value);
  const readStatus = Boolean(readCheck.checked);
  submitBook(bookInfo, readStatus);
  form.reset();
}

const form = document.getElementById("newBookForm");
const readCheck = document.getElementById("readStatus");
const newBookButton = document.getElementById("addBook");
newBookButton.addEventListener("click", () => toggleVisibilityOf(form));
form.addEventListener("submit", (event) => submit(form, event, readCheck));
