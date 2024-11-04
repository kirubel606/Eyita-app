import React, { useState } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/movies';
import TvShows from './pages/tvshows';
import Header from './pages/Header';
import Admin from './pages/admin';
import Vidplay from './pages/vidplay';
import SeriesPlay from './pages/seriesplay';
import { AuthProvider } from './context/Authcontext';
import Login from './components/login';

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tvshows" element={<TvShows />} />
        <Route path="login" element={<Login />} /> {/* Updated path */}
        <Route path="admin" element={<Admin />} />
        <Route path="vidplay" element={<Vidplay />} />
        <Route path="seriesplay" element={<SeriesPlay />} />
      </Route>
    )
  );
  
  function App() {
    return (
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    );
  }
  
  export default App;