import React from 'react';
import { useOutletContext } from "react-router-dom"

const Dashboard = () => {
    const [currentUser] = useOutletContext()


    return (
        <div>
            <h1>{currentUser.name}</h1>
        </div>
    );
};

export default Dashboard;