import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

export function NavBar() {
    return (
        <nav className="d-flex">
            <NavLink to="/">Home</NavLink> |{" "}
            <NavLink to="signup">Sign Up</NavLink> |
            <NavLink to="login">Log In</NavLink> |
            <button>Log Out</button>
        </nav>
    )
}