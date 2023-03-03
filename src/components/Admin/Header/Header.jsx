import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRight,
    faBowlFood,
    faBug,
    faCartShopping,
    faClose,
    faDoorOpen,
    faMoneyBill,
    faShop
} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";


const Header = () => {
    const [openPages, setOpenPages] = useState(false);
    const [openProducts, setOpenProducts] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();

    const toggle = (item, setItem) => {
        setItem(!item);
    }

    const logout = () => {
        try {
            return navigate('/');
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <aside className={`fixed top-0 left-0 w-64 h-full transition`} style={{left: `${openMenu ? '0' : '-255px'}`}} aria-label="Sidenav">
            <div onClick={() => toggle(openMenu, setOpenMenu)} className={`${openMenu ? 'block' : 'hidden'} absolute p-2 z-20 w-full text-xl font-normal text-white dark:text-gray-900`} style={{top: '0', left: '83%'}}>
                <span className={'bg-gray-800 dark:bg-white px-2 rounded-xl'} style={{border: '2px solid #000000', borderRadius: '10px'}}>
                    <FontAwesomeIcon icon={faClose}/>
                </span>
            </div>
            <div onClick={() => toggle(openMenu, setOpenMenu)} className={`${openMenu ? 'hidden' : 'block'} absolute p-2 z-20 w-full text-xl font-normal text-white dark:text-gray-900`} style={{top: '0', left: '100%'}}>
                <span className={'bg-gray-800 dark:bg-white px-2 rounded-xl'} style={{border: '2px solid #000000', borderRadius: '10px'}}>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </span>
            </div>
            <div
                className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <ul className="space-y-2">
                    <li>
                        <a href="https://www.donationalerts.com/r/chappic"
                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FontAwesomeIcon className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" icon={faShop}/>
                            <span className="ml-3">Статистика</span>
                        </a>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openPages, setOpenPages)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faBowlFood}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Продукты</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openPages ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="https://www.donationalerts.com/r/chappic"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Обзор</a>
                            </li>
                            <li>
                                <a href="https://www.donationalerts.com/r/chappic"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Создать</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button"
                                onClick={() => toggle(openProducts, setOpenProducts)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-sales" data-collapse-toggle="dropdown-sales">
                            <FontAwesomeIcon className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" icon={faCartShopping}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Продажи</span>
                        </button>
                        <ul id="dropdown-sales" className={`${openProducts ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="https://www.donationalerts.com/r/chappic"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Продукты</a>
                            </li>
                            <li>
                                <a href="https://www.donationalerts.com/r/chappic"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Планы</a>
                            </li>
                            <li>
                                <a href="https://www.donationalerts.com/r/chappic"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Пользователи</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
                    <li>
                        <a href="https://www.donationalerts.com/r/chappic"
                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                            <FontAwesomeIcon className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" icon={faBug}/>
                            <span className="ml-3 ">Зона FAQ</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.donationalerts.com/r/chappic"
                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                            <FontAwesomeIcon className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" icon={faMoneyBill}/>
                            <span className="ml-3">Тарифы</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={'absolute p-2 z-20 w-full text-base font-normal text-gray-900 dark:text-white'} style={{bottom: '1%'}}>
                <button type={'button'} onClick={logout} className="text-lg text-gray-900 dark:text-white">
                    <FontAwesomeIcon icon={faDoorOpen}/>
                    <span className={'pl-1'}>Выйти</span>
                </button>
            </div>
            </aside>
    );
};

export default Header;