import React, { useState } from 'react';
import { LoginForm } from "./features/auth/loginForm/LoginForm";
import { SignupForm } from './features/auth/signupForm/SignupForm'
import { ErrorDisplay } from './features/auth/errorDisplay/ErrorDisplay'
import { Home } from './features/home/Home'
import { NavBar } from './features/navBar/NavBar'
import { CreatePost } from './features/posts/createPost/CreatePost'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


function App() {
    const [errorMessage, updateErrorMessage] = useState(null)
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<LoginForm showError={updateErrorMessage} />} />
                <Route path="signup" element={<SignupForm showError={updateErrorMessage} />} />
                <Route path="createPost" element={<CreatePost showError={updateErrorMessage} />} />
            </Routes>
            <ErrorDisplay errorMessage={errorMessage} hideError={updateErrorMessage} />
        </BrowserRouter>
    );
}

export default App;