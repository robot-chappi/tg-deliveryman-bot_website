import React, {useEffect, useState} from 'react'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {useNavigate} from "react-router-dom";
import {observer} from 'mobx-react-lite'
import {getIngredients} from '../../../../http/ingredientsAPI'
import {createProduct} from '../../../../http/productAPI'
import {getCategories} from '../../../../http/categoryAPI'
import {getTypes} from '../../../../http/typeAPI'

const CreateProducts = observer(() => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [weight, setWeight] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState();
    const [imageLink, setImageLink] = useState();
    const [type, setType] = useState();
    const [category, setCategory] = useState();
    const [ingredientItems, setIngredientItems] = useState([]);
    const [categoryItems, setCategoryItems] = useState([]);
    const [typeItems, setTypeItems] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const [isImageFile, setIsImageFile] = useState(false);
    const [isImageLink, setIsImageLink] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getIngredients().then(data => setIngredientItems(data))
        getCategories().then(data => setCategoryItems(data))
        getTypes().then(data => setTypeItems(data))
    }, [])

    const handleIngredients = (e) => {
        let options = e.target.options;
        let value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push({id: Number(options[i].value)});
            }
        }
        setIngredients(value);
    }

    const handleInputFile = (image) => {
        let photo = image.target.files[0];
        console.log(image.target.files[0])
        if (photo.type === 'image/jpeg' || photo.type === 'image/png' || photo.type === 'image/jpg') {
            return setImage(photo);
        }
        return console.log('error');
    }

    const sendProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('weight', weight);
            formData.append('price', price);
            formData.append('imageFile', image);
            formData.append('image', imageLink);
            formData.append('typeId', type);
            formData.append('categoryId', category);
            formData.append('ingredients', JSON.stringify(ingredients));

            await createProduct(formData)
            // return console.log({
            //     'title': title,
            //     'description': description,
            //     'weight': weight,
            //     'price': price,
            //     'image': image,
            //     'type': type,
            //     'category': category,
            //     'ingredients': ingredients,
            // });

            return navigate('/admin/products')
        } catch (e) {
            console.log(e);
        }
    }

    const changeTypesImage = (type) => {
        if (type === 'file') {
            setIsImageLink(false)
            setIsImageFile(true)
        }
        if (type === 'link') {
            setIsImageFile(false)
            setIsImageLink(true)
        }
        if (type === 'reset') {
            setIsImageLink(false)
            setIsImageFile(false)
        }
    }

    return (
        <div>
            <Header/>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <div className="mx-auto max-w-screen-sm">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Создание продукта</h2>
                        <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Здесь можно создать новый продукт</p>
                    </div>
                    <form action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="title"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название
                                </label>
                                <input type="text" name="title" id="title"
                                       onChange={event => setTitle(event.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите название продукта" required={true}/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="weight"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Вес</label>
                                <input type="number" name="weight" id="weight"
                                       onChange={event => setWeight(event.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder='Напишите вес продукта' required={true}/>
                            </div>
                            <div>
                                <label htmlFor="selectTypesImage"
                                       className="block text-sm font-medium text-gray-900 dark:text-white">Выбери тип изображения</label>
                                <div id='selectTypesImage' className={'flex items-center gap-2 pb-2'}>
                                    <button type={"button"}
                                            onClick={() => changeTypesImage('file')}
                                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                        Файл
                                    </button>
                                    <button type={"button"}
                                            onClick={() => changeTypesImage('link')}
                                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                        Ссылка
                                    </button>
                                    <button type={"button"}
                                            onClick={() => changeTypesImage('reset')}
                                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                        Сбросить
                                    </button>
                                </div>
                                <div className={`${isImageFile ? 'block' : 'hidden'} w-full`}>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                           htmlFor="imageFile">Изображение (файл)</label>
                                    {/*onClick*/}
                                    <input
                                      onChange={event => handleInputFile(event)}
                                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                      aria-describedby="file_input_help" id="imageFile" type="file"/>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                       id="file_input_help">PNG или JPG (Рекомендовано 300x240px)</p>
                                </div>
                                <div className={`${isImageLink ? 'block' : 'hidden'} w-full`}>
                                    <label htmlFor="imageLink"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Изображение (ссылка)</label>
                                    <input type="text" name="imageLink" id="imageLink"
                                           onChange={event => setImageLink(event.target.value)}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                           placeholder="Ссылка продукта"/>
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="price"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Цена</label>
                                <input type="number" name="price" id="price"
                                       onChange={event => setPrice(event.target.value)}
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
                                    {categoryItems.map((item) => {
                                        return <option key={item.id} value={item.id}>{item.title}</option>
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
                                    {typeItems.map((item) => {
                                        return <option key={item.id} value={item.id}>{item.title}</option>
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
                                        return <option key={item.id} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Описание продукта</label>
                                <textarea id="description" rows="8"
                                          onChange={event => setDescription(event.target.value)}
                                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                          placeholder="Опишите продукт"></textarea>
                            </div>
                        </div>
                        <button type={"button"}
                                onClick={sendProduct}
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Создать
                        </button>
                    </form>
                </div>
            </section>
            <Footer/>
        </div>
    );
});

export default CreateProducts;