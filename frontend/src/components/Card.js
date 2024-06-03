import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";
import toast from "react-hot-toast";
import video from "../assets/video.mp4";
import "../css/card.css";

export default React.memo(function Card({ index, movieData, isLiked = false, onRemove }) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                setEmail(currentUser.email);
            } else {
                navigate("/login");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const addToList = async () => {
        try {
            await axios.post("http://localhost:5000/api/user/add", {
                email,
                data: movieData,
            });
            toast.success(`${movieData.name} has been added to your list!`);
        }
        catch (error) {
            console.error("Error adding movie to list:", error);
        }
    };

    const removeFromList = async () => {
        try {
            await axios.put("http://localhost:5000/api/user/remove", {
                email,
                movieId: movieData.id,
            });
            if (onRemove) {
                onRemove(movieData.id);
            }
        }
        catch (error) {
            console.error("Error removing movie from list:", error);
        }
    };

    return (
        <div className="card_body"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <img
                src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                alt="card"
                onClick={() => navigate("/player")}
            />
            {isHovered && (
                <div className="hover">
                    <div className="image-video-container">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                            alt="card"
                            onClick={() => navigate("/player")}
                        />
                        <video src={video} autoPlay={true} loop muted onClick={() => navigate("/player")} />
                    </div>
                    <div className="info-container">
                        <h3 className="name" onClick={() => navigate("/player")}>
                            {movieData.name}
                        </h3>
                        <div className="icons">
                            <div className="controls">
                                <IoPlayCircleSharp title="Play" onClick={() => navigate("/player")} />
                                <RiThumbUpFill title="Like" />
                                <RiThumbDownFill title="Dislike" />
                                {isLiked ? (
                                    <BsCheck title="Remove from List" onClick={removeFromList} />
                                ) : (
                                    <AiOutlinePlus title="Add to my list" onClick={addToList} />
                                )}
                            </div>
                            <div className="info"><BiChevronDown title="More Info" /></div>
                        </div>
                        <div className="genres">
                            <ul>
                                {movieData.genres.map((genre) => (<li key={genre}>{genre}</li>))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});