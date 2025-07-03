"use strict"

let library = [];

function Book(id, title, author, category) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.category = category;
    return;
}

function addBookToLibrary(title, author, category) {
    const bookId = crypto.randomUUID();
    
    let book = new Book(bookId, title, author, category);
    library.push(book);    
    return;
}

function showLibrary() {
    let libraryContainer = document.querySelector('.library');
    console.log(libraryContainer)
    libraryContainer.innerHTML = ''; // Clear previous grid

    library.forEach((book) => {
        let card = document.createElement('div');
        
        console.log(card)
        console.log(book)

        card.innerHTML = `
            <span>
            <h3>${book.title}</h3>
            <p>By: ${book.author}</p>
            <span>
            `;
        console.log(card)

        libraryContainer.appendChild(card);
    })

}

function createLibrary() {
    addBookToLibrary("caca","caca","caca")
    addBookToLibrary("caca1","caca1","caca1")
    addBookToLibrary("caca2","caca2","caca2")
    addBookToLibrary("caca3","caca3","caca3")

    addBookToLibrary("caca","caca","caca")
    addBookToLibrary("caca1","caca1","caca1")
    addBookToLibrary("caca2","caca2","caca2")
    addBookToLibrary("caca3","caca3","caca3")

    addBookToLibrary("caca","caca","caca")
    addBookToLibrary("caca1","caca1","caca1")
    addBookToLibrary("caca2","caca2","caca2")
    addBookToLibrary("caca3","caca3","caca3")
}

createLibrary();

function newBook() {
    let libraryContainer = document.querySelector('.library');

    // This line clears the container and replaces it with the form.
    // The previous separate .innerHTML = '' line was redundant.
    libraryContainer.innerHTML = `
        <form id="new-book-form">
            <div class="form-title">Add a New Book</div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="book-title">TITLE</label>
                    <input type="text" id="book-title" placeholder="The Lord of the Rings" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="book-author">AUTHOR</label>
                    <input type="text" id="book-author" placeholder="J.R.R. Tolkien" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="book-category">CATEGORY</label>
                    <input type="text" id="book-category" placeholder="Fantasy" required>
                </div>
            </div>
            
            <button type="submit">Add Book to Library</button>
        </form>
    `;

    // After creating the form, we immediately find it and listen for its submission.
    attachFormListener();   
}

function attachFormListener() {
    const form = document.querySelector('#new-book-form');
    form.addEventListener('submit', function(event) {
        // 1. Prevent the default form submission which reloads the page.
        event.preventDefault();

        // 2. Get the values from the input fields.
        const title = document.querySelector('#book-title').value;
        const author = document.querySelector('#book-author').value;
        const category = document.querySelector('#book-category').value;

        // 3. Call your existing function to add the book to the 'library' array.
        addBookToLibrary(title, author, category);

        // 4. Call your existing function to display the updated library.
        showLibrary(); 
    });
}
