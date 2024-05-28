import React from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignupPage, LoginPage , } from './Routes.js'; // Corrected the import path
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} /> {/* Corrected path for LoginPage */}
        {/* <Route path='/seller-create' element={<SellerCreatePage />} /> Corrected path for LoginPage */}
      </Routes>
      For Open Login in page open /login with url
    </BrowserRouter>
  );
}

export default App;

