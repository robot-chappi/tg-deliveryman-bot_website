import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {
    favoriteIngredients,
    favoriteProducts,
    mealPlan,
    unlovedIngredients
} from "../../../GenerationWeeklyMealPlan/mockdata";

const ReviewOrders = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    console.log(id)

    const order = {
            id: 4,
            fullname: 'Максимов Максим Максимович',
            address: 'Россия, г. Тверь',
            phoneNumber: '+7 920 831 76 04',
            favoriteCategory: {
                id: 1,
                title: 'Обычная еда'
            },
            favoriteFood: favoriteIngredients,
            unlovedFood: unlovedIngredients,
            foodFromFavorite: favoriteProducts,
            mealPlan: mealPlan,
            mealPlanPrice: 11000,
            wish: 'Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text.'
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
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{order.id}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>ФИО</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{order.fullname}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Адрес</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{order.address}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Телефон</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{order.phoneNumber}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Любимая категория</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{order.favoriteCategory.title}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Любимые ингридиенты</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'><div>{order.favoriteFood.map((i) => {
                            return <p key={i.id}>{i.title}</p>
                        })}</div></td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Нелюбимые ингридиенты</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'><div>{order.unlovedFood.map((i) => {
                            return <p key={i.id}>{i.title}</p>
                        })}</div></td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Любимые блюда</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'><div>{order.foodFromFavorite.map((i) => {
                            return <p key={i.id}>{i.title}</p>
                        })}</div></td>
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

export default ReviewOrders;