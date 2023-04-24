import React from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import TableIngredients from "./components/TableIngredients";

const Ingredients = () => {
    return (
        <div>
            <Header/>
            <div>
                <TableIngredients/>
            </div>
            <Footer/>
        </div>
    );
};

export default Ingredients;