import React, {useState} from 'react';
import {
    order, pricesList, mockPrice
} from "../GenerationWeeklyMealPlan/mockdata";
import {useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const Payment = () => {
    const [myOrder, setMyOrder] = useState(order);
    const [priceId, setPriceId] = useState();
    const [price, setPrice] = useState();
    const navigate = useNavigate();


    const changePrice = (event) => {
        setPriceId(event.target.value)
        if (Number(event.target.value) === 1) {
            return setPrice(mockPrice)
        }
        if (Number(event.target.value) === 2) {
            return setPrice(mockPrice*4)
        }
    }

    const deletePayment = () => {
        try {
            setMyOrder(null);
            return navigate("/");
        } catch (e) {
            console.log(e)
        }
    }

    const nextPayment = () => {
        try {
            if (price) {
                return navigate("/order");
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Header/>
            <section
                 className="block p-4 w-full bg-white transition-transform dark:bg-gray-800">
                <div className='pt-5'>
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Оплатить заказ</h2>
                </div>
                <div>
                    <h4 id="drawer-label"
                        className="mb-1.5 leading-none text-xl font-semibold text-gray-900 dark:text-white">ФИО: {myOrder.fullname}</h4>
                    <p className="mb-1.5 text-xl font-bold text-gray-900 dark:text-white">Адрес: {myOrder.address}</p>
                    <p className="mb-5 text-xl font-bold text-gray-900 dark:text-white">Телефон: {myOrder.phoneNumber}</p>
                </div>
                <dl>
                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Детали</dt>
                    <dd className="mb-1 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                        Категория еды: {myOrder?.favoriteCategory?.title}
                    </dd>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                        План питания: <div className='pl-3 border-2 border-white mt-2'>
                    <div className="border-b dark:border-gray-700">
                        <h2 className='py-1'>Понедельник</h2>
                        {
                            myOrder['mealPlan']['Понедельник']?.map((i) => {
                                return <p key={i.id} className='py-1 text-gray-800 dark:text-white'>{i.title}</p>
                            })
                        }
                    </div>
                    <div className="border-b dark:border-gray-700">
                        <h2 className='py-1'>Вторник</h2>
                        {
                            myOrder['mealPlan']['Вторник']?.map((i) => {
                                return <p key={i.id} className='py-1 text-gray-800 dark:text-white'>{i.title}</p>
                            })
                        }
                    </div>
                    <div className="border-b dark:border-gray-700">
                        <h2 className='py-1'>Среда</h2>
                        {
                            myOrder['mealPlan']['Среда']?.map((i) => {
                                return <p key={i.id} className='py-1 text-gray-800 dark:text-white'>{i.title}</p>
                            })
                        }
                    </div>
                    <div className="border-b dark:border-gray-700">
                        <h2 className='py-1'>Четверг</h2>
                        {
                            myOrder['mealPlan']['Четверг']?.map((i) => {
                                return <p key={i.id} className='py-1 text-gray-800 dark:text-white'>{i.title}</p>
                            })
                        }
                    </div>
                    <div className="border-b dark:border-gray-700">
                        <h2 className='py-1'>Пятница</h2>
                        {
                            myOrder['mealPlan']['Пятница']?.map((i) => {
                                return <p key={i.id} className='py-1 text-gray-800 dark:text-white'>{i.title}</p>
                            })
                        }
                    </div>
                    <div className="border-b dark:border-gray-700">
                        <h2 className='py-1'>Суббота</h2>
                        {
                            myOrder['mealPlan']['Суббота']?.map((i) => {
                                return <p key={i.id} className='py-1 text-gray-800 dark:text-white'>{i.title}</p>
                            })
                        }
                    </div>
                    <div className="border-b dark:border-gray-700">
                        <h2 className='py-1'>Воскресенье</h2>
                        {
                            myOrder['mealPlan']['Воскресенье']?.map((i) => {
                                return <p key={i.id} className='py-1 text-gray-800 dark:text-white'>{i.title}</p>
                            })
                        }
                    </div>
                    </div>
                    </dd>
                    <dd className="mb-5 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                        Пожелание: {myOrder.wish}
                    </dd>
                    <div className="mb-5">
                        <label htmlFor="category"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выбор типа оплаты</label>
                        <select id="category"
                                onChange={event => changePrice(event)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">Выберете категорию</option>
                            {pricesList.map((item) => {
                                return <option key={item.id} value={item.id}>{item.title}</option>
                            })}
                        </select>
                    </div>
                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Цена:</dt>
                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{price ? `${Number(priceId) === 1 || Number(priceId) === 2 ? price : 'Ожидаем выбор оплаты'} ${Number(priceId) === 1 ? 'руб./неделя' : Number(priceId) === 2 ? 'руб./месяц' : ''}` : 'Ожидаем выбор оплаты'}</dd>
                </dl>
                <div className="flex bottom-0 left-0 justify-center pb-4 space-x-4 w-full md:px-4 md:absolute">
                    <button type="button" onClick={nextPayment}
                            className="text-white w-full inline-flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                            <path fillRule="evenodd"
                                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                  clipRule="evenodd"></path>
                        </svg>
                        Заказать
                    </button>
                    <button type="button" onClick={deletePayment}
                            className="inline-flex w-full items-center text-white justify-center bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                        <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"></path>
                        </svg>
                        Удалить
                    </button>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default Payment;