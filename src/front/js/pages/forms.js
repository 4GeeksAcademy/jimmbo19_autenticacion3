import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Forms = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [isSignUp, setIsSignUp] = useState(false); 
    const navigate = useNavigate(); 

    const sentData = (e) => {
        e.preventDefault();

        setIsSubmitting(true); 

        if (isSignUp) {
            
            actions.signUp(email, password)
                .then(() => {
                    setIsSubmitting(false); 
                    navigate('/demo'); 
                })
                .catch(() => {
                    setIsSubmitting(false); 
                });
        } else {
       
            actions.login(email, password)
                .then(() => {
                    setIsSubmitting(false); 
                    navigate('/demo');
                })
                .catch(() => {
                    setIsSubmitting(false); 
                });
        }
    };

    return (
        <>
            <form onSubmit={sentData}>
                <div className="text-center mb-3">
                    <label htmlFor="FormControlInput1" className="form-label">Email address</label>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" 
                        className="form-control" 
                        id="exampleFormControlInput1" 
                        placeholder="name@example.com"
                    />
                    <label htmlFor="inputPassword5" className="form-label">Password</label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        id="inputPassword5" 
                        className="form-control" 
                        aria-describedby="passwordHelpBlock" 
                    />
                    <div id="passwordHelpBlock" className="form-text">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        disabled={isSubmitting} 
                    >
                        {isSubmitting ? "Enviando..." : isSignUp ? "Sign Up" : "Login"}
                    </button>

                    <div className="mt-3">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setIsSignUp(!isSignUp)}
                        >
                            {isSignUp ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
