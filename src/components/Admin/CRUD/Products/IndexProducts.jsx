import React from 'react';
import { Outlet } from "react-router-dom"

const IndexProducts = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default IndexProducts;