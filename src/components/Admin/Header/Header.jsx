import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArrowRight, faArrowUp, faBookOpen,
    faBowlFood,
    faBug,
    faCartShopping,
    faClose,
    faDoorOpen, faList, faListNumeric,
    faPlay,
    faShop, faUser
} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";


const Header = () => {
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
                            <span className="ml-3">????????????????????</span>
                        </a>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openProducts, setOpenProducts)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faBowlFood}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">????????????????</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openProducts ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/products"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????</a>
                            </li>
                            <li>
                                <a href="/admin/products/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????????</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openCategories, setOpenCategories)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faList}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">??????????????????</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openCategories ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/categories"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????</a>
                            </li>
                            <li>
                                <a href="/admin/categories/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????????</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openUsers, setOpenUsers)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faUser}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">????????????????????????</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openUsers ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/users"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????</a>
                            </li>
                            <li>
                                <a href="/admin/users/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????????</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openRoles, setOpenRoles)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faPlay}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">????????</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openRoles ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/roles"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????</a>
                            </li>
                            <li>
                                <a href="/admin/roles/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????????</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openTariff, setOpenTariff)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faBookOpen}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">????????????</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openTariff ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/tariff"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????</a>
                            </li>
                            <li>
                                <a href="/admin/tariff/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????????</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openPrivileges, setOpenPrivileges)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faArrowUp}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">????????????????????????</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openPrivileges ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/privileges"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????</a>
                            </li>
                            <li>
                                <a href="/admin/privileges/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????????</a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <button type="button" onClick={() => toggle(openTypes, setOpenTypes)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faListNumeric}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">????????</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openTypes ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/types"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????</a>
                            </li>
                            <li>
                                <a href="/admin/types/create"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????????</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button type="button" onClick={() => toggle(openOrders, setOpenOrders)}
                                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                aria-controls="dropdown-pages" data-collapse-toggle="dropdown-pages">
                            <FontAwesomeIcon className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" icon={faCartShopping}/>
                            <span className="flex-1 ml-3 text-left whitespace-nowrap">????????????</span>
                        </button>
                        <ul id="dropdown-pages" className={`${openOrders ? 'block' : 'hidden'} py-2 space-y-2`}>
                            <li>
                                <a href="/admin/orders"
                                   className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">??????????</a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
                    <li>
                        <a href="/admin/faqs"
                           className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                            <FontAwesomeIcon className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" icon={faBug}/>
                            <span className="ml-3 ">???????? FAQ</span>
                        </a>
                    </li>
                    <li>
                        <button type={'button'} onClick={logout} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                            <FontAwesomeIcon icon={faDoorOpen}/>
                            <span className={'pl-1'}>??????????</span>
                        </button>
                    </li>
                </ul>
            </div>
            </aside>
    );
};

export default Header;