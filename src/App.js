import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Routing from './routing';


const App = () => {
  return (
    <BrowserRouter> {/* Wrap Routing with BrowserRouter */}
      <div className='app'>
        <Routing />
      </div>
    </BrowserRouter>
  );
};

export default App;

