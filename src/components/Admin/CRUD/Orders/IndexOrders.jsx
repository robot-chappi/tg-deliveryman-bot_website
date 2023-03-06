import React from 'react';
import { Outlet } from "react-router-dom"

const IndexOrders = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default IndexOrders;