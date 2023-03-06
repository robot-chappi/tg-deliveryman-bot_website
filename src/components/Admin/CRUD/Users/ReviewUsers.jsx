import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const ReviewUsers = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    console.log(id)

    const user = {
        id: 1,
        name: 'Васильевич Вася Василин',
        phone: '89206742389',
        address: 'Россия, Москва',
        role: {
            id: 4,
            name: 'Пользователь',
            slug: 'user'
        },
        tariff: {
            id: 1,
            title: 'ЭКО',
            description: 'Базовый тариф для опробования нашего сервиса',
            price: 0,
            privilege: [
                {
                    id: 1,
                    title: 'Качество продуктов'
                },
                {
                    id: 2,
                    title: 'Быстрая доставка'
                },
                {
                    id: 3,
                    title: 'Телеграм канал по еде'
                },
            ],
            discount: 0
        }
    }


    return (
        <div className={'bg-gray-50 dark:bg-gray-900'}>
            <Header/>
            <div className="overflow-x-auto h-screen pt-10">
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
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{user.id}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>ФИО</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{user.name}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Телефон</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{user.phone}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Роль</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{user.role.name}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Тариф</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{user.tariff.title}</td>
                    </tr>
                    </tbody>
                </table>
                <div className={'flex justify-center pb-5'}>
                    <button type={"button"}
                            onClick={() => navigate('/admin/users')}
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Назад
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ReviewUsers;