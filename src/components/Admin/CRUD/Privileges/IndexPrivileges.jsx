import React from 'react';
import { Outlet } from "react-router-dom"

const IndexPrivileges = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default IndexPrivileges;