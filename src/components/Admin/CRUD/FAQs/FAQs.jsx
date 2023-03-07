import React from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import TableFAQs from "./components/TableFAQs";

const FAQs = () => {
    return (
        <div>
            <Header/>
            <div>
                <TableFAQs/>
            </div>
            <Footer/>
        </div>
    );
};

export default FAQs;