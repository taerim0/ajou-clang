import React, {useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/main/MainPage.js';
import AuthPage from './pages/auth/AuthPage.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/main"} element={<MainPage />}/>
        <Route path={"/auth"} element={<AuthPage />}/>
      </Routes>
    </div>
  );
}

export default App;