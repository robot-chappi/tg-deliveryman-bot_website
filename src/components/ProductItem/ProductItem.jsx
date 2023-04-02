import React, {useContext, useEffect, useState} from 'react'
import './ProductItem.css';
import {Link, useNavigate, useParams} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {Context} from '../../index'
import {tgChannel} from '../../variables/charts'
import {observer} from 'mobx-react-lite'
import {getProduct} from '../../http/productAPI'
import {getMyFavoriteIngredientItem, getMyUnlovedIngredientItem} from '../../http/userAPI'
import {createFavoriteIngredient, getUserChatFavoriteIngredients} from '../../http/favoriteIngredientAPI'
import {createUnlovedIngredient, getUserChatUnlovedIngredients} from '../../http/unlovedIngredientAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsDown, faThumbsUp} from '@fortawesome/free-solid-svg-icons'

const ProductItem = observer(() => {
    const [loading, setLoading] = useState(true);
    const [textIngredient, setTextIngredient] = useState('');
    const [addAction, setAddAction] = useState(false);
    const [favoriteIngItems, setFavoriteIngItems] = useState([]);
    const [unlovedIngItems, setUnlovedIngItems] = useState([]);
    const {productId} = useParams();
    const navigate = useNavigate();
    const {user, products} = useContext(Context);

    useEffect(() => {
        getUserChatFavoriteIngredients(user.user.chatId).then(data => setFavoriteIngItems(data))
        getUserChatUnlovedIngredients(user.user.chatId).then(data => setUnlovedIngItems(data))
        getProduct(productId).then(data => products.setProduct(data)).finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        getUserChatFavoriteIngredients(user.user.chatId).then(data => setFavoriteIngItems(data))
        getUserChatUnlovedIngredients(user.user.chatId).then(data => setUnlovedIngItems(data))
    }, [addAction])

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i]?.ingredient.id === obj.id) {
                return true;
            }
        }
        return false;
    }

    const addFavoriteIngredient = async (id) => {
        try {
            const favoriteIngredientItem = await getMyFavoriteIngredientItem(user.user.chatId);
            const unlovedIngredientItem = await getMyUnlovedIngredientItem(user.user.chatId);
            const response = await createFavoriteIngredient({unloved_ingredient_id: unlovedIngredientItem.id, favorite_ingredient_id: favoriteIngredientItem.id, ingredient_id: id})
            setTextIngredient(response.message)
            setAddAction(true)
            setTimeout(() => {
                setTextIngredient('')
                setAddAction(false)
            }, 1500)
        } catch (e) {
            console.log(e)
        }
    }

    const addUnlovedIngredient = async (id) => {
        try {
            const unlovedIngredientItem = await getMyUnlovedIngredientItem(user.user.chatId);
            const favoriteIngredientItem = await getMyFavoriteIngredientItem(user.user.chatId);
            const response = await createUnlovedIngredient({favorite_ingredient_id: favoriteIngredientItem.id, unloved_ingredient_id: unlovedIngredientItem.id, ingredient_id: id})
            setTextIngredient(response.message)
            setAddAction(true)
            setTimeout(() => {
                setTextIngredient('')
                setAddAction(false)
            }, 1500)
        } catch (e) {
            console.log(e)
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
        <section className="bg-white dark:bg-gray-900 pb-6">
            <button className={"inline-flex justify-center items-center py-2 px-3 text-base font-medium text-center text-white rounded-br-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"} onClick={() => navigate(-1)}>Назад</button>
            <div
                className="gap-8 mb-10 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <img data-aos={"fade-down"} data-aos-duration={"1000"} className="w-full dark:hidden"
                     src={products.product.product.image.includes('http') ? products.product.product.image : `${process.env.REACT_APP_API_URL+'/'+products.product.product.image}`}
                     alt={'dashboard'}/>
                <img data-aos={"fade-down"} data-aos-duration={"1000"} className="w-full hidden dark:block"
                     src={products.product.product.image.includes('http') ? products.product.product.image : `${process.env.REACT_APP_API_URL+'/'+products.product.product.image}`}
                     alt={'dashboard'}/>
                <div data-aos={"fade-up"} data-aos-duration={"1000"} className="mt-4 md:mt-0">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{products.product.product.title}</h2>
                    <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">{products.product.product.description}</p>
                    <hr className="mb-3 border-gray-500 md:text-lg dark:border-gray-400"/>
                    <div>
                        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                            Ингредиенты: </h2>
                        <ul className={'mb-6 block max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400'}>
                            {products.product.ingredients.map(i => {
                                return <li key={i.id}>
                                    <div className={'gap-1 flex items-center'}>
                                        <p>{i.title}</p>
                                        <button type="button"
                                                onClick={() => addFavoriteIngredient(i.id)}
                                                className={`text-white ${containsObject(i, favoriteIngItems) ? 'bg-green-700 dark:bg-green-600' : 'bg-gray-700 dark:bg-gray-600'} hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-1.5 py-1 text-center dark:hover:bg-green-700 dark:focus:ring-green-800`}><FontAwesomeIcon icon={faThumbsUp}/>
                                        </button>
                                        <button type="button"
                                                onClick={() => addUnlovedIngredient(i.id)}
                                                className={`text-white ${containsObject(i, unlovedIngItems) ? 'bg-red-700 dark:bg-red-600' : 'bg-gray-700 dark:bg-gray-600'} hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-1.5 py-1 text-center dark:hover:bg-red-700 dark:focus:ring-red-900`}><FontAwesomeIcon icon={faThumbsDown}/>
                                        </button>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className={'flex justify-center'}>
                        {addAction ? <p className="mb-1 font-light text-gray-900 md:text-lg dark:text-white">{textIngredient}</p> :
                          <></>}
                    </div>
                    <hr className="mb-6 border-gray-500 md:text-lg dark:border-gray-400"/>
                    <p className="mb-1 font-light text-gray-900 md:text-lg dark:text-white">Категория: {products.product.product.category.title}</p>
                    <p className="mb-1 font-light text-gray-900 md:text-lg dark:text-white">Тип: {products.product.product.type.title}</p>
                    <p className="mb-1 font-light text-gray-900 md:text-lg dark:text-white">Вес: {products.product.product.weight}г</p>
                    <p className="mb-1 font-light text-gray-900 md:text-lg dark:text-white">Цена: {products.product.product.price}₽</p>
                    {user.isAuth ?
                      <Link
                        data-aos={"fade-right"} data-aos-duration={"1000"}
                        to={"catalog"}
                        className="inline-flex mt-5 items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                          Сделать заказ
                          <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                               xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"></path>
                          </svg>
                      </Link> :
                      <Link
                        data-aos={"fade-right"} data-aos-duration={"1000"}
                        to={tgChannel}
                        className="inline-flex mt-5 items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                          Зарегистрироваться
                          <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                               xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"></path>
                          </svg>
                      </Link>
                    }

                </div>
            </div>
        </section>
        <Footer/>
        </div>
    );
});

export default ProductItem;