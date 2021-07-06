const myLibrary = [];
const books = document.getElementById('books');

function element(ele, innerHtml, className) {
  const newElement = document.createElement(ele);

  if (innerHtml) {
    newElement.innerHTML = innerHtml;
  }

  if (className) {
    className
      .split(' ')
      .forEach((classKeyWord) => newElement.classList.add(classKeyWord));
  }
  return newElement;
}

function newCard(index) {
  const card = element('div', undefined, 'card');
  card.setAttribute('data-index', String(index));
  return card;
}

function bookButton(caption, callback) {
  const btn = element('button', caption, 'btn btn-primary');
  btn.addEventListener('click', callback);
  return btn;
}

function insertTo(card, element) {
  card.appendChild(element);
}

function bookCaption(ele) {
  return element('p', ele.caption + ele.content, 'card-text');
}

function newBookIn(card, book) {
  const bookName = element('h5', book, 'card-title');
  insertTo(card, bookName);
  return bookName;
}

function newButtonIn(card, title, callback) {
  const button = bookButton(title, callback);
  insertTo(card, button);
}

function changeReadStatusIn(card) {
  const currentBook = myLibrary[card.dataset.index];
  currentBook.read = !currentBook.read;
  printBooks();
}

function removeBookFrom(card) {
  myLibrary.splice(card.dataset.index, 1);
  printBooks();
}

function newBookCard(index, {
  name, author, pages, read,
}) {
  const card = newCard(index);
  newBookIn(card, name);

  const bookDetails = [
    { content: author, caption: 'Author :' },
    { content: pages, caption: 'Number of pages :' },
    { content: read, caption: 'Read Status :' },
  ].map(bookCaption);

  bookDetails.forEach((book) => insertTo(card, book));

  newButtonIn(card, 'Remove book', () => removeBookFrom(card));
  newButtonIn(card, 'Change read status', () => changeReadStatusIn(card));

  return card;
}

function printBooks() {
  books.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const bookContent = newBookCard(index, book);
    books.appendChild(bookContent);
  });
}

const form = document.getElementById('newBookForm');
const readCheck = document.getElementById('readStatus');
const newBookButton = document.getElementById('addBook');

function visibilityToggler() {
  form.classList.toggle('hidden');
  form.classList.toggle('visible');
}

newBookButton.addEventListener('click', visibilityToggler);

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

function submitBook(bookInfo, readStatus) {
  const [name, author, pages] = bookInfo;
  addBookToLibrary(name, author, pages, readStatus);
  printBooks();
}

function onFormSubmit(event) {
  event.preventDefault();
  const bookInfo = Array.from(form.elements).map((ele) => ele.value);
  const readStatus = Boolean(readCheck.checked);
  submitBook(bookInfo, readStatus);
  form.reset();
}

form.addEventListener('submit', onFormSubmit);
