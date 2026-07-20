const myLibrary = [];
const container = document.getElementById('Booklist');


function formatBoolean(value) {
  return value ? "Yes" : "No";
} //will remove this shit. its not needed


class BookAdd {

  constructor(title, author, pages, read) {
  if ( typeof read !== 'boolean' ) {
  throw new Error("Read must be a true or false")
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

  static addBookToLibrary(title, author, pages, read) {
    let book = new BookAdd(title, author, pages, read);
    myLibrary.push(book);
    }
}

BookAdd.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, Read: ${formatBoolean(this.read)}`;
}

function removeBookFromLibrary(bookId){
  const index = myLibrary.findIndex(book => book.id === bookId);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

BookAdd.prototype.toggleRead = function() {
  this.read = !this.read;
}
  


function displayBooks() {
  container.innerHTML = '';
  myLibrary.forEach(book => {
    const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");
    const title = document.createElement('h3');
      title.textContent = book.title;
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

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);
    bookCard.appendChild(updateButton);
    bookCard.appendChild(deleteButton);
    container.appendChild(bookCard); 
  });
}


BookAdd.addBookToLibrary("The Fellowship of the Ring", "JRR Tolkien", 576, true);
BookAdd.addBookToLibrary("Harry Potter and the Philosophers Stone", "JK Rowling", 352, true);
BookAdd.addBookToLibrary("Blackflame", "Will Wight", 369, true);
BookAdd.addBookToLibrary("Mistborn", "Brandon Sanderson", 672, true);
BookAdd.addBookToLibrary("A Knight of the Seven Kingdoms", "George RR Martin", 368, true);
displayBooks();