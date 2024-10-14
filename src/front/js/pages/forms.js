import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Forms = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function sentData(e) {
        e.preventDefault()
        console.log("sent data")
        console.log(email, password)
        actions.login(email, password)
    }

    return (
        <>
            <form onSubmit={sentData}>
                <div className="text-center mb-3">
                    <label htmlFor="FormControlInput1" className="form-label">Email address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                <label htmlFor="inputPassword5" className="form-label">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" />
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>
                <button type="submit" className="btn btn-primary" >login </button>
                </div>
            </form>
        </>
    )
};