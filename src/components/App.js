import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "../contexts/UserContext";

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import MainPage from './MainPage';
import NewDeposit from './NewDeposit';
import NewWithdrawal from './NewWithdrawal';

export default function App() {

    const [userData, setUserData] = useState({});

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} ></Route>
                    <Route path="/sign-up" element={<SignUpPage />} ></Route>
                    <Route path="/main-page" element={<MainPage />} ></Route>
                    <Route path="/new-deposit" element={<NewDeposit />} ></Route>
                    <Route path="/new-withdrawal" element={<NewWithdrawal />} ></Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}