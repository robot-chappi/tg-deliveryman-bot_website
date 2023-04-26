import React, {useContext, useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {observer} from 'mobx-react-lite'
import {getUserWithAllInformation, patchUser} from '../../../../http/userAPI'
import {getRoles} from '../../../../http/roleAPI'
import {getTariffs} from '../../../../http/tariffAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowsRotate} from '@fortawesome/free-solid-svg-icons'
import {completeOrder, payOrder} from '../../../../http/orderAPI'
import {Context} from '../../../../index'

const EditUsers = observer(() => {
    // eslint-disable-next-line no-unused-vars
    const {id} = useParams();
    const navigate = useNavigate();
    const {user} = useContext(Context)

    const [chatId, setChatId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [roles, setRoles] = useState();
    const [role, setRole] = useState();
    const [tariffItem, setTariffItem] = useState();
    const [tariffs, setTariffs] = useState();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        getRoles().then(data => setRoles(data))
        getTariffs().then(data => setTariffs(data))
        getUserWithAllInformation(id).then(data => {
            setChatId(data.user.chatId)
            setName(data.user.name)
            setPhone(data.user.phoneNumber)
            setAddress(data.user.address)
            setRole(data.user.role)
            setTariffItem(data.user.tariff)
            setOrders(data.orders)
        }).finally(() => setLoading(false))
    }, [reload])

    const sendUser = async () => {
        try {
            const formData = new FormData();
            formData.append('chatId', chatId);
            formData.append('name', name);
            formData.append('phoneNumber', phone);
            formData.append('address', address);
            formData.append('roleId', role.id);
            formData.append('tariffId', tariffItem.id);

            await patchUser(id, formData);

            return navigate(`/admin/users/show/${id}`)
        } catch (e) {
            console.log(e);
        }
    }

    const changeIsComplete = async (id) => {
        await completeOrder(id)
        setReload(reload + 1)
    }

    const changeIsPaid = async (id) => {
        await payOrder(id)
        setReload(reload + 1)
    }

    if (loading) {
        return <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className={'text-gray-500 sm:text-xl dark:text-gray-400'}>Идет загрузка...</p>
        </div>
    }

    return (
        <div>
            <Header/>
            <section className="bg-white h-full pb-10 pt-10 dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <div className="mx-auto max-w-screen-sm">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Редактирование</h2>
                        <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Здесь можно отредактировать пользователя</p>
                    </div>
                    <form action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            {role.slug !== 'admin' && role.slug !== 'analyst' && role.slug !== 'copywriter' ?
                              <div className="sm:col-span-2">
                                  <label htmlFor="chatId"
                                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ChatId
                                  </label>
                                  <input type="text" name="chatId" id="chatId"
                                         onChange={event => setChatId(event.target.value)}
                                         value={chatId}
                                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                         placeholder="Напишите ChatId пользователя" required={true}/>
                              </div>
                              : <div className="sm:col-span-2">
                                  <label htmlFor="chatId"
                                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ChatId: {chatId}
                                  </label>
                              </div> }
                            <div className="sm:col-span-2">
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ФИО
                                </label>
                                <input type="text" name="name" id="name"
                                       onChange={event => setName(event.target.value)}
                                       value={name}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите ФИО пользователя" required={true}/>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="phone"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Телефон
                                </label>
                                <input type="number" name="phone" id="phone"
                                       onChange={event => setPhone(event.target.value)}
                                       value={phone}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите номер телефона пользователя" required={true}/>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="address"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Адрес
                                </label>
                                <input type="text" name="address" id="address"
                                       onChange={event => setAddress(event.target.value)}
                                       value={address}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите адрес пользователя" required={true}/>
                            </div>
                            {user.isAdmin ? <div>
                                <label htmlFor="role"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Роль</label>
                                <select id="role"
                                        onChange={event => setRole(event.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Выберете роль</option>
                                    {roles.map((item) => {
                                        return <option key={item.id} selected={role.id === item.id ? true : false} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div> : <></>}

                            <div>
                                <label htmlFor="tariff"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Тариф</label>
                                <select id="tariff"
                                        onChange={event => setTariffItem(event.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Выберете тариф</option>
                                    {tariffs.map((item) => {
                                        return <option key={item.id} selected={tariffItem.id === item.id ? true : false} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                            {orders && orders.length > 0 ?
                              <div className={'block mb-2 text-sm font-medium text-gray-900 dark:text-white'}>
                                  {orders.map(i => {
                                      return <div key={i.id}>
                                          <p><label>ID заказа:  {i.id}</label></p>
                                          <p className={'font-thin'}><label>Выполнено:  {i.isComplete ? 'Да' : 'Нет'} <button type={"button"} onClick={() => changeIsComplete(i.id)} className="inline-flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                              <FontAwesomeIcon icon={faArrowsRotate} />
                                          </button></label></p>
                                          <p className={'font-thin'}><label>Оплачено:  {i.isPaid ? 'Да' : 'Нет'} <button type={"button"} onClick={() => changeIsPaid(i.id)} className="inline-flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                              <FontAwesomeIcon icon={faArrowsRotate}/>
                                          </button></label></p>
                                      </div>
                                  })}
                              </div>
                            : <></>}
                        </div>
                        <button type={"button"}
                                onClick={sendUser}
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Отредактировать
                        </button>
                    </form>
                </div>
            </section>
            <Footer/>
        </div>
    );
});

export default EditUsers;