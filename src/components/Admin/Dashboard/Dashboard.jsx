import React from 'react';
import { useOutletContext } from "react-router-dom"
import Header from "../Header/Header";

const Dashboard = () => {
    const [currentUser] = useOutletContext()


    return (
        <div>
            <Header/>
            <h1>{currentUser.name}</h1>
        </div>
    );
};

export default Dashboard;