import React from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import TableCategories from "./components/TableCategories";

const Categories = () => {
    return (
        <div>
            <Header/>
            <div>
                <TableCategories/>
            </div>
            <Footer/>
        </div>
    );
};

export default Categories;