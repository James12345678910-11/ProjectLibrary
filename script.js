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

