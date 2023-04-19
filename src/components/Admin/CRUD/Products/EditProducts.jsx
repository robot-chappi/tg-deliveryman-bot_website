import React, {useContext, useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {getProductWithIngredient} from '../../../../http/productAPI'
import {observer} from 'mobx-react-lite'
import {Context} from '../../../../index'
import {getCategories} from '../../../../http/categoryAPI'
import {getTypes} from '../../../../http/typeAPI'
import {getIngredients} from '../../../../http/ingredientsAPI'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircle, faClose} from '@fortawesome/free-solid-svg-icons'

const EditProducts = observer(() => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {products} = useContext(Context)
    const [ingredientItems, setIngredientItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories().then(data => products.setCategories(data))
        getTypes().then(data => products.setTypes(data))
        getIngredients().then(data => setIngredientItems(data))
        getProductWithIngredient(id).then(data => products.setProduct(data)).finally(() => setLoading(false))
    }, [])

    const [title, setTitle] = useState(products.product.title);
    const [description, setDescription] = useState(products.product.description);
    const [weight, setWeight] = useState(products.product.weight);
    const [price, setPrice] = useState(products.product.price);
    const [image, setImage] = useState();
    const [imageLink, setImageLink] = useState(products.product.image);
    const [type, setType] = useState(products.product.type);
    const [category, setCategory] = useState(products.product.category);
    const [ingredients, setIngredients] = useState(products.product.ingredients);

    const handleIngredients = (e) => {
        let options = e.target.options;
        let value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(Number(options[i].value));
            }
        }
        setIngredients(value);
    }

    const handleInputFile = (image) => {
        let photo = image.target.files[0];
        if (photo.type === 'image/jpeg' || photo.type === 'image/png') {
            return setImage(photo);
        }
        return console.log('error');
    }

    const sendProduct = () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('weight', weight);
            formData.append('price', price);
            formData.append('imageFile', imageLink);
            formData.append('image', image);
            formData.append('type', type);
            formData.append('category', category);
            formData.append('ingredients', ingredients);

            return navigate(`/admin/products/show/${products.product.id}`)
        } catch (e) {
            console.log(e);
        }
    }

    const containsObject = (obj, list) => {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i]['id'] === obj.id) {
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
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <div className="mx-auto max-w-screen-sm">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Редактирование</h2>
                        <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Здесь можно отредактировать продукт</p>
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
                                       placeholder="Напишите название продукта" required={true}/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="weight"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Вес</label>
                                <input type="number" name="weight" id="weight"
                                       onChange={event => setWeight(event.target.value)}
                                       value={weight}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder='Напишите вес продукта' required={true}/>
                            </div>
                            <div className='w-full'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                       htmlFor="image">Изображение (файл) <FontAwesomeIcon icon={faCircle} color={imageLink.includes('http') ? 'white' : 'green'}/>
                                </label>
                                <input
                                    onClick={event => handleInputFile(event)}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    aria-describedby="file_input_help" id="image" type="file"/>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                   id="file_input_help">PNG или JPG (Рекомендовано 300x240px)</p>
                                <div className={'mt-2'}>
                                    <img src={imageLink.includes('http') ? imageLink : `${process.env.REACT_APP_API_URL+'/'+imageLink}`} alt="product"/>
                                </div>
                                <div className={'w-full pt-2'}>
                                    <label htmlFor="imageLink"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Изображение (ссылка) <FontAwesomeIcon icon={faCircle} color={imageLink.includes('http') ? 'green' : 'white'}/></label>
                                    <input type="text" name="imageLink" id="imageLink"
                                           onChange={event => setImageLink(event.target.value)}
                                           value={imageLink}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                           placeholder="Ссылка продукта"/>
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="price"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Цена</label>
                                <input type="number" name="price" id="price"
                                       onChange={event => setPrice(event.target.value)}
                                       value={price}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите цену продукта" required={true}/>
                            </div>
                            <div>
                                <label htmlFor="category"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Категория продукта</label>
                                <select id="category"
                                        onChange={event => setCategory(event.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Выберете категорию</option>
                                    {products.categories.map((item) => {
                                        return <option key={item.id} selected={category?.id === item.id ? true : false} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="type"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Тип продукта</label>
                                <select id="type"
                                        onChange={event => setType(event.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Выберете тип</option>
                                    {products.types.map((item) => {
                                        return <option key={item.id} selected={type?.id === item.id ? true : false} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="ingredients"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выбери ингридиенты продукта</label>
                                <select multiple={true} id="ingredients"
                                        onChange={(event) => handleIngredients(event)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {ingredientItems.map((item) => {
                                        return <option key={item.id} selected={containsObject(item, ingredients)} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание продукта</label>
                                <textarea id="description" rows="8"
                                          onChange={event => setDescription(event.target.value)}
                                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                          placeholder="Опишите продукт">{description}</textarea>
                            </div>
                        </div>
                        <button type={"button"}
                                onClick={sendProduct}
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

export default EditProducts;