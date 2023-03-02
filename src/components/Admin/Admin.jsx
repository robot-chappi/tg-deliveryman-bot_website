import React, {useState} from 'react';
import { Outlet } from "react-router-dom"

const Admin = () => {
    const [currentUser, setCurrentUser] = useState()

    return (
        <div>
            <Outlet context={[currentUser, setCurrentUser]}/>
        </div>
    );
};

export default Admin;