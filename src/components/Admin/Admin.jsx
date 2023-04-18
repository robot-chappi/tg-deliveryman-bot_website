import React from 'react';
import { Outlet } from "react-router-dom"
import {observer} from 'mobx-react-lite'

const Admin = observer(() => {
    return (
        <div>
            <Outlet />
        </div>
    );
});

export default Admin;