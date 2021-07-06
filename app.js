const myLibrary = [];
const books = document.getElementById("books");

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

function bookButton(caption, callback) {
  const btn = element("button", caption, "btn btn-primary");
  btn.addEventListener("click", callback);
  return btn;
}

function printBooks() {
  books.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const bookContent = newBookCard(book, index);
    books.appendChild(bookContent);
  });
}

function newBookCard({ name, author, pages, read }, index) {
  function reprintBooks() {
    books.innerHTML = "";
    myLibrary.forEach((book, index) => {
      const bookContent = newBookCard(book, index);
      books.appendChild(bookContent);
    });
  }

  function newCard() {
    const card = element("div", undefined, "card");
    card.setAttribute("data-index", String(index));
    return card;
  }
  const card = newCard();

  function insertToCard(element) {
    card.appendChild(element);
  }

  function bookCaption(ele) {
    return element("p", ele.caption + ele.content, "card-text");
  }

  function newBook() {
    const bookName = element("h5", name, "card-title");
    insertToCard(bookName);
    return bookName;
  }

  function newButton(title, callback) {
    const button = bookButton(title, callback);
    insertToCard(button);
  }

  function changeReadStatus() {
    const currentBook = myLibrary[card.dataset.index];
    currentBook.read = !currentBook.read;
    reprintBooks();
  }

  function removeBook() {
    myLibrary.splice(card.dataset.index, 1);
    reprintBooks();
  }

  newBook();

  const bookDetails = [
    { content: author, caption: "Author :" },
    { content: pages, caption: "Number of pages :" },
    { content: read, caption: "Read Status :" },
  ].map(bookCaption);

  bookDetails.forEach(insertToCard);

  newButton("Remove book", removeBook);
  newButton("Change read status", changeReadStatus);

  return card;
}

const bookForm = document.getElementById("newBookForm");
const readCheck = document.getElementById("readStatus");
const newBookButton = document.getElementById("addBook");

function visibilityToggler() {
  bookForm.classList.toggle("hidden");
  bookForm.classList.toggle("visible");
}

newBookButton.addEventListener("click", visibilityToggler);

bookForm.addEventListener("submit", (event) => {
  const bookData = bookForm.elements;
  event.preventDefault();
  const name = bookData[0].value;
  const author = bookData[1].value;
  const pages = bookData[2].value;
  const read = Boolean(readCheck.checked);
  addBookToLibrary(name, author, pages, read);
  printBooks();
  bookForm.reset();
});
