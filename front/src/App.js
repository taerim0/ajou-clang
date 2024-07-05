import React, {useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './pages/main/MainPage.js';
import AuthPage from './pages/auth/AuthPage.js';
import ProfilePage from './pages/profile/ProfilePage.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<MainPage />}/>
        <Route path={"/auth"} element={<AuthPage />}/>
        <Route path={"/profile/:userID"} element={<ProfilePage />}/>
      </Routes>
    </div>
  );
}

export default App;