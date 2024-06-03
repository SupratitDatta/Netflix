import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";
import Background from "./Background";
import Header from "../components/Header";
import "../css/login.css"

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.log(error.code);
        }
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/");
    });

    return (
        <div className="login_container">
            <Background />
            <div className="content">
                <Header />
                <div className="form-container ">
                    <div className="form ">
                        <div className="title">
                            <h3>Login</h3>
                        </div>
                        <div className="container">
                            <input type="text" placeholder="Email ID"
                                onChange={(e) => setEmail(e.target.value)} value={email} />
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                                value={password} />
                            <button onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;