import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4"
import "../css/player.css"

export default function Player() {
    const navigate = useNavigate();

    return (
        <div className="player_body">
            <div className="player">
                <div className="back">
                    <BsArrowLeft onClick={() => navigate(-1)} />
                </div>
                <video src={video} autoPlay loop controls muted />
            </div>
        </div>
    );
}

