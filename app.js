let myLibrary = [];

function Book(name) {
  this.name = name
}

function addBookToLibrary(name) {
  const newBook = new Book(name)
  myLibrary.push(newBook)
}
