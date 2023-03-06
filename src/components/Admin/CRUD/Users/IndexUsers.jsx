import React from 'react';
import { Outlet } from "react-router-dom"

const IndexUsers = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default IndexUsers;