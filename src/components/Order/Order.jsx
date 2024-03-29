import React, {useContext, useEffect, useState} from 'react'
import getMealPlan from "../GenerationWeeklyMealPlan/GenerationWeeklyMealPlan";
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
import {getProductsWithIngredients} from '../../http/productAPI'
import {createOrder, deleteUserOrder, getUserOrder} from '../../http/orderAPI'
import {createOrderMealPlanProducts} from '../../http/mealPlanAPI'
import {useNavigate} from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClose} from '@fortawesome/free-solid-svg-icons'
import TableCreateDiet from '../TableCreateDiet/TableCreateDiet'

const Order = observer(() => {
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [typeOrder, setTypeOrder] = useState();
    const [mealPlan, setMealPlan] = useState([]);
    const [mealPlanPrice, setMealPlanPrice] = useState({});
    const [wish, setWish] = useState('');
    const [isCreatedOrder, setIsCreatedOrder] = useState(false);
    const [isGeneratedDiet, setIsGeneratedDiet] = useState(false);
    const [isCreatedHandDiet, setIsCreatedHandDiet] = useState(false);
    // const [isCreatedOrder, setIsCreatedOrder] = useState(false);

    const [allTypeOrders, setAllTypeOrders] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allProductsWithIngredients, setAllProductsWithIngredients] = useState([]);
    const [allFavoriteProducts, setAllFavoriteProducts] = useState([]);
    const [allFavoriteIngredients, setAllFavoriteIngredients] = useState([]);
    const [allUnlovedIngredients, setAllUnlovedIngredients] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);


    const [favoriteCategory, setFavoriteCategory] = useState();
    // eslint-disable-next-line no-unused-vars
    const [favoriteIngredients, setFavoriteIngredients] = useState([]);
    const [unlovedIngredients, setUnlovedIngredients] = useState([]);
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [favoriteIngredientChecked, setfavoriteIngredientChecked] = useState(false);
    const [unlovedIngredientChecked, setUnlovedIngredientChecked] = useState(false);
    const [favoriteProductsChecked, setFavoriteProductsChecked] = useState(false);

    const [myOrder, setMyOrder] = useState({});

    const {user} = useContext(Context)
    const navigate = useNavigate();


    useEffect(() => {
        getCategories().then(data => setAllCategories(data))
        getIngredients().then(data => setAllIngredients(data))
        getTypeOrders().then(data => setAllTypeOrders(data))
        getProductsWithIngredients().then(data => setAllProductsWithIngredients(data))

        getUserOrder(user.user.chatId).then(data => setMyOrder(data))

        getUserChatFavoriteIngredients(user.user.chatId).then(data => setAllFavoriteIngredients(data))
        getUserChatUnlovedIngredients(user.user.chatId).then(data => setAllUnlovedIngredients(data))
        getUserChatFavoriteProducts(user.user.chatId).then(data => setAllFavoriteProducts(data)).finally(() => setLoading(false))
    }, [])

    const handleFavoriteIngredient = (e) => {
        let options = e.target.options;
        let value = [];

        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({id: Number(options[i].value)});
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
        setUnlovedIngredients(value);
    }

    const handleFavoriteProducts = (e) => {
        let options = e.target.options;
        let value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({id: Number(options[i].value)});
            }
        }
        let favoriteProductItem = []
        value.forEach(i => {
            const item = allProductsWithIngredients.find(x => x.id === i.id);
            favoriteProductItem.push(item)
        })
        setFavoriteProducts(favoriteProductItem);
        favoriteProductItem = []
    }


    const createOrderFunc = async () => {
        try {
            if (!isCreatedOrder) {
                const formData = new FormData();
                formData.append('fullname', fullname);
                formData.append('address', address);
                formData.append('phoneNumber', phoneNumber);
                formData.append('wish', wish);
                formData.append('price', 0);
                formData.append('category_id', favoriteCategory);
                formData.append('typeOrderId', typeOrder);
                formData.append('chatId', user.user.chatId);
                formData.append('user_id', user.user.id);
                formData.append('isComplete', false);
                formData.append('isPaid', false);

                const response = await createOrder(formData)

                if (response.error) {
                    return alert('Ошибка, у тебя уже есть заказ, ты должен удалить заказ или оплатить его')
                }
                return setIsCreatedOrder(true)
            }
            return alert('Ошибка, у тебя уже есть заказ, теперь ты должен составить свой рацион, а затем оплатить или удалить заказ')
        } catch (e) {
            alert('Ошибка, что-то введено не верно или у тебя уже есть заказ, теперь ты должен составить свой рацион, а затем оплатить или удалить заказ.')
        }
    }

    const createMealPlanFunc = async () => {
        try {
            const userOrder = await getUserOrder(user.user.chatId);
            if (userOrder && isCreatedOrder) {
                await createOrderMealPlanProducts({order_id: userOrder.id, meal_plan_id: userOrder.mealplan.id, products: mealPlan, price: mealPlanPrice.price});
                return navigate('/payment')
            }
            return alert('Ошибка, ты еще не оформил основной заказ!')
        } catch (e) {
            alert('Ошибка, что-то пошло не так')
        }
    }

    const closeGeneratedOrder = () => {
        setIsGeneratedDiet(false)
        setMealPlan([])
    }

    const closeCreateHandDiet = () => {
        setIsCreatedHandDiet(false)
        setMealPlan([])
    }

    const openCreateHandDiet = () => {
        setIsGeneratedDiet(false)
        setIsCreatedHandDiet(true)
        setMealPlan([])
    }


    const generateTheMealPlan = () => {
        try {
            let unlovedIngredientsArray = [];
            let favoriteProductsArray = [];

            let userData = {
                favoriteCategory: favoriteCategory,
                unlovedIngredients: unlovedIngredients,
                favoriteProducts: favoriteProducts,
                products: allProductsWithIngredients
            }

            if (unlovedIngredientChecked) {
                allUnlovedIngredients.forEach(i => {
                    unlovedIngredientsArray.push(i.ingredient)
                })
                userData.unlovedIngredients = unlovedIngredientsArray
            }

            if (favoriteProductsChecked) {
                allFavoriteProducts.forEach(i => {
                    favoriteProductsArray.push(i.product)
                })
                userData.favoriteProducts = favoriteProductsArray
            }

            const plan = getMealPlan(userData);

            setMealPlanPrice(plan['price']);
            delete plan['price'];

            setMealPlan(plan);
            setIsCreatedHandDiet(false)
            return setIsGeneratedDiet(true)
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
            <div className={'bg-white dark:bg-gray-900'}>
              {myOrder ? <div className={'rounded-lg bg-red-50 dark:bg-gray-800'}>
                  <div id="alert-2"
                       className="flex p-4 text-red-800 dark:text-red-400"
                       role="alert">
                      <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"></path>
                      </svg>
                      <span className="sr-only">Info</span>
                      <div className="ml-3 text-sm font-medium">
                          У вас уже есть заказ! Оплатите или удалите его чтобы заново оформить заказ
                      </div>
                  </div>
                  <div className={'flex pb-5 justify-center gap-2 item-center'}>
                    <button type="button"
                            onClick={async () => {await deleteUserOrder(user.user.chatId).then(() => navigate('/'))}}
                            className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
                            data-dismiss-target="#alert-2" aria-label="Close">
                          Удалить
                      </button>
                      <button type="button"
                              onClick={() => navigate('/payment')}
                              className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800"
                              data-dismiss-target="#alert-2" aria-label="Close">
                          Оплатить
                      </button>
                  </div>
              </div> : <></>}
          </div>
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

                            <section className={`${isCreatedOrder ? 'block' : 'hidden'}`}>
                                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Создать рацион питания</h2>
                                <div className={'mb-4'}>
                                    <label htmlFor="ingredients"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выбери любимые ингридиенты</label>
                                    <div className={'block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-4'}>
                                        <p className="text-sm font-thin text-gray-900 dark:text-gray-200">Твои любимые ингридиенты:</p>
                                        <div className={'mb-4 flex gap-2'}>
                                            {allFavoriteIngredients.map(i => {
                                                return <p key={i.id} className="text-sm font-thin text-gray-900 dark:text-gray-200">{i.ingredient.title}</p>
                                            })}
                                        </div>
                                        <div
                                          className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input type="checkbox" checked={favoriteIngredientChecked} onChange={({target: {checked}}) => setfavoriteIngredientChecked(checked)}
                                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                <label htmlFor="bordered-checkbox-1"
                                                       className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Выбрать это</label>
                                        </div>
                                    </div>
                                    <select disabled={favoriteIngredientChecked ? true : false} multiple={true} id="ingredients"
                                            onChange={(event) => handleFavoriteIngredient(event)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        {allIngredients.map((item) => {
                                            return <option key={item.id} value={item.id}>{item.title}</option>
                                        })}
                                    </select>
                                </div>
                                <div className={'mb-4'}>
                                    <label htmlFor="unlovedIngredients"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выбери не любимые продукты</label>
                                    <div className={'block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-4'}>
                                        <p className="text-sm font-thin text-gray-900 dark:text-gray-200">Твои нелюбимые ингридиенты:</p>
                                        <div className={'mb-4 flex gap-2'}>
                                            {allUnlovedIngredients.map(i => {
                                                return <p key={i.id} className="text-sm font-thin text-gray-900 dark:text-gray-200">{i.ingredient.title}</p>
                                            })}
                                        </div>
                                        <div
                                          className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input type="checkbox" checked={unlovedIngredientChecked} onChange={({target: {checked}}) => setUnlovedIngredientChecked(checked)}
                                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="bordered-checkbox-1"
                                                   className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Выбрать это</label>
                                        </div>
                                    </div>
                                    <select disabled={unlovedIngredientChecked ? true : false} multiple={true} id="unlovedIngredients"
                                            onChange={(event) => handleUnlovedIngredient(event)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        {allIngredients.map((item) => {
                                            return <option key={item.id} value={item.id}>{item.title}</option>
                                        })}
                                    </select>
                                </div>
                                <div className={'mb-4'}>
                                    <label htmlFor="include"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Включить в рацион питания из Любимого</label>
                                    <div className={'block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-4'}>
                                        <p className="text-sm font-thin text-gray-900 dark:text-gray-200">Твои любимые продукты:</p>
                                        <div className={'mb-4 flex gap-2'}>
                                            {allFavoriteProducts.map(i => {
                                                return <p key={i.id} className="text-sm font-thin text-gray-900 dark:text-gray-200">{i.product.title}</p>
                                            })}
                                        </div>
                                        <div
                                          className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                            <input type="checkbox" checked={favoriteProductsChecked} onChange={({target: {checked}}) => setFavoriteProductsChecked(checked)}
                                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label htmlFor="bordered-checkbox-1"
                                                   className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Выбрать это</label>
                                        </div>
                                    </div>
                                    <select disabled={favoriteProductsChecked ? true : false} multiple={true} id="include"
                                            onChange={(event) => handleFavoriteProducts(event)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        {allProductsWithIngredients.map((item) => {
                                            return <option key={item.id} value={item.id}>{item.title}</option>
                                        })}
                                    </select>
                                </div>
                                <div className={'flex item-center justify-center gap-2'}>
                                    <button type={"button"}
                                            onClick={generateTheMealPlan}
                                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                        Сгенерировать рацион
                                    </button>
                                    <button type={"button"}
                                            onClick={openCreateHandDiet}
                                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                        Составить рацион
                                    </button>
                                </div>
                            </section>
                        </div>
                    </form>
                </div>
            </section>

            <section className={`bg-gray-50 dark:bg-gray-900 ${isCreatedHandDiet ? 'block' : 'hidden'} p-3 sm:p-5`}>
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Ваш рацион питания</h2>
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <TableCreateDiet/>
                        </div>
                    </div>
                    <div className={'flex justify-center'}>
                        <button type={"button"}
                                onClick={closeCreateHandDiet}
                                className="inline-flex items-center px-5 gap-2 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            <FontAwesomeIcon icon={faClose}/>
                            Закрыть
                        </button>
                    </div>
                </div>
            </section>


            <section className={`bg-gray-50 dark:bg-gray-900 ${mealPlan.length !== 0 && isGeneratedDiet ? 'block' : 'hidden'} p-3 sm:p-5`}>
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
                    <div className={'flex justify-center'}>
                        <button type={"button"}
                                onClick={closeGeneratedOrder}
                                className="inline-flex items-center px-5 gap-2 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            <FontAwesomeIcon icon={faClose}/>
                            Закрыть
                        </button>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
});

export default Order;