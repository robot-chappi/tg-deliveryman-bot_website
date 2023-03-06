import React from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import TableUsers from "./components/TableUsers";

const Users = () => {
    return (
        <div>
            <Header/>
            <div>
                <TableUsers/>
            </div>
            <Footer/>
        </div>
    );
};

export default Users;