import React from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import TableTariff from "./components/TableTariff";

const Tariff = () => {
    return (
        <div>
            <Header/>
            <div>
                <TableTariff/>
            </div>
            <Footer/>
        </div>
    );
};

export default Tariff;