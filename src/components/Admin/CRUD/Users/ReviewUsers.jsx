import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {observer} from 'mobx-react-lite'
import {getUserWithAllInformation} from '../../../../http/userAPI'

const ReviewUsers = observer(() => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})

    useEffect(() => {
        getUserWithAllInformation(id).then(data => setUser(data)).finally(() => setLoading(false))
    }, [])

    console.log(user)

    if (loading) {
        return <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className={'text-gray-500 sm:text-xl dark:text-gray-400'}>Идет загрузка...</p>
        </div>
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
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{user.user.id}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>ChatId</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{user.user.chatId}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>ФИО</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{user.user.name}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Телефон</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{user.user.phoneNumber}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Роль</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{user.user.role.title}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Тариф</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{user.user.tariff ? user.user.tariff.title : 'Нет'}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Любимые продукты</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'><div>{user.favorite_product.favorite_product_products.length > 0 ? user.favorite_product.favorite_product_products.map((item) => {return <p key={item.id}>{item.product.title}</p>}) : 'Нет'}</div></td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Любимые ингредиенты</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'><div>{user.favorite_ingredient.favorite_ingredient_ingredients.length > 0 ? user.favorite_ingredient.favorite_ingredient_ingredients.map((item) => {return <p key={item.id}>{item.ingredient.title}</p>}) : 'Нет'}</div></td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Нелюбимые ингредиенты</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'><div>{user.unloved_ingredient.unloved_ingredient_ingredients.length > 0 ? user.unloved_ingredient.unloved_ingredient_ingredients.map((item) => {return <p key={item.id}>{item.ingredient.title}</p>}) : 'Нет'}</div></td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Заказы</th>
                        {user.orders ? <td className='px-4 py-3 text-gray-800 dark:text-white'>{user.orders.map(i => {
                            return <div key={i.id}>
                                <p><label>Заказ Id: {i.id}</label></p>
                                <p><label>ChatId: {i.chatId}</label></p>
                                <p><label>Тип оплаты: {i.type_order.title}</label></p>
                                <p><label>Выполнено: {i.isComplete ? 'Да' : 'Нет'}</label></p>
                                <p><label>Оплачено: {i.isPaid ? 'Да' : 'Нет'}</label></p>
                                {i.mealplan ? <div className={'pt-1'}>
                                    <p>План Id: {i.mealplan.id}</p>
                                    <p>Категория: {i.mealplan.category.title}</p>
                                    <p>Цена (с типом оплаты): {i.type_order.slug === 'month' ? i.mealplan.price * 2 : i.mealplan.price}р</p>
                                    <p className={'pt-1'}>План питания:</p>
                                    <div>
                                        {i.mealplan.mealplan_products.map(item => {
                                            return <p key={item.id}><label>{item.name_day} - {item.product.title}</label></p>
                                        })}
                                    </div>
                                </div> : <p>Плана питания нет</p>}

                                <hr className={`${user.orders.length > 1 ? 'block' : 'hidden'} my-2`}/>
                            </div>
                          })}</td>
                        :
                          <td className='px-4 py-3 text-gray-800 dark:text-white'><p>Нет</p></td>
                        }
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
});

export default ReviewUsers;