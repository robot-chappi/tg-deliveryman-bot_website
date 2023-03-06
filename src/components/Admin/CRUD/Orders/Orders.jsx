import React from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import TableOrders from "./components/TableOrders";

const Orders = () => {
    return (
        <div>
            <Header/>
            <div>
                <TableOrders/>
            </div>
            <Footer/>
        </div>
    );
};

export default Orders;