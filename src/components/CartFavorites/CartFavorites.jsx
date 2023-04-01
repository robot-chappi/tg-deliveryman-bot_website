import React, {useContext, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Context} from '../../index'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {deleteUserFavoriteProduct, getUserChatFavoriteProducts} from '../../http/favoriteProductAPI'
import {Link} from 'react-router-dom'

const CartFavorites = observer(() => {
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const {user, products} = useContext(Context);

  useEffect(() => {
    getUserChatFavoriteProducts(user.user.chatId).then(data => products.setFavoriteProducts(data)).finally(() => setLoading(false))
  }, [reload])

  const removeFavoriteProduct = async (favoriteProduct, id) => {
    await deleteUserFavoriteProduct(Number(favoriteProduct), Number(id));
    setReload(true);
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
        <h1 className="py-7 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Любимое</h1>
        <div>
            <h2
              className="mb-4 pl-3 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
              Любимые продукты</h2>
            {products.favoriteproducts.map((i) => {
              return <div key={i.id}
                className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <img className="w-full dark:hidden"
                     src={i.product.image.includes('http') ? i.product.image : `${process.env.REACT_APP_API_URL+'/'+i.product.image}`}
                     alt="dashboard"/>
                <img className="w-full hidden dark:block"
                     src={i.product.image.includes('http') ? i.product.image : `${process.env.REACT_APP_API_URL+'/'+i.product.image}`}
                     alt="dashboard"/>
                <div className="mt-4 md:mt-0">
                  <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{i.product.title}</h2>
                  <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">{i.product.description}</p>
                  <div className={'flex justify-center gap-2'}>
                    <Link to={`/product/${i.product.id}`} className="inline-flex items-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-green-900">
                      Посмотреть
                      <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"></path>
                      </svg>
                    </Link>
                    <button type={'submit'} onClick={() => removeFavoriteProduct(i.favorite_product.id, i.id)}
                            className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            })}
            </div>
        </section>
      <Footer/>
    </div>
  )
});

export default CartFavorites