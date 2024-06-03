import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import Navbar from "./Navbar";
import { firebaseAuth } from "../utils/firebaseConfig";
import "../css/liked.css";

export default function UserListedMovies() {
    const [movies, setMovies] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                setEmail(currentUser.email);
            }
            else {
                navigate("/login");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        const fetchLikedMovies = async () => {
            if (email) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
                    setMovies(response.data.movies);
                }
                catch (error) {
                    console.error("Error fetching liked movies:", error);
                }
            }
        };
        fetchLikedMovies();
    }, [email]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.pageYOffset !== 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleRemove = (movieId) => {
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
    };

    return (
        <div className="liked_body">
            <Navbar isScrolled={isScrolled} />
            <div className="content">
                <h1>My List</h1>
                <div className="grid">
                    {movies.map((movie, index) => (
                        <Card
                            movieData={movie}
                            index={index}
                            key={movie.id}
                            isLiked={true}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
