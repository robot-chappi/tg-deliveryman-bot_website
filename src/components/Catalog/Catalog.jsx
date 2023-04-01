import React, {useContext, useEffect, useState} from 'react'
import CatalogItem from "../CatalogItem/CatalogItem";
import filterItemCategory from "../Filter/filter";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {observer} from 'mobx-react-lite'
import {Context} from '../../index'
import {getCategories} from '../../http/categoryAPI'
import {getTypes} from '../../http/typeAPI'
import {getPaginationProducts} from '../../http/productAPI'

const Catalog = observer(() => {
    const {products} = useContext(Context);

    useEffect(() => {
        getCategories().then(data => products.setCategories(data))
        getTypes().then(data => products.setTypes(data))
        getPaginationProducts(null, null, 3,1).then(data => {
            products.setProducts(data.rows)
            products.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        getPaginationProducts(products.selectedCategory.id, products.selectedType.id, 2, products.page).then(data => {
            products.setProducts(data.rows)
            products.setTotalCount(data.count)
        })
    }, [products.page, products.selectedType, products.selectedCategory])


    return (
        <div>
            <Header/>
        <div className="bg-white dark:bg-gray-900">
            <div className="pt-20">
                <h1 className="text-center text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Каталог</h1>
            </div>

            <div className={'text-center mt-4 mb-10'}>
                <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Наши категории</h2>
                <ul className="text-gray-500 flex flex-wrap gap-2 px-4 list-none dark:text-gray-400">
                    <li>
                        <button type={'submit'} onClick={() => products.setSelectedCategory({id: null})} rel="noopener noreferrer"
                                className={`text-white ${products.selectedCategory.id === null ? 'bg-gray-600' : 'bg-gray-800 dark:bg-gray-800'} hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}>
                            <span>Все продукты</span>
                        </button>
                    </li>
                    {products.categories.map((item) => {
                        return <li key={item.id}>
                            <button type={'submit'} onClick={() => products.setSelectedCategory(item)} rel="noopener noreferrer"
                                       className={`text-white ${products.selectedCategory.id === item.id ? 'bg-gray-600' : 'bg-gray-800 dark:bg-gray-800'} hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}>
                            <span>{item.title}</span>
                        </button>
                        </li>
                    })}
                </ul>

            </div>

            <div className={'text-center mt-4 mb-10'}>
                <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Наши типы</h2>
                <ul className="text-gray-500 flex flex-wrap gap-2 px-4 list-none dark:text-gray-400">
                    <li>
                        <button type={'submit'} onClick={() => products.setSelectedType({id: null})} rel="noopener noreferrer"
                                className={`text-white ${products.selectedType.id === null ? 'bg-gray-600' : 'bg-gray-800 dark:bg-gray-800'} hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}>
                            <span>Все типы</span>
                        </button>
                    </li>
                    {products.types.map((item) => {
                        return <li key={item.id}>
                            <button type={'submit'} onClick={() => products.setSelectedType(item)} rel="noopener noreferrer"
                                    className={`text-white ${products.selectedType.id === item.id ? 'bg-gray-600' : 'bg-gray-800 dark:bg-gray-800'} hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}>
                                <span>{item.title}</span>
                            </button>
                        </li>
                    })}
                </ul>

            </div>

            <section className="py-10 bg-white dark:bg-gray-800">
                <div
                    className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.products.map((item) => {
                        return <CatalogItem key={item.id} item={item}/>
                    })}

                    {products.products.length < 2 ? <p className={'text-center text-gray-900 dark:text-white'}>Товаров больше нету</p> : null}
                </div>
                <div className={'flex items-center justify-center mt-4'}>
                    <button disabled={products.page !== 1 ? false : true} type={'button'} onClick={() => {
                        products.setPage(products.page - 1)
                    }}
                       className={`${products.page !== 1 ? 'block' : 'hidden'} inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                        Предыдущий
                    </button>
                    <button type={'button'} onClick={() => {
                        products.setPage(products.page + 1)
                    }}
                            disabled={products.products.length < 2 ? true : false}
                       className={`${products.products.length < 2 ? 'hidden' : 'block'} inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                        Следующий
                        <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div className={'pt-5'}>
                    <div className={'flex justify-center mt-2'}>
                        <p className={'text-sm font-medium text-gray-800 dark:text-white'}>{'Колличество: ' + products.totalCount}</p>
                    </div>
                    <div className={'flex justify-center mt-2'}>
                        <p className={'text-sm font-medium text-gray-800 dark:text-white'}>{'Страница: ' + products.page}</p>
                    </div>
                </div>
            </section>
        </div>
            <Footer/>
        </div>

    );
});

export default Catalog;