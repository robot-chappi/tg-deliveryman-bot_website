import React, {useContext, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRight, faArrowUp, faBookOpen,
    faBowlFood,
    faBug, faCalendar,
    faCartShopping,
    faClose, faCloud,
    faDoorOpen, faList, faListNumeric, faPlateWheat,
    faPlay,
    faShop, faUser
} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";
import {Context} from '../../../index'
import {observer} from 'mobx-react-lite'


const Header = observer(() => {
    const {user} = useContext(Context)

    const [openIngredients, setOpenIngredients] = useState(false);
    const [openReviews, setOpenReviews] = useState(false);
    const [openTypeOrders, setOpenTypeOrders] = useState(false);
    const [openProducts, setOpenProducts] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);
    const [openTypes, setOpenTypes] = useState(false);
    const [openRoles, setOpenRoles] = useState(false);
    const [openUsers, setOpenUsers] = useState(false);
    const [openTariff, setOpenTariff] = useState(false);
    const [openPrivileges, setOpenPrivileges] = useState(false);
    const [openOrders, setOpenOrders] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();

    const toggle = (item, setItem) => {
        setItem(!item);
    }

    const logout = () => {
        try {
            localStorage.removeItem('token')
            localStorage.removeItem('auth')
            user.setUser({})
            user.setIsAuth(false)
            user.setIsAdmin(false)
            user.setIsAnalyst(false)
            user.setIsCopywriter(false)
            return navigate('/');
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <aside className={`fixed top-0 z-30 left-0 w-64 h-full transition`} style={{transform: `translateX(${openMenu ? '0' : '-255px'})`}} aria-label="Sidenav">
            <div onClick={() => toggle(openMenu, setOpenMenu)} className={`${openMenu ? 'block' : 'hidden'} absolute p-2 z-20 w-full text-xl font-normal text-white dark:text-gray-900`} style={{top: '0', left: '83%'}}>
                <span className={'bg-gray-800 dark:bg-white px-2 rounded-full'}>
                    <FontAwesomeIcon icon={faClose}/>
                </span>
            </div>
            <div onClick={() => toggle(openMenu, setOpenMenu)} className={`${openMenu ? 'hidden' : 'block'} absolute p-2 z-20 w-full text-xl font-normal text-white dark:text-gray-900`} style={{top: '0', left: '100%'}}>
                <span className={'bg-gray-800 dark:bg-white px-1 rounded-full'}>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </span>
            </div>
            <div
                className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <ul className="space-y-2">
                    <li>
                        <a href="/admin"
                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <FontAwesomeIcon className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" icon={faShop}/>
                            <span className="ml-3">Статистика</span>
                        </a>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openProducts, setOpenProducts)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faBowlFood}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Продукты</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openProducts ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/products"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Обзор</a>
                            </li>
                            <li>
                                <a href="/admin/products/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Создать</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openIngredients, setOpenIngredients)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faPlateWheat}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Ингредиенты</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openIngredients ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/ingredients"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Обзор</a>
                            </li>
                            <li>
                                <a href="/admin/ingredients/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Создать</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openTypeOrders, setOpenTypeOrders)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faCalendar}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Типы заказов</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openTypeOrders ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/typeorders"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Обзор</a>
                            </li>
                            <li>
                                <a href="/admin/typeorders/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Создать</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openCategories, setOpenCategories)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faList}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Категории</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openCategories ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/categories"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Обзор</a>
                            </li>
                            <li>
                                <a href="/admin/categories/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Создать</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openReviews, setOpenReviews)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faCloud}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Отзывы</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openReviews ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/reviews"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Обзор</a>
                            </li>
                            <li>
                                <a href="/admin/reviews/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Создать</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openUsers, setOpenUsers)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faUser}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Пользователи</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openUsers ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/users"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Обзор</a>
                            </li>
                            {user.isAdmin ?
                              <li>
                                  <a href="/admin/users/create"
                                     className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Создать</a>
                              </li>
                              : <></>}
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openRoles, setOpenRoles)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faPlay}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Роли</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openRoles ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/roles"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Обзор</a>
                            </li>
                            <li>
                                <a href="/admin/roles/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Создать</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openTariff, setOpenTariff)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faBookOpen}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Тарифы</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openTariff ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/tariff"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Обзор</a>
                            </li>
                            <li>
                                <a href="/admin/tariff/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Создать</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openPrivileges, setOpenPrivileges)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faArrowUp}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Преимущества</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openPrivileges ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/privileges"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Обзор</a>
                            </li>
                            <li>
                                <a href="/admin/privileges/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Создать</a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <button type="button" onClick={() => toggle(openTypes, setOpenTypes)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faListNumeric}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Типы</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openTypes ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/types"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Обзор</a>
                            </li>
                            <li>
                                <a href="/admin/types/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Создать</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openOrders, setOpenOrders)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faCartShopping}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">Заказы</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openOrders ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/orders"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Обзор</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
                    <li>
                        <a href="/admin/faqs"
                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                            <FontAwesomeIcon className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" icon={faBug}/>
                            <span className="ml-3 ">Зона FAQ</span>
                        </a>
                    </li>
                    <li>
                        <button type={'button'} onClick={() => navigate('/')} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                            <FontAwesomeIcon icon={faDoorOpen}/>
                            <span className={'pl-2'}>Выйти в меню</span>
                        </button>
                    </li>
                    <li>
                        <button type={'button'} onClick={logout} className="flex items-center p-2 text-base font-bold text-red-900 rounded-lg transition duration-75 hover:bg-red-100 dark:hover:bg-red-700 dark:text-red-500 group">
                            <FontAwesomeIcon icon={faClose}/>
                            <span className={'pl-2'}>Выйти из аккаунта</span>
                        </button>
                    </li>
                </ul>
            </div>
            </aside>
    );
});

export default Header;