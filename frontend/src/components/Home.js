import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../utils/index.js";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import backgroundImage from "../assets/home.jpg";
import Navbar from "./Navbar.js";
import Slider from "./Slider.js";
import "../css/home.css";

function Home() {
    const [isScrolled, setIsScrolled] = useState(false);
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ genres, type: "all" }));
        }
    }, [genresLoaded, dispatch, genres]);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.pageYOffset !== 0);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="main_body">
            <Navbar isScrolled={isScrolled} />
            <div className="hero">
                <img src={backgroundImage} alt="background" className="background-image" />
                <div className="container">
                    <div className="logo">
                        <h1>The Question is not</h1><h1><b>WHERE </b> But <b> WHEN</b> </h1>
                    </div>
                    <div className="buttons">
                        <button onClick={() => navigate("/player")}>
                            <FaPlay /> Play
                        </button>
                        <button>
                            <AiOutlineInfoCircle /> More Info
                        </button>
                    </div>
                </div>
            </div>
            <Slider movies={movies} />
        </div>
    );
}

export default Home;