import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Player from "./components/Player";
import MoviePage from "./components/Movies";
import TVShows from "./components/TVShows";
import UserListedMovies from "./components/UserListedMovies";
import './css/app.css';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/" element={<Home />} />
                <Route exact path="/player" element={<Player />} />
                <Route exact path="/tv" element={<TVShows />} />
                <Route exact path="/movies" element={<MoviePage />} />
                <Route exact path="/mylist" element={<UserListedMovies />} />
            </Routes>
        </BrowserRouter>
    );
}