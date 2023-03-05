import React from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import TableProducts from "./components/TableProducts";

const Products = () => {
    return (
        <div>
            <Header/>
            <div>
                <TableProducts/>
            </div>
            <Footer/>
        </div>
    );
};

export default Products;