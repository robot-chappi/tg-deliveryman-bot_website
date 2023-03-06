import React, {useState} from 'react';
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {useNavigate} from "react-router-dom";
import {roles, tariff} from "../../../GenerationWeeklyMealPlan/mockdata";

const CreateUsers = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState();
    const [tariffItem, setTariffItem] = useState();


    const navigate = useNavigate();

    const sendUser = () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('role', role);
            formData.append('tariff', tariffItem);

            // return console.log({
            //     'name': name,
            //     'phone': phone,
            //     'address': address,
            //     'role': role,
            //     'tariff': tariff
            // });

            return navigate('/admin/users')
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <Header/>
            <section className="bg-white h-full pb-10 pt-10 dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <div className="mx-auto max-w-screen-sm">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Создание пользователя</h2>
                        <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Здесь можно создать нового пользователя</p>
                    </div>
                    <form action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ФИО
                                </label>
                                <input type="text" name="name" id="name"
                                       onChange={event => setName(event.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите ФИО пользователя" required={true}/>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="phone"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Телефон
                                </label>
                                <input type="number" name="phone" id="phone"
                                       onChange={event => setPhone(event.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите номер телефона пользователя" required={true}/>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="address"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Адрес
                                </label>
                                <input type="text" name="address" id="address"
                                       onChange={event => setAddress(event.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите адрес пользователя" required={true}/>
                            </div>
                            <div>
                                <label htmlFor="roles"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Роль</label>
                                <select id="roles"
                                        onChange={event => setRole(event.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Выберете роль</option>
                                    {roles.map((item) => {
                                        return <option key={item.id} value={item.id}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="tariff"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Тариф</label>
                                <select id="tariff"
                                        onChange={event => setTariffItem(event.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Выберете тариф</option>
                                    {tariff.map((item) => {
                                        return <option key={item.id} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <button type={"button"}
                                onClick={sendUser}
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Создать
                        </button>
                    </form>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default CreateUsers;