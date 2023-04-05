import React, {useContext, useEffect, useState} from 'react'
import getMealPlan from "../GenerationWeeklyMealPlan/GenerationWeeklyMealPlan";
// import {favoriteProducts, favoriteIngredients, categories} from "../GenerationWeeklyMealPlan/mockdata";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {observer} from 'mobx-react-lite'
import {Context} from '../../index'
import {getCategories} from '../../http/categoryAPI'
import {getUserChatFavoriteIngredients} from '../../http/favoriteIngredientAPI'
import {getUserChatUnlovedIngredients} from '../../http/unlovedIngredientAPI'
import {getUserChatFavoriteProducts} from '../../http/favoriteProductAPI'
import {getIngredients} from '../../http/ingredientsAPI'
import {getTypeOrders} from '../../http/typeOrderAPI'
import {getProducts} from '../../http/productAPI'
import {getUserOrder} from '../../http/orderAPI'
import {createMealPlanProducts} from '../../http/mealPlanAPI'
import {useNavigate} from 'react-router-dom'

const Order = observer(() => {
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [typeOrder, setTypeOrder] = useState();
    const [favoriteFood, setFavoriteFood] = useState([]);
    const [unlovedFood, setUnlovedFood] = useState([]);
    const [foodFromFavorite, setFoodFromFavorite] = useState([]);
    const [mealPlan, setMealPlan] = useState([]);
    const [mealPlanPrice, setMealPlanPrice] = useState({});
    const [wish, setWish] = useState('');
    const [isCreatedOrder, setIsCreatedOrder] = useState(false);

    const [allTypeOrders, setAllTypeOrders] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [allFavoriteProducts, setAllFavoriteProducts] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);


    const [favoriteCategory, setFavoriteCategory] = useState();
    const [favoriteIngredients, setFavoriteIngredients] = useState([]);
    const [unlovedIngredients, setUnlovedIngredients] = useState([]);
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const {user} = useContext(Context)
    const navigate = useNavigate();
    // const {chatId, fullname, phoneNumber, address, wish, price, isComplete, isPaid, category_id, user_id, typeOrderId} = req.body

    useEffect(() => {
        getCategories().then(data => setAllCategories(data))
        getIngredients().then(data => setAllIngredients(data))
        getTypeOrders().then(data => setAllTypeOrders(data))
        getProducts().then(data => setAllProducts(data))
        getUserChatFavoriteIngredients(user.user.chatId).then(data => setFavoriteIngredients(data))
        getUserChatUnlovedIngredients(user.user.chatId).then(data => setUnlovedIngredients(data))
        getUserChatFavoriteProducts(user.user.chatId).then(data => setAllFavoriteProducts(data)).finally(() => setLoading(false))
    }, [])


    function containsObjectIngredient(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i]?.ingredient.id === obj.id) {
                return true;
            }
        }
        return false;
    }

    const handleFavoriteIngredient = (e) => {
        let options = e.target.options;
        let value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setFavoriteIngredients(value);
    }

    const handleUnlovedIngredient = (e) => {
        let options = e.target.options;
        let value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({id: Number(options[i].value)});
            }
        }
        setFavoriteIngredients(value);
    }

    const handleFavoriteProducts = (e) => {
        let options = e.target.options;
        let value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({id: Number(options[i].value)});
            }
        }
        setFavoriteProducts(value);
    }


    const createOrderFunc = async () => {
        try {
            if (!isCreatedOrder) {
                const formData = new FormData();
                formData.append('fullname', fullname);
                formData.append('address', address);
                formData.append('phoneNumber', phoneNumber);
                formData.append('wish', wish);
                formData.append('price', null);
                formData.append('category_id', favoriteCategory);
                formData.append('typeOrderId', typeOrder);
                formData.append('chatId', user.user.chatId);
                formData.append('user_id', user.user.id);
                formData.append('isComplete', false);
                formData.append('isPaid', false);

                const itemOrder = await createOrderFunc(formData);
                console.log(itemOrder)
                if (itemOrder.status === 404) {
                    return alert('Ошибка, что-то не введено')
                }
                return setIsCreatedOrder(true)
            }
            return alert('Ошибка, у тебя уже есть заказ, теперь ты должен составить свой рацион, а затем оплатить или удалить заказ')
        } catch (e) {
            console.log(e);
        }
    }

    const createMealPlanFunc = async () => {
        try {
            const userOrder = await getUserOrder(user.user.chatId);
            if (userOrder && isCreatedOrder) {
                const formData = new FormData();
                formData.append('order_id', userOrder.id);
                formData.append('meal_plan_id', userOrder.mealplan.id);
                formData.append('products', mealPlan);
                formData.append('price', mealPlanPrice);

                const itemMealPlan = await createMealPlanProducts(formData);
                console.log(itemMealPlan)
                if (itemMealPlan.status === 404) {
                    return alert('Ошибка, что-то пошло не так')
                }
                return navigate('/payment')
            }
            return alert('Ошибка, ты еще не оформил основной заказ!')
        } catch (e) {
            console.log(e);
        }
    }

    const generateTheMealPlan = () => {
        try {
            const myArrayFiltered = allProducts.filter((el) => {
                return favoriteProducts.some((f) => {
                    return el.id === f.id;
                });
            });

            const userData = {
                // getUserOrder
                favoriteCategory: favoriteCategory,
                unlovedIngredients: unlovedIngredients,
                favoriteProducts: favoriteProducts,
                products: allProducts
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

    if (loading) {
        return <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className={'text-gray-500 sm:text-xl dark:text-gray-400'}>Идет загрузка...</p>
        </div>
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
                                    {allCategories.map((item) => {
                                        return <option key={item.id} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="typeOrder"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Тип оплаты | заказа</label>
                                <select id="typeOrder"
                                        onChange={event => setTypeOrder(event.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Выберете тип оплаты</option>
                                    {allTypeOrders.map((item) => {
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
                            <div>
                                <button type={"button"}
                                        onClick={createOrderFunc}
                                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                    Сделать заказ
                                </button>
                            </div>
                            <section className={`${isCreatedOrder ? 'block' : ''}`}>
                                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Создать рацион питания</h2>
                                <div className={'mb-4'}>
                                    <label htmlFor="ingredients"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выбери любимые продукты</label>
                                    <select multiple={true} id="ingredients"
                                            onChange={(event) => handleFavoriteIngredient(event)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        {allIngredients.map((item) => {
                                            return <option key={item.id} selected={containsObjectIngredient(item, favoriteIngredients) ? true : false} value={item.id}>{item.title}</option>
                                        })}
                                    </select>
                                </div>
                                <div className={'mb-4'}>
                                    <label htmlFor="unlovedIngredients"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выбери не любимые продукты</label>
                                    <select multiple={true} id="unlovedIngredients"
                                            onChange={(event) => handleUnlovedIngredient(event)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        {allIngredients.map((item) => {
                                            return <option key={item.id} selected={containsObjectIngredient(item, unlovedIngredients) ? true : false} value={item.id}>{item.title}</option>
                                        })}
                                    </select>
                                </div>
                                <div className={'mb-4'}>
                                    <label htmlFor="include"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Включить в рацион питания из Любимого</label>
                                    <select multiple={true} id="include"
                                            onChange={(event) => handleFavoriteProducts(event)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        {allFavoriteProducts.map((item) => {
                                            return <option key={item.id} value={item.product.id}>{item.product.title}</option>
                                        })}
                                    </select>
                                </div>
                                <button type={"button"}
                                        onClick={generateTheMealPlan}
                                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                    Составить рацион
                                </button>
                            </section>
                        </div>
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
                                onClick={createMealPlanFunc}
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Заказать
                        </button>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
});

export default Order;