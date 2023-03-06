import React from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import TablePrivileges from "./components/TablePrivileges";

const Privileges = () => {
    return (
        <div>
            <Header/>
            <div>
                <TablePrivileges/>
            </div>
            <Footer/>
        </div>
    );
};

export default Privileges;