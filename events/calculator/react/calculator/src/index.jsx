import React from 'react';
import ReactDOM from 'react-dom/client';
import Calculator from './calculator'; // Adjust the path if needed

function App() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '200px' }}>
      <div className="calc">
        <Calculator />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  <App/>
);

export default App;