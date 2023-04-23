import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {getTariffWithPrivileges, patchTariff} from '../../../../http/tariffAPI'
import {getPrivileges} from '../../../../http/privilegeAPI'
import {observer} from 'mobx-react-lite'

const EditTariff = observer(() => {
    // eslint-disable-next-line no-unused-vars
    const {id} = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState();
    const [privileges, setPrivileges] = useState([]);
    const [privilege, setPrivilege] = useState([]);
    const [discount, setDiscount] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPrivileges().then(data => setPrivileges(data))
        getTariffWithPrivileges(id).then(data => {
            setTitle(data.title)
            setDescription(data.description)
            setPrice(data.price)
            setPrivilege(data.privileges)
            setDiscount(data.discount)
        }).finally(() => setLoading(false))
    }, [])


    const sendTariff = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('privileges', JSON.stringify(privilege));
            formData.append('discount', discount);

            await patchTariff(id, formData);

            return navigate(`/admin/tariff/show/${id}`)
        } catch (e) {
            console.log(e);
        }
    }

    const handlePrivilege = (e) => {
        let options = e.target.options;
        let value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({id: Number(options[i].value)
            });
            }
        }
        setPrivilege(value);
    }

    const containsObject = (obj, list) => {
        var i;
        for (i = 0; i < list.length; i++) {
            if (Number(list[i]['id']) === Number(obj.id)) {
                return true;
            }
        }

        return false;
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
                        <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Здесь можно отредактировать тариф</p>
                    </div>
                    <form action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="title"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название
                                </label>
                                <input type="text" name="title" id="title"
                                       onChange={event => setTitle(event.target.value)}
                                       value={title}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите название тарифа" required={true}/>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание
                                </label>
                                <input type="text" name="description" id="description"
                                       onChange={event => setDescription(event.target.value)}
                                       value={description}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите описание тарифа" required={true}/>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="price"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Цена
                                </label>
                                <input type="number" name="price" id="price"
                                       onChange={event => setPrice(event.target.value)}
                                       value={price}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите цену тарифа" required={true}/>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="discount"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Скидка
                                </label>
                                <input type="number" name="discount" id="discount"
                                       onChange={event => setDiscount(event.target.value)}
                                       value={discount}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите скидку от тарифа" required={true}/>
                            </div>
                            <div>
                                <label htmlFor="privilege"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Привелегии</label>
                                <select multiple={true} id="privilege"
                                        onChange={(event) => handlePrivilege(event)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {privileges.map((item) => {
                                        return <option key={item.id} selected={containsObject(item, privilege)} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <button type={"button"}
                                onClick={sendTariff}
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

export default EditTariff;