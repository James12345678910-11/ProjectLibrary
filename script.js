const myLibrary = [];
const container = document.getElementById('Booklist');
const dialog = document.getElementById('add-book');
const form = document.getElementById('book-form');
const openDialogBtn = document.getElementById('open-dialog');

// input fields
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

function formatBoolean(value) {
  return value ? "Yes" : "No";
} 

// program logic
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



BookAdd.prototype.toggleRead = function() {
  this.read = !this.read;
}
  

// display logic
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
      updateButton.dataset.id = book.id;
    const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.textContent = 'Delete Book';
      deleteButton.dataset.id = book.id;

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


// event listeners

container.addEventListener('click', (event) => {

  if (event.target.classList.contains('delete-button')) {
    const itemId = event.target.dataset.id;
    const ind = myLibrary.findIndex(book => book.id === itemId);
    if(ind !== -1) {
      myLibrary.splice(ind, 1);
      displayBooks();
    }
  }

  if (event.target.classList.contains('update-button')) {
    const bookId = event.target.dataset.id;
    const editingBook = myLibrary.find(book => book.id === bookId);

    if (editingBook) {
      editingBookId = bookId;
      titleInput.value = editingBook.title;
      authorInput.value = editingBook.author;
      pagesInput.value = editingBook.pages;
      readInput.toggle = editingBook.read;
      dialog.showModal();
    }
  }
});

openDialogBtn.addEventListener('click', () => {
  editingBookId = null;
  form.reset();
  dialog.showModal();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pages = parseInt(pagesInput.value);
  const read = readInput.checked;

  if (editingBookId) {
    const book = myLibrary.find(book => book.id === editingBookId);
    if (book) {
      book.title = title;
      book.author = author;
      book.pages = pages;
      book.read = read;
    }

    editingBookId = null;
  } else {
    BookAdd.addBookToLibrary(title, author, pages, read);
  };

  displayBooks();
  dialog.close();
  form.reset();
});