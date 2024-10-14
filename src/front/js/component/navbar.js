import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

	const { store, actions } = useContext(Context);
	const navigate= useNavigate()

	function handleLogout(){
		actions.logout()
		navigate("/")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Autenticacion con JWT</span>
				</Link>
				<div className="ml-auto">
					
					{store.auth ?<button className="btn btn-primary" onClick={()=>handleLogout()}>log out</button> : null }
					
				</div>
			</div>
		</nav>
	);
};
