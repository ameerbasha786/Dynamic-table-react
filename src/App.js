import React from 'react';
import './App.css';
import Dashboard from './components/dashboard/dashboard'

function App() {
  return (
    <div className="App">
      <div className='sidebar'>
        <div>
          <p>website-details</p>
          <p><i className="fa fa-angle-down fa-2x" aria-hidden="true"></i></p>
        </div>
        <p>Home</p>
        <p>Products</p>
        <p>Customers</p>
        <p>Company</p>
        <p>Contact-us</p>
      </div>
      <div className='heading'>
        <h1><b>X</b>CELPROS</h1>
        <div>

          <p className='zoomcall'>startzoomcall</p>
          <p className='aboutus'>aboutus!</p>
        </div>
      </div>
      <Dashboard />
    </div>
  );
}

export default App;
