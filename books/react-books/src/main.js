import React, { useState, useEffect} from 'react';
import './books.css';
import Book from './Classes/Book';
import BookCard from './components/molecules/bookCards';

const Books = () => {

    const [library, setLibrary] = useState([]);
    const [currentView, setCurrentView] = useState('library');
    const [bookImage, setBookImage] = useState(null);
    const [clearLibrary, setClearLibrary] = useState(false);

    const addBook = (title, author, category, imageCover, amountPages) => {

        if (typeof imageCover == "object") {
            let reader = new FileReader();

            reader.onload = (event) => {
                const imageUrl = event.target.result;

                let newBook = new Book(
                    title, 
                    author, 
                    category, 
                    imageUrl, 
                    amountPages)
                
                const existingBooks = JSON.parse(localStorage.getItem('library')) || [];
                const updatedBooks = [...existingBooks, newBook];
                setLibrary(updatedBooks);
                localStorage.setItem('library', JSON.stringify(updatedBooks));
                setCurrentView('library');                            
            }
            
            reader.readAsDataURL(imageCover);
            
        } else {
                let newBook = new Book(
                    title, 
                    author, 
                    category, 
                    imageCover, 
                    amountPages)
            
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
        // 3. If no, create the default/dummy data using the Book class
        const defaultBooks = [
            // new Book("To Kill a Mockingbird", "Harper Lee", "Fiction", "/images/mockingbird.jpg", 281),
            // new Book("The Great Gatsby", "F. Scott Fitzgerald", "Fiction", "/images/gatsby.jpg", 180),
            // new Book("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "Fantasy", "/images/harrypotter1.jpg", 309),
            // new Book("The Catcher in the Rye", "J.D. Salinger", "Fiction", "/images/catcher.jpg", 224),
            // new Book("Lord of the Flies", "William Golding", "Fiction", "/images/lordflies.jpg", 182),
            // new Book("The Chronicles of Narnia", "C.S. Lewis", "Fantasy", "/images/narnia.jpg", 767),
            // new Book("Brave New World", "Aldous Huxley", "Dystopian", "/images/bravenew.jpg", 288),
            // new Book("The Kite Runner", "Khaled Hosseini", "Fiction", "/images/kiterunner.jpg", 371),
            // new Book("Dune", "Frank Herbert", "Science Fiction", "/images/dune.jpg", 412),
            // new Book("The Handmaid's Tale", "Margaret Atwood", "Dystopian", "/images/handmaid.jpg", 311),
            // new Book("Jane Eyre", "Charlotte Brontë", "Romance", "/images/janeeyre.jpg", 532),
            // new Book("The Hunger Games", "Suzanne Collins", "Dystopian", "/images/hungergames.jpg", 374),
            // new Book("Gone Girl", "Gillian Flynn", "Thriller", "/images/gonegirl.jpg", 432),
            // new Book("The Da Vinci Code", "Dan Brown", "Thriller", "/images/davinci.jpg", 489),
            // new Book("Crime and Punishment", "Fyodor Dostoevsky", "Fiction", "/images/crime.jpg", 671),
            new Book("The Hobbit", "J.R.R. Tolkien", "Fantasy", "/images/hobbit.jpg", 310),
            new Book("1984", "George Orwell", "Dystopian", "/images/1984.jpg", 328),
            new Book("Pride and Prejudice", "Jane Austen", "Romance", "/images/prideAndPrejudice.jpg", 279)
        ];

        // 4. Set the state with the default books AND save them to localStorage
        setLibrary(defaultBooks);
        localStorage.setItem('library', JSON.stringify(defaultBooks));
    }
}, [clearLibrary]); // Add clearLibrary to dependency array to make sure effect runs when it changes


    // jsx to use html
    const renderLibrary = () => {
        return (
            <div className="library-grid">
                {library.length > 0 ? (
                    library.map((book) => (
                        <BookCard key={book.title} book={book} />
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