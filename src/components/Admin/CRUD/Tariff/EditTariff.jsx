import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {privileges} from "../../../GenerationWeeklyMealPlan/mockdata";

const EditTariff = () => {
    const tariff = {
        id: 1,
        title: 'ЭКО',
        description: 'Базовый тариф для опробования нашего сервиса',
        price: 0,
        privilege: [
            {
                id: 1,
                title: 'Качество продуктов'
            },
            {
                id: 2,
                title: 'Быстрая доставка'
            },
            {
                id: 3,
                title: 'Телеграм канал по еде'
            },
        ],
        discount: 0
    }

    // eslint-disable-next-line no-unused-vars
    const {id} = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState(tariff.title);
    const [description, setDescription] = useState(tariff.description);
    const [price, setPrice] = useState(tariff.price);
    const [privilege, setPrivilege] = useState(tariff.privilege);
    const [discount, setDiscount] = useState(tariff.discount);


    const sendTariff = () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('privilege', privilege);
            formData.append('discount', discount);

            // return console.log({
            //     'title': title,
            // });

            return navigate(`/admin/tariff/show/${tariff.id}`)
        } catch (e) {
            console.log(e);
        }
    }

    const handlePrivilege = (e) => {
        let options = e.target.options;
        let value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(Number(options[i].value));
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
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Телефон
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
                                        return <option key={item.id} selected={containsObject(item, tariff.privilege)} value={item.id}>{item.title}</option>
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
};

export default EditTariff;