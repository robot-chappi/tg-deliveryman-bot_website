import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <header>
            <nav className="bg-white border-b-2 border-gray-100 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to={'/'} className="flex items-center">
                        <div className='w-7 h-7 mr-2'>
                            <svg viewBox="0 -12.5 1049 1049" className="icon" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M250.885 645.796c-29.512 102.738-56.448 135.654-37.15 163.341 7.526 10.808 21.214 19.544 103.098 26.14 80.035 6.44 120.053 9.654 167.44 2.99 33.6-4.715 181.441-25.525 287.068-143.853 21.382-23.957 55.519-63.101 71.153-124.881 4.569-18.077 15.277-62.295 3.797-110.881-19.375-82.219-90.025-125.9-172.235-176.625-95.738-59.159-154.875-95.692-227.843-78.076-83.9 20.295-127.043 97.933-131.241 105.773-21.683 40.422-10.763 54.063-29.12 168.818-7.908 49.292-16.508 103.017-34.966 167.251z"
                                        fill="#FA1919"></path>
                                    <path
                                        d="M432.55 206.418l-2.061 0.56c9.34 12.589 31.786 28.124 44.868 37.173 41.182 28.483 60.638 26.432 69.968 47.040 12.544 27.629-11.848 55.217-1.322 63.952 15.971 13.25 72.050-50.197 103.567-33.981 24.292 12.499 17.674 63.84 34.474 66.136 13.182 1.759 21.034-29.356 37.587-28.493 13.821 0.717 16.98 22.647 37.049 44.51 24.125 26.275 62.889 41.72 71.3 33.242 5.029-5.073 1.119-20.665-8.848-40.667-28.998-22.401-74.437-48.283-146.922-93.106-176.86-102.536-210.818-103.779-239.659-96.365z"
                                        fill="#C40000"></path>
                                    <path
                                        d="M278.751 826.452c3.483 19.645 94.081 18.872 130.85 16.8 29.703-1.657 126.93-10.079 242.314-80.393 75.891-46.222 203.841-124.152 208.118-242.816 1.948-53.994-29.635-102.638-38.227-116.862-5.209-8.624-54.982-91-84.806-82.208-37.342 11.054 20.239 146.183-32.189 261.353-88.447 194.209-432.825 205.891-426.061 244.127z"
                                        fill="#C40000"></path>
                                    <path
                                        d="M484.271 391.55c0.001 0 0.001 0 0.002 0.001 8.735 3.128 19.198-3.778 23.367-15.427 4.17-11.648 0.469-23.625-8.266-26.753-0.001 0-0.001 0-0.002-0.001 0 0-0.001 0-0.002-0.001-8.735-3.128-19.198 3.778-23.367 15.427-4.17 11.648-0.47 23.625 8.266 26.753 0.001 0 0.001 0 0.002 0.001z"
                                        fill="#C40000"></path>
                                    <path
                                        d="M366.541 720.177c0.001 0.001 0.002 0.002 0.003 0.003 6.861 6.248 19.175 3.895 27.503-5.252 8.329-9.147 9.519-21.627 2.66-27.874-0.001-0.001-0.002-0.002-0.003-0.003-0.001-0.001-0.002-0.002-0.003-0.002-6.861-6.247-19.175-3.896-27.503 5.252-8.329 9.147-9.519 21.627-2.659 27.874 0.001 0.001 0.002 0.002 0.003 0.003z"
                                        fill="#C40000"></path>
                                    <path
                                        d="M497.13 605.466c0 0 0.001 0 0.001 0 8.852 2.784 19.034-4.526 22.747-16.327 3.712-11.802-0.455-23.625-9.305-26.408 0 0-0.001 0-0.001 0 0 0-0.001 0-0.001 0-8.852-2.784-19.034 4.526-22.748 16.327-3.712 11.802 0.455 23.625 9.305 26.408s0.001 0 0.001 0z"
                                        fill="#C40000"></path>
                                    <path
                                        d="M711.627 494.216c0.001 0.001 0.002 0.002 0.003 0.003 6.861 6.248 19.175 3.895 27.503-5.252 8.329-9.148 9.519-21.627 2.66-27.874-0.001-0.001-0.002-0.002-0.003-0.003-0.001-0.001-0.002-0.002-0.003-0.002-6.861-6.248-19.175-3.896-27.503 5.252-8.329 9.148-9.519 21.627-2.659 27.874 0.001 0.001 0.002 0.002 0.003 0.003z"
                                        fill="#C40000"></path>
                                    <path
                                        d="M643.381 587.473c0 0 0.001 0.001 0.001 0.001 6.861 6.248 19.174 3.895 27.503-5.252 8.329-9.148 9.519-21.627 2.659-27.874 0 0-0.001-0.001-0.001-0.001 0 0-0.001-0.001-0.001-0.001-6.861-6.248-19.174-3.896-27.503 5.252-8.329 9.148-9.519 21.627-2.659 27.874s0.001 0.001 0.001 0.001z"
                                        fill="#C40000"></path>
                                    <path
                                        d="M372.127 566.141c0.001 0 0.001 0 0.002 0.001 8.735 3.128 19.198-3.778 23.367-15.427 4.17-11.648 0.469-23.625-8.266-26.752-0.001 0-0.001 0-0.002-0.001 0 0-0.001 0-0.002-0.001-8.735-3.128-19.198 3.778-23.367 15.427-4.17 11.648-0.469 23.625 8.266 26.752 0.001 0 0.001 0 0.002 0.001z"
                                        fill="#C40000"></path>
                                    <path
                                        d="M399.171 311.244c0.001 0 0.001 0 0.002 0.001 8.735 3.128 19.198-3.778 23.367-15.427 4.17-11.648 0.47-23.625-8.266-26.752-0.001 0-0.001 0-0.002-0.001 0 0-0.001 0-0.002-0.001-8.735-3.128-19.198 3.778-23.367 15.427-4.17 11.648-0.469 23.625 8.266 26.752 0.001 0 0.001 0 0.002 0.001z"
                                        fill="#FFFFFF"></path>
                                    <path
                                        d="M366.541 720.177c0.001 0.001 0.002 0.002 0.003 0.003 6.861 6.248 19.175 3.895 27.503-5.252 8.329-9.147 9.519-21.627 2.66-27.874-0.001-0.001-0.002-0.002-0.003-0.003-0.001-0.001-0.002-0.002-0.003-0.002-6.861-6.247-19.175-3.896-27.503 5.252-8.329 9.147-9.519 21.627-2.659 27.874 0.001 0.001 0.002 0.002 0.003 0.003z"
                                        fill="#FFFFFF"></path>
                                    <path
                                        d="M497.13 605.466c0 0 0.001 0 0.001 0 8.852 2.784 19.034-4.526 22.747-16.327 3.712-11.802-0.455-23.625-9.305-26.408 0 0-0.001 0-0.001 0 0 0-0.001 0-0.001 0-8.852-2.784-19.034 4.526-22.748 16.327-3.712 11.802 0.455 23.625 9.305 26.408s0.001 0 0.001 0z"
                                        fill="#FFFFFF"></path>
                                    <path
                                        d="M747.192 490.473c0 0 0.001 0.001 0.001 0.001 6.861 6.248 19.174 3.896 27.503-5.252 8.329-9.148 9.519-21.627 2.66-27.874 0 0-0.001-0.001-0.001-0.001 0 0-0.001-0.001-0.001-0.001-6.861-6.248-19.174-3.895-27.503 5.252-8.329 9.148-9.519 21.627-2.659 27.874 0 0 0.001 0.001 0.001 0.001z"
                                        fill="#C40000"></path>
                                    <path
                                        d="M643.381 587.473c0 0 0.001 0.001 0.001 0.001 6.861 6.248 19.174 3.895 27.503-5.252 8.329-9.148 9.519-21.627 2.659-27.874 0 0-0.001-0.001-0.001-0.001 0 0-0.001-0.001-0.001-0.001-6.861-6.248-19.174-3.896-27.503 5.252-8.329 9.148-9.519 21.627-2.659 27.874s0.001 0.001 0.001 0.001z"
                                        fill="#FFFFFF"></path>
                                    <path
                                        d="M366.447 413.388c0.001 0 0.001 0 0.002 0.001 8.735 3.128 19.198-3.778 23.367-15.427 4.17-11.647 0.469-23.625-8.266-26.753-0.001 0-0.001 0-0.002-0.001 0 0-0.001 0-0.002-0.001-8.735-3.128-19.198 3.778-23.367 15.427-4.17 11.648-0.469 23.625 8.266 26.753 0.001 0 0.001 0 0.002 0.001z"
                                        fill="#C40000"></path>
                                    <path
                                        d="M371.654 882.789c-43.869 0-84.236-5.22-117.6-15.277-42.907-12.902-73.259-32.994-90.249-59.764-17.394-27.407-12.052-48.586-2.408-87.036 7.65-30.329 19.219-76.16 29.12-154.561 3.36-26.735 6.059-53.144 8.164-80.729 1.061-11.477 10.645-20.395 22.311-20.395 12.371 0 22.401 10.028 22.401 22.401 0 0.496-0.017 0.99-0.048 1.477-2.158 28.258-4.901 55.396-8.386 82.814-10.192 81.166-22.155 128.577-30.073 159.959-9.453 37.487-9.733 41.866-3.259 52.046 10.909 17.17 33.488 31.36 65.307 40.891 33.264 10.012 75.107 14.56 120.96 13.115 78.659-2.453 160.822-21.65 231.359-54.051 79.61-36.524 139.104-87.617 172.257-147.706 19.23-34.922 48.508-104.587 28.538-178.853-9.946-36.96-30.608-68.32-64.961-98.616-32.906-28.963-74.727-54.309-123.201-83.653-87.362-52.92-150.45-91.158-224.964-74.827-66.852 14.65-108.64 63.84-123.503 84.382-18.638 25.693-27.217 48.832-31.662 85.311-1.787 10.736-11.005 18.818-22.113 18.818-12.371 0-22.401-10.028-22.401-22.401 0-0.624 0.025-1.242 0.075-1.852 5.315-43.7 16.863-74.479 39.855-106.187 17.92-24.639 68.32-83.9 150.181-101.843 91.975-20.149 165.122 24.181 257.735 80.282 48.16 29.176 93.654 56.738 129.55 88.335 41.328 36.379 66.316 74.705 78.669 120.613 24.058 89.432-10.079 171.272-32.558 212.096-37.766 68.555-104.419 126.247-192.753 166.859-75.847 34.843-164.159 55.484-248.642 58.117q-8.949 0.235-17.707 0.235z"
                                        fill="#000000"></path>
                                    <path
                                        d="M224.879 450.535h-1.299c-11.813-0.692-21.128-10.44-21.128-22.365 0-0.47 0.015-0.936 0.043-1.399l0.063-1.057c0.524-11.955 10.343-21.45 22.38-21.45 12.371 0 22.401 10.029 22.401 22.401 0 0.568-0.021 1.131-0.063 1.688l-0.063 1.046c-0.689 11.804-10.422 21.116-22.332 21.134z"
                                        fill="#000000"></path>
                                    <path
                                        d="M673.731 197.233c-22.87 16.027-52.886-10.079-120.165-26.23-53.603-12.847-120.098-16.8-125.507-1.119-4.345 12.544 30.957 36.961 48.811 49.281 41.182 28.483 60.638 26.432 69.968 47.040 12.544 27.63-11.848 55.217-1.322 63.953 15.971 13.251 72.050-50.197 103.567-33.981 24.293 12.499 17.674 63.84 34.474 66.136 13.205 1.713 21.045-29.411 37.587-28.549 13.821 0.717 16.98 22.647 37.049 44.51 24.125 26.275 62.889 41.72 71.3 33.242 11.379-11.48-22.803-76.957-70.897-125.44-38.663-39.009-77.112-57.758-72.016-79.61 4.222-18.134 34.395-21.113 35.156-40.746 0.481-12.017-10.18-25.121-18.256-24.484-13.63 1.119-7.84 40.567-29.748 56z"
                                        fill="#6BE166"></path>
                                    <path
                                        d="M758.606 286.039c-22.647-19.812-41.978-35.538-54.958-48.541-12.321-11.278-19.443-20.833-17.058-31.069 2.902-12.466 18.066-17.775 27.519-26.253 4.29-3.852 7.403-8.366 7.639-14.492v-0.739c-17.834 11.912-32.132 27.79-41.86 46.429 16.146-23.95 1.452-8.316-3.153 6.625-8.803 28.605 21.392 48.036 38.081 97.071 5.178 14.72 8.556 31.73 9.392 49.404l-3.019-30.689c13.821 0.717 16.98 22.647 37.050 44.51 24.125 26.275 62.889 41.72 71.3 33.242 11.334-11.502-22.837-76.978-70.93-125.497z"
                                        fill="#60C95B"></path>
                                </g>
                            </svg>
                        </div>
                        <span
                            className="self-center text-lg font-semibold text-gray-900 whitespace-nowrap dark:text-white">Твоя Доставка</span>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <button onClick={toggle} type="button"
                                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                 aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                      clipRule="evenodd"></path>
                            </svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}>
                        <ul className={`flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 ${isOpen ? 'block' : 'hidden'}`}>
                            <li>
                                <Link to={"/admin"}
                                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Админ Панель</Link>
                            </li>
                            <li>
                                <Link to={"/"}
                                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Главная</Link>
                            </li>
                            <li>
                                <Link to={"/catalog"}
                                   className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Каталог</Link>
                            </li>
                            <li>
                                <Link to={"/order"}
                                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Создать рацион</Link>
                            </li>
                            <li>
                                <Link to={"/payment"}
                                      className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Оплатить заказы</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;