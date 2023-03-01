import React from 'react';
import './ProductItem.css';
import {Link, useNavigate, useParams} from "react-router-dom";

const ProductItem = () => {
    const {productId} = useParams();
    const navigate = useNavigate();

    console.log(productId)

    const product = {
        id: 1,
        title: "Суп с креветками на гриле",
        type: "Правильное питание",
        image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
        description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
        weight: 350,
        price: 500
    }
    return (
        <section className="bg-white dark:bg-gray-900 pb-6">
            <button className={"inline-flex justify-center items-center py-2 px-3 text-base font-medium text-center text-white rounded-br-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"} onClick={() => navigate(-1)}>Назад</button>
            <div
                className="gap-8 mb-10 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <img data-aos={"fade-down"} data-aos-duration={"1000"} className="w-full dark:hidden"
                     src={`${product.image}`}
                     alt={'dashboard'}/>
                <img data-aos={"fade-down"} data-aos-duration={"1000"} className="w-full hidden dark:block"
                     src={`${product.image}`}
                     alt={'dashboard'}/>
                <div data-aos={"fade-up"} data-aos-duration={"1000"} className="mt-4 md:mt-0">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{product.title}</h2>
                    <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">{product.description}</p>
                    <hr className="mb-6 border-gray-500 md:text-lg dark:border-gray-400"/>
                    <p className="mb-1 font-light text-gray-900 md:text-lg dark:text-white">Тип: {product.type}</p>
                    <p className="mb-1 font-light text-gray-900 md:text-lg dark:text-white">Вес: {product.weight}г</p>
                    <p className="mb-1 font-light text-gray-900 md:text-lg dark:text-white">Цена: {product.price}₽</p>
                    <Link
                        data-aos={"fade-right"} data-aos-duration={"1000"}
                        to={"catalog"}
                        className="inline-flex mt-5 items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                        Сделать заказ
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductItem;