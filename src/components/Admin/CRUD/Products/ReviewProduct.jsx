import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {getProductWithIngredient} from '../../../../http/productAPI'
import {observer} from 'mobx-react-lite'

const ReviewProduct = observer(() => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({})

    useEffect(() => {
        getProductWithIngredient(id).then(data => setProduct(data)).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className={'text-gray-500 sm:text-xl dark:text-gray-400'}>Идет загрузка...</p>
        </div>
    }

    return (
        <div className={'bg-gray-50 dark:bg-gray-900'}>
            <Header/>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead>
                    <tr className='border-2 border-gray-800 dark:border-white'>
                        <th scope="col" className="px-4 py-3 border-r-2">Пункты</th>
                        <th scope="col" className="px-4 py-3 border-r-2">Информация</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>ID</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{product.id}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Изображение</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'><img src={product.image.includes('http') ? product.image : `${process.env.REACT_APP_API_URL+'/'+product.image}`} alt="Product"/></td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Название</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{product.title}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Описание</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{product.description}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Вес</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{product.weight}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Цена</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{product.price}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Тип</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{product.type.title}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Категория</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>{product.category.title}</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                        <th className='px-4 py-3'>Ингридиенты</th>
                        <td className='px-4 py-3 text-gray-800 dark:text-white'>
                            <div>
                                {product.ingredients.map((i) => {
                                    return <p key={i.id}>{i.title}</p>
                                })}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={'flex justify-center pb-5'}>
                <button type={"button"}
                        onClick={() => navigate('/admin/products')}
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                    Назад
                </button>
            </div>
            <Footer/>
        </div>
    );
});

export default ReviewProduct;