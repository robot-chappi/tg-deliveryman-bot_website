import React from "react";
import './styles.css'

export default function MiniStatistic(props) {
    const { application, users, subscribers, products } = props;
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="text-center card border-2 rounded-xl p-5">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
                        <svg
                            className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
                            stroke="currentColor"
                            viewBox="0 0 52 52"
                        >
                            <polygon
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                points="29 13 14 29 25 29 23 39 38 23 27 23"
                            />
                        </svg>
                    </div>
                    <h6 className="text-4xl font-bold text-gray-900 dark:text-white">
                        {application}
                    </h6>
                    <p className="mb-2 font-bold text-md text-gray-900 dark:text-white">Заявки</p>
                    <p className="text-gray-900 dark:text-white">
                        Представлено общее число обработанных заявок за всё время
                    </p>
                </div>
                <div className="text-center card border-2 rounded-xl p-5">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
                        <svg
                            className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
                            stroke="currentColor"
                            viewBox="0 0 52 52"
                        >
                            <polygon
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                points="29 13 14 29 25 29 23 39 38 23 27 23"
                            />
                        </svg>
                    </div>
                    <h6 className="text-4xl font-bold text-gray-900 dark:text-white">
                        {users}
                    </h6>
                    <p className="mb-2 font-bold text-md text-gray-900 dark:text-white">Пользователи</p>
                    <p className="text-gray-900 dark:text-white">
                        Колличество людей, которые опробовали наш сервис
                    </p>
                </div>
                <div className="text-center card border-2 rounded-xl p-5">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
                        <svg
                            className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
                            stroke="currentColor"
                            viewBox="0 0 52 52"
                        >
                            <polygon
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                points="29 13 14 29 25 29 23 39 38 23 27 23"
                            />
                        </svg>
                    </div>
                    <h6 className="text-4xl font-bold text-gray-900 dark:text-white">
                        {subscribers}
                    </h6>
                    <p className="mb-2 font-bold text-md text-gray-900 dark:text-white">Подписчиков</p>
                    <p className="text-gray-900 dark:text-white">
                        Число подписчиков нашего сервиса на данный момент
                    </p>
                </div>
                <div className="text-center card border-2 rounded-xl p-5">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-full bg-indigo-50 sm:w-12 sm:h-12">
                        <svg
                            className="w-8 h-8 text-deep-purple-accent-400 sm:w-10 sm:h-10"
                            stroke="currentColor"
                            viewBox="0 0 52 52"
                        >
                            <polygon
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                points="29 13 14 29 25 29 23 39 38 23 27 23"
                            />
                        </svg>
                    </div>
                    <h6 className="text-4xl font-bold text-gray-900 dark:text-white">
                        {products}
                    </h6>
                    <p className="mb-2 font-bold text-md text-gray-900 dark:text-white">Всего продуктов</p>
                    <p className="text-gray-900 dark:text-white">
                        Всего продуктов
                    </p>
                </div>
            </div>
        </div>
    );
}
