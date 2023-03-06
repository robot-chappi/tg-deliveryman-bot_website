import React from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import TableRoles from "./components/TableRoles";

const Roles = () => {
    return (
        <div>
            <Header/>
            <div>
                <TableRoles/>
            </div>
            <Footer/>
        </div>
    );
};

export default Roles;