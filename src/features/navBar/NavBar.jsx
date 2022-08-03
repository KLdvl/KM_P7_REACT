import React from 'react';
import {NavLink} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { setLogStatus } from "../socialNetworkSlice";

export function NavBar() {
    const dispatch = useDispatch()
    const logged = useSelector(state => state.socialNetwork.logged)

    const handleLogout = () => {
        dispatch(setLogStatus(false))
    }
    return (
        <nav className="d-flex">
            {logged && <NavLink to="/">
                <button className="btn btn-primary">Home</button>
            </NavLink>}
            {!logged && <NavLink to="signup">
                <button className="btn btn-primary">Sign Up</button>
            </NavLink>}
            {!logged && <NavLink to="login">
                <button className="btn btn-primary">Log In</button>
            </NavLink>}
            {logged && <NavLink to="signup">
                <button className="btn btn-primary" onClick={handleLogout}>Log Out</button>
            </NavLink>}
        </nav>
    )
}