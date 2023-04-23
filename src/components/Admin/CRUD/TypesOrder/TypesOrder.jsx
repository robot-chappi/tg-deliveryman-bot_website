import React from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import TableTypesOrder from "./components/TableTypesOrder";

const TypesOrder = () => {
    return (
        <div>
            <Header/>
            <div>
                <TableTypesOrder/>
            </div>
            <Footer/>
        </div>
    );
};

export default TypesOrder;