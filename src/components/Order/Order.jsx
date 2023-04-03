import React, {useState} from 'react';
import getMealPlan from "../GenerationWeeklyMealPlan/GenerationWeeklyMealPlan";
import {favoriteProducts, favoriteIngredients, categories} from "../GenerationWeeklyMealPlan/mockdata";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Order = () => {
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [favoriteCategory, setFavoriteCategory] = useState();
    const [favoriteFood, setFavoriteFood] = useState([]);
    const [unlovedFood, setUnlovedFood] = useState([]);
    const [foodFromFavorite, setFoodFromFavorite] = useState([]);
    const [mealPlan, setMealPlan] = useState([]);
    const [mealPlanPrice, setMealPlanPrice] = useState({});
    const [wish, setWish] = useState('');

    const handleFavoriteFood = (e) => {
        let options = e.target.options;
        let value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setFavoriteFood(value);
    }

    const handleUnlovedFood = (e) => {
        let options = e.target.options;
        let value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({id: Number(options[i].value)});
            }
        }
        setUnlovedFood(value);
    }

    const handleFoodFromFavorite = (e) => {
        let options = e.target.options;
        let value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({id: Number(options[i].value)});
            }
        }
        setFoodFromFavorite(value);
    }


    const sendList = () => {
        try {
            const formData = new FormData();
            formData.append('fullname', fullname);
            formData.append('address', address);
            formData.append('phoneNumber', phoneNumber);
            formData.append('favoriteCategory', favoriteCategory);
            formData.append('favoriteFood', favoriteFood);
            formData.append('unlovedFood', unlovedFood);
            formData.append('foodFromFavorite', foodFromFavorite);
            formData.append('mealPlan', mealPlan);
            formData.append('mealPlanPrice', mealPlanPrice);
            formData.append('wish', wish);

            return console.log(formData);
        } catch (e) {
            console.log(e);
        }
    }

    const generateTheMealPlan = () => {
        try {
            const myArrayFiltered = favoriteProducts.filter((el) => {
                return foodFromFavorite.some((f) => {
                    return el.id === f.id;
                });
            });

            const userData = {
                favoriteCategory: favoriteCategory,
                unlovedFood: unlovedFood,
                foodFromFavorite: myArrayFiltered
            }
            const plan = getMealPlan(userData);

            setMealPlanPrice(plan['price']);
            console.log(plan)
            delete plan['price'];

            return setMealPlan(plan);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <Header/>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Создать заказ</h2>
                    <form action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ФИО
                                    </label>
                                <input type="text" name="name" id="name"
                                       onChange={event => setFullname(event.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите ваше ФИО" required={true}/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="address"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Адрес</label>
                                <input type="text" name="brand" id="address"
                                       onChange={event => setAddress(event.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder='Напишите ваш адрес до вашей "двери"' required={true}/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="price"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Телефон</label>
                                <input type="number" name="price" id="price"
                                       onChange={event => setPhoneNumber(event.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите ваш номер телефона +7..." required={true}/>
                            </div>
                            <div>
                                <label htmlFor="category"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Предпочитаемая категория</label>
                                <select id="category"
                                        onChange={event => setFavoriteCategory(event.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Выберете категорию</option>
                                    {categories.map((item) => {
                                        return <option key={item.id} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="ingredients"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выбери любимые продукты</label>
                                <select multiple={true} id="ingredients"
                                        onChange={(event) => handleFavoriteFood(event)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {favoriteIngredients.map((item) => {
                                        return <option key={item.id} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="unlovedIngredients"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выбери не любимые продукты</label>
                                <select multiple={true} id="unlovedIngredients"
                                        onChange={(event) => handleUnlovedFood(event)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {favoriteIngredients.map((item) => {
                                        return <option key={item.id} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="include"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Включить в рацион питания из Любимого</label>
                                <select multiple={true} id="include"
                                        onChange={(event) => handleFoodFromFavorite(event)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {favoriteProducts.map((item) => {
                                        return <option key={item.id} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Общее пожелание к составлению рациона</label>
                                <textarea id="description" rows="8"
                                          onChange={event => setWish(event.target.value)}
                                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                          placeholder="Опиши пожелания к своему рациону"></textarea>
                            </div>
                        </div>
                        <button type={"button"}
                                onClick={generateTheMealPlan}
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Составить рацион
                        </button>
                    </form>
                </div>
            </section>


            <section className={`bg-gray-50 dark:bg-gray-900 ${mealPlan.length !== 0 ? 'block' : 'hidden'} p-3 sm:p-5`}>
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Ваш рацион питания</h2>
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead>
                                    <tr className='border-2 border-gray-800 dark:border-white'>
                                        <th scope="col" className="px-4 py-3 border-r-2">День</th>
                                        <th scope="col" className="px-4 py-3 border-r-2">Завтрак</th>
                                        <th scope="col" className="px-4 py-3 border-r-2">Обед</th>
                                        <th scope="col" className="px-4 py-3 border-r-2">Ужин</th>
                                        <th scope="col" className="px-4 py-3">Перекус</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className='px-4 py-3'>Понедельник</th>
                                        {
                                            mealPlan['Понедельник']?.map((i) => {
                                                return <td key={i.id} className='px-4 py-3 text-gray-800 dark:text-white'>{i.title}</td>
                                        })
                                        }
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className='px-4 py-3'>Вторник</th>
                                        {
                                            mealPlan['Вторник']?.map((i) => {
                                                return <td key={i.id} className='px-4 py-3 text-gray-800 dark:text-white'>{i.title}</td>
                                            })
                                        }
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className='px-4 py-3'>Среда</th>
                                        {
                                            mealPlan['Среда']?.map((i) => {
                                                return <td key={i.id} className='px-4 py-3 text-gray-800 dark:text-white'>{i.title}</td>
                                            })
                                        }
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className='px-4 py-3'>Четверг</th>
                                        {
                                            mealPlan['Четверг']?.map((i) => {
                                                return <td key={i.id} className='px-4 py-3 text-gray-800 dark:text-white'>{i.title}</td>
                                            })
                                        }
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className='px-4 py-3'>Пятница</th>
                                        {
                                            mealPlan['Пятница']?.map((i) => {
                                                return <td key={i.id} className='px-4 py-3 text-gray-800 dark:text-white'>{i.title}</td>
                                            })
                                        }
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className='px-4 py-3'>Суббота</th>
                                        {
                                            mealPlan['Суббота']?.map((i) => {
                                                return <td key={i.id} className='px-4 py-3 text-gray-800 dark:text-white'>{i.title}</td>
                                            })
                                        }
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className='px-4 py-3'>Воскресенье</th>
                                        {
                                            mealPlan['Воскресенье']?.map((i) => {
                                                return <td key={i.id} className='px-4 py-3 text-gray-800 dark:text-white'>{i.title}</td>
                                            })
                                        }
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th className='px-4 py-3'>Цена: </th>
                                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{mealPlanPrice ? mealPlanPrice.price : ''}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 justify-center'>
                        <button type={"button"}
                                onClick={generateTheMealPlan}
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Обновить
                        </button>
                        <button type={"button"}
                                onClick={sendList}
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Заказать
                        </button>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default Order;