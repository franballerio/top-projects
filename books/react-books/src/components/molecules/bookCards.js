import React from 'react';
import './bookCards.css'

function renderOptions() {
    return (
        <div className='options'>
            <button className='editBook'>Edit Book</button>
            <button className='deleteBook'>Delete Book</button>            
        </div>
    )
}

function BookCard(book) {
    return (
        <div className="book-card" key={book.bookId} /*onClick={showBookPreview(book)}*/> {/* key is crucial for lists in React */}
            <img src={book.coverImage} alt={`Cover for ${book.title}`} className='book-cover-image'/>
            <div className='book-info'>
                <h3>{book.title}</h3>
                <p>By: {book.author}</p>
                <p>Category: {book.category}</p>
                <button className='threeDots' onClick={() => renderOptions()}>⁝</button>               
            </div>
        </div>        
    )
}

export default BookCard