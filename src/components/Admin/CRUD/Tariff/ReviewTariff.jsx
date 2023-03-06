import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const ReviewTariff = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    console.log(id)

    const tariff = {
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
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{tariff.id}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Название</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{tariff.title}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Описание</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{tariff.description}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Цена</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{tariff.price}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Скидка</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{tariff.discount}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Привелегии</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'><div>{tariff.privilege.map((i) => {
                            return <p key={i.id}>{i.title}</p>
                        })}
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className={'flex justify-center pb-5'}>
                    <button type={"button"}
                            onClick={() => navigate('/admin/tariff')}
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Назад
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ReviewTariff;