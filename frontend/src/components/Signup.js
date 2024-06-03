import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseConfig";
import Background from "../components/Background";
import Header from "./Header";
import "../css/signup.css";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const { email, password } = formValues;
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.log(error);
        }
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/");
    });
    const formStyle = {
        gridTemplateColumns: showPassword ? "1fr 1fr" : "2fr 1fr",
    };

    return (
        <div className="signup_body" showPassword={showPassword}>
            <Background />
            <div className="content">
                <Header login />
                <div className="body"> 
                    <div className="text">
                        <h1>Unlimited movies, TV shows and more.</h1>
                        <h4>Watch anywhere. Cancel anytime.</h4>
                        <h6>Ready to watch? Enter your email to create or restart membership.</h6>
                    </div>
                    <div className="form" style={formStyle} >
                    <input type="email" placeholder="Email address"
                        onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value, })}
                        name="email" value={formValues.email}
                    />
                    {showPassword && ( <input type="password" placeholder="Password"
                        onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value, })}
                        name="password" value={formValues.password} />
                    )}
                    {!showPassword && (
                        <button onClick={() => setShowPassword(true)}>Get Started</button>
                    )}
                </div>
                {showPassword && <button onClick={handleSignIn}>Log In</button>}
            </div>
        </div>
        </div >
    );
}

export default Signup;
