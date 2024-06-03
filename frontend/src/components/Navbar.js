import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebaseConfig";
import { onAuthStateChanged} from "firebase/auth";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";
import "../css/navbar.css";

export default function Navbar({ isScrolled }) {
    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser && location.pathname !== "/login") {
                navigate("/login");
            }
        });
        return () => unsubscribe();
    }, [navigate, location]);

    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "My List", link: "/mylist" },
    ];

    return (
        <div className="navbar">
            <nav className={`${isScrolled ? "scrolled" : ""} scroll`}>
                <div className="left">
                    <div className="brand">
                        <img src={logo} alt="Logo" />
                    </div>
                    <ul className="links">
                        {links.map(({ name, link }) => (
                            <li key={name}>
                                <Link to={link}>{name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="right">
                    <div className={`search ${showSearch ? "show-search" : ""}`}>
                        <button
                            onFocus={() => setShowSearch(true)}
                            onBlur={() => setShowSearch(false)}
                        >
                            <FaSearch />
                        </button>
                        <input
                            type="text"
                            placeholder="Search"
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(false)}
                            onBlur={() => setInputHover(false)}
                        />
                    </div>
                    <button onClick={() => signOut(firebaseAuth)}>
                        <FaPowerOff />
                    </button>
                </div>
            </nav>
        </div>
    );
}
