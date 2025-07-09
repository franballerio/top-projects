import React, { useState } from 'react';
import './bookCards.css'


function BookCard({ book }) {

    return (
        <div className="book-card">
            <div className='book-cover-image'>
                <img src={book.coverImage} alt={`Cover for ${book.title}`} />
            </div>
            <div className='book-info'>
                <div className='book-category'>{book.category}</div>
                <h3>{book.title}</h3>
                <div className='book-author'>By: {book.author}</div>
                <div className='book-pages'>{book.pages} pages</div>  
            </div>
            <div className='options'>
                <button className='editBook'>Edit Book</button>
            </div>
            <div className='options'>
                <button className='deleteBook'>
                        <svg 
                            width="18" 
                            height="18" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                </button> 
            </div>
            </div>      
    )
}

export default BookCard