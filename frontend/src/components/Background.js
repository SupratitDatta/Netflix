import React from "react";
import background from "../assets/login.jpg";

export default function Background() {
    return (
        <div className="background_container">
            <img src={background} alt="background" />
        </div>
    );
}