import React from 'react';
import './Main.css';
import {useTelegram} from "../../hooks/useTelegram";
import yandex from "../../assets/images/yandex.svg";
import delivery from "../../assets/images/delivery-club-seeklogo.com.svg";
import sber from "../../assets/images/sberbank-svgrepo-com.svg";
import Typewriter from "typewriter-effect";
import {Link} from "react-router-dom";


const Main = () => {
    const {user, onClose} = useTelegram();

    const time = new Date().getHours();

    return (
        <div>
            <section id={'main'} className="bg-white dark:bg-gray-900 pb-6">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                    <div
                        data-aos={"fade-up"}
                        data-aos-duration={"1000"}
                        data-aos-delay={"0"}
                       className="inline-flex transition justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                       role="alert">
                        <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-0.5 mr-3">
                            <button onClick={onClose} className="py-3 px-3">Закрыть</button>
                        </span>
                        <span className="text-sm font-medium">Добро пожаловать! {user?.username}</span>
                        <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <h1 data-aos={"fade-up"} data-aos-duration={"1000"} data-aos-delay={"700"} className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><Typewriter
                        options={{
                            loop:true
                        }}
                        onInit={(typewriter)=> {
                            typewriter
                                .typeString(`${time >= 4 && time <= 11 ? 'Доброе утро!' : time >= 12 && time <= 16 ? 'Добрый день!' : time >= 17 && time <= 20 ? 'Добрый вечер!' : time >= 21 || time <= 3 ? 'Доброго времени суток!' : 'Доброго времени суток!'} Как дела? 🙃`)
                                .pauseFor(1000)
                                .deleteAll()
                                .typeString("Официальный магазин бота доставщика!")
                                .pauseFor(1000)
                                .deleteAll()
                                .typeString("Пару кликов и еда на месяц уже у вас дома!")
                                .pauseFor(1000)
                                .deleteAll()
                                .start();
                        }}
                    /></h1>
                    <p data-aos={"fade-up"} data-aos-duration={"1000"} data-aos-delay={"1000"} className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                        Каждый день приносим продукты, готовую еду и всё нужное для комфортной жизни без заморочек. В каждом районе Твери есть свой даркстор, поэтому так быстро!</p>
                    <div
                        className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <a
                            data-aos={"fade-up"} data-aos-duration={"1000"} data-aos-delay={"2000"}
                            href="https://www.donationalerts.com/r/chappic"
                           className="inline-flex transition justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Пожертвование
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </a>
                        <Link
                            data-aos={"fade-up"} data-aos-duration={"1000"}
                            to={"catalog"}
                           className="inline-flex transition justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            Каталог
                        </Link>
                    </div>
                    <div data-aos={"fade-up"} data-aos-duration={"1000"} className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                        <span className="font-semibold text-gray-400 uppercase">ПАРТНЕРЫ</span>
                        <div
                            className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
                            <div className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                                <img className='h-20 animate-wiggle' src={yandex} alt="yandex"/>
                            </div>
                            <div className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                                <img className='h-10 animate-pulse' src={delivery} alt="delivery"/>
                            </div>
                            <div className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                                <img className='h-10 animate-bounce' src={sber} alt="sber"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white dark:bg-gray-900 pb-6">
                <div
                    className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <img data-aos={"fade-down"} data-aos-duration={"1000"} className="w-full dark:hidden"
                         src={`https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg`}
                         alt={'dashboard'}/>
                        <img data-aos={"fade-down"} data-aos-duration={"1000"} className="w-full hidden dark:block"
                             src={`https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg`}
                             alt={'dashboard'}/>
                            <div data-aos={"fade-up"} data-aos-duration={"1000"} className="mt-4 md:mt-0">
                                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Мы очень ответственно подходим к каждому моменту</h2>
                                <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">В радиусе 1,5 км от даркстора мы доставляем за 15 минут, дальше —  за 30. В Ленобласть и Подмосковье привозим за час.</p>
                                <Link
                                    data-aos={"fade-right"} data-aos-duration={"1000"}
                                    to={"catalog"}
                                   className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                                    Заказать еду
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
            <section className="bg-white dark:bg-gray-900 pb-6">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <div data-aos={"fade-down"} data-aos-duration={"1000"} className="max-w-screen-md mb-8 lg:mb-16">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Наши преимущества</h2>
                        <p className="text-gray-500 sm:text-xl dark:text-gray-400">Наши партнеры не штрафуют и платят за часы, а не за количество заказов. А еще реально получить повышение. Знаете кого‑то, кто подходит — расскажите ему о нас</p>
                    </div>
                    <div className="space-y-8 text-center md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                        <div data-aos={"fade-right"} data-aos-duration={"1000"}>
                            <div className='flex justify-center'>
                                <div
                                    className="flex justify-center text-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                    <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                        <path fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white">Выгодно</h3>
                            <p className="text-gray-500 dark:text-gray-400">Наши цены такие же вкусные, как и наша свежая еда!</p>
                        </div>
                        <div data-aos={"fade-right"} data-aos-duration={"1000"}>
                            <div className='flex justify-center'>
                            <div
                                className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                                          clipRule="evenodd"></path>
                                </svg>
                            </div>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white">Быстро</h3>
                            <p className="text-gray-500 dark:text-gray-400">Мы быстро и без проблем доставляем ежедневно большое колличесво заказов по всей Твери!</p>
                        </div>
                        <div data-aos={"fade-right"} data-aos-duration={"1000"}>
                            <div className='flex justify-center'>
                            <div
                                className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                          clipRule="evenodd"></path>
                                    <path
                                        d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                                </svg>
                            </div>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-white">Вкусно</h3>
                            <p className="text-gray-500 dark:text-gray-400">Наши повара мастера своего дела. Они будут удивлять вас своим мастерством!</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white dark:bg-gray-900 pb-6">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div data-aos={"fade-down"} data-aos-duration={"1000"} className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Тарифы для большего счастья</h2>
                        <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Тарифы помогают экономить деньги и отрывают дополнительные полезные функции для пользователя</p>
                    </div>
                    <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                        <div
                            data-aos={"fade-right"} data-aos-duration={"1000"}
                            className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <h3 className="mb-4 text-2xl font-semibold">ЭКО</h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Лучший выбор для опробования нашего сервиса!</p>
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">500₽</span>
                                <span className="text-gray-500 dark:text-gray-400">/ в месяц</span>
                            </div>

                            <ul className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span>Качество продуктов</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span>Быстрая доставка</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span>Телеграм-канал по еде</span>
                                </li>
                            </ul>
                            <Link to={"catalog"}
                               className="text-white animate-bounce transition bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Опробовать</Link>
                        </div>

                        <div
                            data-aos={"fade-right"} data-aos-duration={"1000"}
                            className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <h3 className="mb-4 text-2xl font-semibold">СРЕДНИЙ</h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Для продолжительного более выгодного использования</p>
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">1000₽</span>
                                <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">/ в месяц</span>
                            </div>

                            <ul className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span>Все что есть в тарифе ЭКО</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span>Личный куратор</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span>Базовая скидка 5%</span>
                                </li>
                            </ul>
                            <Link to={"catalog"}
                               className="text-white animate-bounce transition bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Опробовать</Link>
                        </div>

                        <div
                            data-aos={"fade-right"} data-aos-duration={"1000"}
                            className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <h3 className="mb-4 text-2xl font-semibold">ПРО</h3>
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Лучший выбор для длительного использования сервиса</p>
                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-5xl font-extrabold">3000₽</span>
                                <span className="text-gray-500 dark:text-gray-400">/ в месяц</span>
                            </div>

                            <ul className="mb-8 space-y-4 text-left">
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span>Все что есть в тарифе СРЕДНИЙ</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span>Авто выбор блюд</span>
                                </li>
                                <li className="flex items-center space-x-3">

                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                         fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                              clipRule="evenodd"></path>
                                    </svg>
                                    <span>ПРО скидка 10%</span>
                                </li>
                            </ul>
                            <Link to={"catalog"}
                               className="text-white animate-bounce transition bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Опробовать</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Main;