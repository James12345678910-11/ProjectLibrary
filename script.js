const myLibrary = [];


function formatBoolean(value) {
  return value ? "Yes" : "No";
}


function Book(title, author, pages, read) {

  if ( typeof pages !== 'number' ) {
    throw new Error("Pages must be a number")
  }
  if ( typeof read !== 'boolean' ) {
    throw new Error("Read must be a yes or no")
  }

  if (typeof title !== 'string') {
    throw new Error("Title must not be blank")
  }

  if (typeof author !== 'string') {
    throw new Error("Author must not be blank")
  }
  if (typeof pages !== 'number' || pages <= 0) {
    throw new Error("Pages must be a positive number")
  }
  this.id = crypto.randomUUID(); 
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, Read: ${formatBoolean(this.read)}`;
}

function addBookToLibrary(book) {
  const newBook = new Book(book.title, book.author, book.pages, book.read);
  myLibrary.push(newBook);
  saveLibrary();
}

function removeBookFromLibrary(bookId){
  const index = myLibrary.findIndex(book => book.id === bookId);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}


function displayBooks() {
  container.innerHTML = '';
  myLibrary.forEach(book => {
    const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
      title.textContent = book.title;
    const heading = document.createElement('h3');
      heading.textContent = book.title;
    const author = document.createElement('p');
      author.textContent = `Author: ${book.author}`;
    const pages = document.createElement('p');
      pages.textContent = `Pages: ${book.pages}`;
    const read = document.createElement('p');
      read.textContent = `Read: ${formatBoolean(book.read)}`;
    const addButton = document.createElement('button');
      addButton.classList.add('add-button');
      addButton.textContent = 'Add Book';
    const updateButton = document.createElement('button');
      updateButton.classList.add('update-button');
      updateButton.textContent = 'Update Book';
    const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.textContent = 'Delete Book';

    bookCard.appendChild(heading);
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(addButton);
    bookCard.appendChild(updateButton);
    bookCard.appendChild(deleteButton);
    container.appendChild(bookCard); 
  });
}