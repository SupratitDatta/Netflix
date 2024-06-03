import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../utils";
import Navbar from "./Navbar";
import SelectGenre from "./SelectGenre";
import Slider from "./Slider";
import "../css/tvshows.css"

function TVShows() {
    const [isScrolled, setIsScrolled] = useState(false);
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const dataLoading = useSelector((state) => state.netflix.dataLoading);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!genres.length) dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ genres, type: "tv" }));
        }
    }, [genresLoaded]);

    const [user, setUser] = useState(undefined);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setUser(currentUser.uid);
        else navigate("/login");
    });

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <div className="tvshows_body">
            <Navbar isScrolled={isScrolled} />
            <div className="data">
                <SelectGenre genres={genres} type="tv" />
                {movies.length ? (
                    <><Slider movies={movies} /></>
                ) : (
                    <h1 className="not-available"> No TV Shows avaialble for the selected genre. Please select a
                        different genre.
                    </h1>
                )}
            </div>
        </div>
    );
}

export default TVShows;
