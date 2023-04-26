import React, {useContext, useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBookOpen, faEdit, faMinus} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {Context} from '../../../../../index'
import {deleteUser, getPaginationUsers} from '../../../../../http/userAPI'
import {observer} from 'mobx-react-lite'
import {getTariffs} from '../../../../../http/tariffAPI'
import {getRoles} from '../../../../../http/roleAPI'

const TableUsers = observer(() => {
    // eslint-disable-next-line no-unused-vars
    const {main, user} = useContext(Context);
    const [reloadPage, setReloadPage] = useState(0);
    const [roles, setRoles] = useState([]);
    const [tariffs, setTariffs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRoles().then(data => setRoles(data))
        getTariffs().then(data => setTariffs(data))
        getPaginationUsers(null, null, 3,1).then(data => {
            main.setUsers(data.rows)
            main.setTotalCountUsers(data.count)
        })
    }, [])

    useEffect(() => {
        getPaginationUsers(main.selectedUsersRoleId.id, main.selectedUsersTariffId.id, 2, main.pageUsers).then(data => {
            main.setUsers(data.rows)
            main.setTotalCountUsers(data.count)
        })
    }, [main.pageUsers, main.selectedUsersRoleId, main.selectedUsersTariffId, reloadPage])


    const openUser = (id) => {
        return navigate(`/admin/users/show/${id}`);
    }

    const editUser = (id) => {
        return navigate(`/admin/users/edit/${id}`);
    }

    const deleteUserItem = async (id) => {
        await deleteUser(id);
        setReloadPage(reloadPage + 1)
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Пользователи</h2>
                    <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Здесь можно увидеть всех пользователей</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
                    <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
                        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                            <div
                                className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                                <div className="flex items-center flex-1 space-x-4">
                                    <h5>
                                        <span className="text-gray-500">Всего пользователей: </span>
                                        <span className="dark:text-white">{main.totalCountUsers}</span>
                                    </h5>
                                </div>
                                {user.isAdmin ?
                                  <div
                                    className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                                      <button type="button" onClick={() => navigate('/admin/users/create')}
                                              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                          <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                               xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                              <path clipRule="evenodd" fillRule="evenodd"
                                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                                          </svg>
                                          Добавить пользователя
                                      </button>
                                  </div>
                                  : <></>}
                                <h5><span className={'text-gray-500'}>Роли:</span></h5>
                                <div className={'flex items-center gap-1'} style={{flexWrap: 'wrap'}}>
                                    {roles.map((item) => {
                                        return <button key={item.id} onClick={() => main.setSelectedUsersRoleId(item)} type={'button'} className={`flex items-center justify-center px-4 py-1 text-sm font-medium text-white rounded-lg ${main.selectedUsersRoleId.id === item.id ? 'bg-primary-600' : 'bg-primary-500 dark:bg-gray-800 dark:bg-primary-400 '} hover:bg-primary-600 focus:ring-4 focus:ring-primary-100 dark:hover:bg-primary-500 focus:outline-none dark:focus:ring-primary-600`}>
                                            {item.title}
                                        </button>
                                    })}
                                    <button onClick={() => main.setSelectedUsersRoleId({id: null})} type={'button'} className="flex items-center justify-center px-4 py-1 text-sm font-medium text-white rounded-lg bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-primary-100 dark:bg-primary-400 dark:hover:bg-primary-500 focus:outline-none dark:focus:ring-primary-600">
                                        Сбросить
                                    </button>
                                </div>
                                <h5><span className={'text-gray-500'}>Тарифы:</span></h5>
                                <div className={'flex items-center gap-1'} style={{flexWrap: 'wrap'}}>
                                    {tariffs.map((item) => {
                                        return <button key={item.id} onClick={() => main.setSelectedUsersTariffId(item)} type={'button'} className={`flex items-center justify-center px-4 py-1 text-sm font-medium text-white rounded-lg ${main.selectedUsersTariffId.id === item.id ? 'bg-primary-600' : 'bg-primary-500 dark:bg-gray-800 dark:bg-primary-400 '} hover:bg-primary-600 focus:ring-4 focus:ring-primary-100 dark:hover:bg-primary-500 focus:outline-none dark:focus:ring-primary-600`}>
                                            {item.title}
                                        </button>
                                    })}
                                    <button onClick={() => main.setSelectedUsersTariffId({id: null})} type={'button'} className="flex items-center justify-center px-4 py-1 text-sm font-medium text-white rounded-lg bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-primary-100 dark:bg-primary-400 dark:hover:bg-primary-500 focus:outline-none dark:focus:ring-primary-600">
                                        Сбросить
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">Инструменты</th>
                                        <th scope="col" className="px-4 py-3">ID</th>
                                        <th scope="col" className="px-4 py-3">ФИО</th>
                                        <th scope="col" className="px-4 py-3">Телефон</th>
                                        <th scope="col" className="px-4 py-3">Адрес</th>
                                        <th scope="col" className="px-4 py-3">Роль</th>
                                        <th scope="col" className="px-4 py-3">Тариф</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {main.users.map((i) => {
                                        return <tr key={i.id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <td className="w-4 px-4 py-3">
                                                <div className={'flex items-center gap-2'}>
                                                    <button type="button" onClick={() => openUser(i.id)}
                                                            className="px-2 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                                        <FontAwesomeIcon icon={faBookOpen}/>
                                                    </button>
                                                    <button type="button" onClick={() => editUser(i.id)}
                                                            className="px-2 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                                        <FontAwesomeIcon icon={faEdit}/>
                                                    </button>
                                                    {user.isAdmin ?
                                                      <button type="button" onClick={() => deleteUserItem(i.id)}
                                                              className="px-2 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                                          <FontAwesomeIcon icon={faMinus}/>
                                                      </button>
                                                      : <></>}
                                                </div>
                                            </td>
                                            <th scope="row"
                                                className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {i.id}
                                            </th>
                                            <td className="px-4 py-2">
                                                {i.name}
                                            </td>
                                            <td className="px-4 py-2">
                                                {i.phoneNumber}
                                            </td>
                                            <td className="px-4 py-2">
                                                {i.address}
                                            </td>
                                            <td className="px-4 py-2">
                                                {i.role.title}
                                            </td>
                                            <td className="px-4 py-2">
                                                {i.tariff.title}
                                            </td>
                                        </tr>

                                    })}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <div className={'flex items-center justify-center mt-4'}>
                                    <button disabled={main.pageUsers !== 1 ? false : true} type={'button'} onClick={() => {
                                        main.setPageUsers(main.pageUsers - 1)
                                    }}
                                            className={`${main.pageUsers !== 1 ? 'block' : 'hidden'} inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                        Предыдущий
                                    </button>
                                    <button type={'button'} onClick={() => {
                                        main.setPageUsers(main.pageUsers + 1)
                                    }}
                                            disabled={main.users.length < 2 ? true : false}
                                            className={`${main.users.length < 2 ? 'hidden' : 'block'} inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                        Следующий
                                        <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className={'py-3'}>
                                    <div className={'flex justify-center mt-2'}>
                                        <p className={'text-sm font-medium text-gray-800 dark:text-white'}>{'Колличество: ' + main.totalCountUsers}</p>
                                    </div>
                                    <div className={'flex justify-center mt-2'}>
                                        <p className={'text-sm font-medium text-gray-800 dark:text-white'}>{'Страница: ' + main.pageUsers}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default TableUsers;