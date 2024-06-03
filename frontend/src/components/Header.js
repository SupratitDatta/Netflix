import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/header.css"

export default function Header(props) {
    const navigate = useNavigate();
    return (
        <div className="header">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
                {props.login ? "Log In" : "Sign In"}
            </button>
        </div>
    );
}