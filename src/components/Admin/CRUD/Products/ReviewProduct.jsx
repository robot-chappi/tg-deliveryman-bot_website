import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const ReviewProduct = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    console.log(id)

    const product = {
        id: 1,
        title: "Плов",
        weight: 450,
        type: {
            id: 2,
            title: "Обед"
        },
        category: {
            id: 1,
            title: "Обычная еда"
        },

        image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
        description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
        ingredients: [
            {id: 6, title: 'Маслины'},
            {id: 7, title: 'Зелень'},
            {id: 8, title: 'Чеснок'},
            {id: 9, title: 'Картофель'},
            {id: 10, title: 'Белый лук'}
        ],
        price: 300
    }

    return (
        <div className={'bg-gray-50 dark:bg-gray-900'}>
            <Header/>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead>
                    <tr className='border-2 border-gray-800 dark:border-white'>
                        <th scope="col" className="px-4 py-3 border-r-2">Пункты</th>
                        <th scope="col" className="px-4 py-3 border-r-2">Информация</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>ID</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{product.id}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Изображение</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'><img src={product.image} alt="Product"/></td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Название</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{product.title}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Описание</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{product.description}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Вес</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{product.weight}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Цена</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{product.price}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Тип</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{product.type.title}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Категория</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{product.category.title}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Ингридиенты</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>
                            <div>
                                {product.ingredients.map((i) => {
                                    return <p key={i.id}>{i.title}</p>
                                })}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={'flex justify-center pb-5'}>
                <button type={"button"}
                        onClick={() => navigate('/admin/products')}
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                    Назад
                </button>
            </div>
            <Footer/>
        </div>
    );
};

export default ReviewProduct;