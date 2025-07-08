import React, { useState, useEffect} from 'react';
import './books.css';

const Books = () => {

    const [library, setLibrary] = useState([]);
    const [currentView, setCurrentView] = useState('library');
    const [bookImage, setBookImage] = useState(null);
    const [clearLibrary, setClearLibrary] = useState(false);

    const addBook = (title, author, category, imageCover) => {

        if (typeof imageCover == "object") {
            let reader = new FileReader();

            reader.onload = (event) => {
                const imageUrl = event.target.result;

                let newBook = {
                    bookId: crypto.randomUUID(), // creates a unique id
                    //dateAdded: date.time(),
                    title: title,
                    author: author,
                    category: category,
                    coverImage: imageUrl
                };
                
                const existingBooks = JSON.parse(localStorage.getItem('library')) || [];
                const updatedBooks = [...existingBooks, newBook];
                setLibrary(updatedBooks);
                localStorage.setItem('library', JSON.stringify(updatedBooks));
                setCurrentView('library');                            
            }
            
            reader.readAsDataURL(imageCover);
            
        } else {
            let newBook = {
                bookId: crypto.randomUUID(), // creates a unique id
                //dateAdded: date.time(),
                title: title,
                author: author,
                category: category,
                coverImage: imageCover 
            };
            
            const existingBooks = JSON.parse(localStorage.getItem('library')) || [];
            const updatedBooks = [...existingBooks, newBook];
            setLibrary(updatedBooks);
            localStorage.setItem('library', JSON.stringify(updatedBooks));
            setCurrentView('library');  
        }
    };

    
    const handleAddBookSubmit = (event) => {
        // Prevent page reload
        event.preventDefault(); 

        const title = event.target.elements['book-title'].value;
        const author = event.target.elements['book-author'].value;
        const category = event.target.elements['book-category'].value;

        if (bookImage) {
            addBook(title, author, category, bookImage);
        } else {
            addBook(title, author, category, "/images/default.png");
        }

        setBookImage(null);
        event.target.reset(); // Resets all form fields
    };

useEffect(() => {
    // 1. First, try to load books from localStorage
    const savedBooks = JSON.parse(localStorage.getItem("library"));

    // 2. Check if there are any saved books
    if (savedBooks && savedBooks.length > 0 && clearLibrary === true) {
        // If yes, set the library state with them and do nothing else.
        setLibrary(savedBooks);
    } else {
        // 3. If no, create the default/dummy data
        const defaultBooks = [
            { bookId: crypto.randomUUID(), title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", coverImage: "/images/mockingbird.jpg" },
            { bookId: crypto.randomUUID(), title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", coverImage: "/images/gatsby.jpg" },
            { bookId: crypto.randomUUID(), title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fantasy", coverImage: "/images/harrypotter1.jpg" },
            { bookId: crypto.randomUUID(), title: "The Catcher in the Rye", author: "J.D. Salinger", category: "Fiction", coverImage: "/images/catcher.jpg" },
            { bookId: crypto.randomUUID(), title: "Lord of the Flies", author: "William Golding", category: "Fiction", coverImage: "/images/lordflies.jpg" },
            { bookId: crypto.randomUUID(), title: "The Chronicles of Narnia", author: "C.S. Lewis", category: "Fantasy", coverImage: "/images/narnia.jpg" },
            { bookId: crypto.randomUUID(), title: "Brave New World", author: "Aldous Huxley", category: "Dystopian", coverImage: "/images/bravenew.jpg" },
            { bookId: crypto.randomUUID(), title: "The Kite Runner", author: "Khaled Hosseini", category: "Fiction", coverImage: "/images/kiterunner.jpg" },
            { bookId: crypto.randomUUID(), title: "Dune", author: "Frank Herbert", category: "Science Fiction", coverImage: "/images/dune.jpg" },
            { bookId: crypto.randomUUID(), title: "The Handmaid's Tale", author: "Margaret Atwood", category: "Dystopian", coverImage: "/images/handmaid.jpg" },
            { bookId: crypto.randomUUID(), title: "Jane Eyre", author: "Charlotte Brontë", category: "Romance", coverImage: "/images/janeeyre.jpg" },
            { bookId: crypto.randomUUID(), title: "The Hunger Games", author: "Suzanne Collins", category: "Dystopian", coverImage: "/images/hungergames.jpg" },
            { bookId: crypto.randomUUID(), title: "Gone Girl", author: "Gillian Flynn", category: "Thriller", coverImage: "/images/gonegirl.jpg" },
            { bookId: crypto.randomUUID(), title: "The Da Vinci Code", author: "Dan Brown", category: "Thriller", coverImage: "/images/davinci.jpg" },
            { bookId: crypto.randomUUID(), title: "Crime and Punishment", author: "Fyodor Dostoevsky", category: "Fiction", coverImage: "/images/crime.jpg" },
            { bookId: crypto.randomUUID(), title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", coverImage: "/images/hobbit.jpg" },
            { bookId: crypto.randomUUID(), title: "1984", author: "George Orwell", category: "Dystopian", coverImage: "/images/1984.jpg"},
            { bookId: crypto.randomUUID(), title: "Pride and Prejudice", author: "Jane Austen", category: "Romance", coverImage: "/images/prideAndPrejudice.jpg" }
        ];

        // 4. Set the state with the default books AND save them to localStorage
        setLibrary(defaultBooks);
        localStorage.setItem('library', JSON.stringify(defaultBooks));
    }
}, []);


    // jsx to use html
    const renderLibrary = () => {
        return (
            <div className="library-grid">
                {library.length > 0 ? (
                    library.map((book) => (
                        <div className="book-card" key={book.bookId} /*onClick={showBookPreview(book)}*/> {/* key is crucial for lists in React */}
                            <img src={book.coverImage} alt={`Cover for ${book.title}`} className='book-cover-image'/>
                            <div className='book-info'>
                                <h3>{book.title}</h3>
                                <p>By: {book.author}</p>
                                <p>Category: {book.category}</p>
                                {/* Add a delete button for each book, if desired */}
                                {/* <button onClick={() => handleDeleteBook(book.bookId)}>Delete</button> */}                                
                            </div>
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

                <label htmlFor="bookImageInput" className="attach-image-label">
                ADD IMAGE 
                </label>                
                <input id="bookImageInput" type="file" accept="image/*"
                onChange = {(img) => setBookImage(img.target.files[0])} 
                />

                <button type="submit">Add Book to Library</button>
                <button type="button" onClick={() => setCurrentView('library')}>Cancel</button> {/* Add a cancel button */}
            </form>
        );
    };

    const renderHome = () => {
        return (
            <div className="home-page">
                <div className="welcome-section">
                    <h1>Welcome to Your Personal Library</h1>
                    <p>Organize, track, and manage your book collection with ease.</p>
                </div>
                
                <div className="stats-section">
                    <div className="stat-card">
                        <h3>Total Books</h3>
                        <p className="stat-number">{library.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Categories</h3>
                        <p className="stat-number">{[...new Set(library.map(book => book.category))].length}</p>
                    </div>
                </div>
                
                <div className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="action-buttons">
                        <button onClick={() => setCurrentView('library')} className="action-btn">
                            View Library
                        </button>
                        <button onClick={() => setCurrentView('addBook')} className="action-btn">
                            Add New Book
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="commands-column">
                <button onClick={() => setCurrentView('home')}>Home</button>
                <button onClick={() => setCurrentView('library')}>Library</button>
                    {currentView === "library" ? (
                        <div className='library-actions'>
                            <button onClick={() => setCurrentView('addBook')}>New Book</button>
                            <button>Filter </button>
                            <button className="clear" onClick={() => { setLibrary([])
                                setClearLibrary(true)}}>Clear Library</button>
                        </div> ) :
                        ("")}

            </div>
            <div className="content-area">
                {currentView === 'home' && renderHome()}
                {currentView === 'library' && renderLibrary()}
                {currentView === 'addBook' && renderAddBookForm()}
            </div>
        </div>
    );
};

export default Books;