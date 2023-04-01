import React, {useContext, useState} from 'react'
import {Link} from "react-router-dom";
import {Context} from '../../index'
import {tgChannel} from '../../variables/charts'
import {createFavoriteProduct} from '../../http/favoriteProductAPI'
import {getMyFavoriteProductItem} from '../../http/userAPI'
import {observer} from 'mobx-react-lite'

const CatalogItem = observer((props) => {
    const {user} = useContext(Context);
    const product = props.item
    const [addAction, setAddAction] = useState(false)

    const addToFavoriteCart = async (id) => {
      const favoriteProductItem = await getMyFavoriteProductItem(user.user.chatId);
      await createFavoriteProduct({favorite_product_id: favoriteProductItem.id, product_id: id})
      setAddAction(true)
      setTimeout(() => {
        setAddAction(false)
      }, 3000)
    }

    return (
            <article
                className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                    <div className="relative flex items-end overflow-hidden rounded-xl">
                        <img
                            src={product.image.includes('http') ? product.image : `${process.env.REACT_APP_API_URL+'/'+product.image}`}
                            alt={product.title}/>
                        <div
                            className="flex items-center space-x-1.5 rounded-lg bg-primary-700 hover:bg-primary-800 px-4 py-1.5 text-white duration-100">
                            {user.isAuth ? <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                                </svg>
                                <button type={'button'} className="text-sm" onClick={() => addToFavoriteCart(product.id)}>Добавить в Любимое</button>
                            </> : <Link to={tgChannel} className="block text-gray-700 lg:hover:text-primary-700 dark:text-white lg:dark:hover:text-white dark:hover:text-white">Зарегистрироваться!</Link>}
                        </div>
                    </div>

                    <div className="mt-1 p-2">
                        <Link to={`/product/${product.id}`}>
                        <h2 className="text-gray-900 dark:text-white">{product.title}</h2>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white">{product.type.title + ' - ' + product.weight}г</p>
                        </Link>
                        <div className="mt-3 flex items-end justify-between">
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{product.price}₽</p>

                            <div
                                className="flex items-center space-x-1.5 rounded-lg bg-primary-700 hover:bg-primary-800 px-4 py-1.5 text-white duration-100">
                                {user.isAuth ? <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                                    </svg>
                                    <button type={'button'} className="text-sm" onClick={() => addToFavoriteCart(product.id)}>Добавить в Любимое</button>
                                </> : <Link to={tgChannel} className="block text-gray-700 lg:hover:text-primary-700 dark:text-white lg:dark:hover:text-white dark:hover:text-white">Зарегистрироваться!</Link>}
                            </div>
                        </div>
                        {addAction ? <div className={'flex justify-center mt-5'}><p className={'text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'}>Добавлено</p></div> : <></>}
                    </div>
            </article>
    );
});

export default CatalogItem;