import React from 'react';
import ReactDOM from 'react-dom/client';
import Books from './books.js'; // Adjust the path if needed

function App() {
  return (
      <div className="calc">
        <Books />
      </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  <App/>
);

export default App;