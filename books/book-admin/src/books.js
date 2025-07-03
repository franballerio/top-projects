"use strict"

import React, { useState, useEffect } from 'react';
import './books.css'; // Make sure this CSS is for styling the components, not global HTML

const Books = () => {

    const [library, setLibrary] = useState([]);

    const [currentView, setCurrentView] = useState('library');

    const addBook = (title, author, category) => {
        const bookId = crypto.randomUUID(); // Good use of crypto.randomUUID()

        let newBook = { // Renamed 'book' to 'newBook' to avoid confusion with parameter 'book' in showLibrary map
            bookId: bookId,
            title: title,
            author: author,
            category: category,
        };
        // Update the state with the new book
        setLibrary(prevLibrary => [...prevLibrary, newBook]);
        // After adding, show the library view
        setCurrentView('library');
    };

    // This function will handle the form submission directly within the Books component
    const handleAddBookSubmit = (event) => {
        event.preventDefault(); // Prevent page reload

        const title = event.target.elements['book-title'].value;
        const author = event.target.elements['book-author'].value;
        const category = event.target.elements['book-category'].value;

        addBook(title, author, category);

        // Optionally clear the form or reset the view
        event.target.reset(); // Resets all form fields
    };

    // Use useEffect to run createLibrary only once when the component mounts
    useEffect(() => {
        // Initialize with some dummy data
        addBook("The Hobbit", "J.R.R. Tolkien", "Fantasy");
        addBook("1984", "George Orwell", "Dystopian");
        addBook("Pride and Prejudice", "Jane Austen", "Romance");
    }, []); // Empty dependency array means this runs only once on mount

    // --- JSX for rendering the various views ---

    const renderLibrary = () => {
        return (
            <div className="library-grid"> {/* Use className instead of class */}
                {library.length > 0 ? (
                    library.map((book) => (
                        <div className="book-card" key={book.bookId}> {/* key is crucial for lists in React */}
                            <h3>{book.title}</h3>
                            <p>By: {book.author}</p>
                            <p>Category: {book.category}</p>
                            {/* Add a delete button for each book, if desired */}
                            {/* <button onClick={() => handleDeleteBook(book.bookId)}>Delete</button> */}
                        </div>
                    ))
                ) : (
                    <p>Your library is empty. Add some books!</p>
                )}
            </div>
        );
    };

    const renderAddBookForm = () => {
        return (
            <form id="new-book-form" onSubmit={handleAddBookSubmit}> 
                <div className="form-title">Add a New Book</div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="book-title">TITLE</label>
                        <input type="text" id="book-title" placeholder="The Lord of the Rings" required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="book-author">AUTHOR</label>
                        <input type="text" id="book-author" placeholder="J.R.R. Tolkien" required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="book-category">CATEGORY</label>
                        <input type="text" id="book-category" placeholder="Fantasy" required />
                    </div>
                </div>

                <button type="submit">Add Book to Library</button>
                <button type="button" onClick={() => setCurrentView('library')}>Cancel</button> {/* Add a cancel button */}
            </form>
        );
    };

    return (
        // Remove <body> tag here
        <div className="container"> {/* Use className */}
            <div className="commands-column"> {/* Use className */}
                <button onClick={() => setCurrentView('home')}>Home</button> {/* Assuming 'home' view eventually */}
                <button onClick={() => setCurrentView('library')}>Library</button>
                <button onClick={() => setCurrentView('addBook')}>New Book</button> {/* Use a state setter for view change */}
                <button>Edit Book</button>
                <button>Delete Book</button>
                <button onClick={() => setLibrary([])}>Clear Library</button> {/* Clears state directly */}
            </div>
            <div className="content-area"> {/* A div to conditionally render content */}
                {currentView === 'library' && renderLibrary()}
                {currentView === 'addBook' && renderAddBookForm()}
                {/* Add other views as needed */}
            </div>
        </div>
    );
};

export default Books;