import React from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import TableReviews from "./components/TableReviews";

const Reviews = () => {
    return (
        <div>
            <Header/>
            <div>
                <TableReviews/>
            </div>
            <Footer/>
        </div>
    );
};

export default Reviews;