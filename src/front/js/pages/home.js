import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Forms } from "./forms";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	
	return (
		<>
			<div className="container">
				<div className="mt-5 text-center">
					<h1> Bienvenido!!</h1>
					{store.auth ? <Navigate to ='/demo' />:<Forms /> }
				</div>
			</div>
		</>
	);
};
