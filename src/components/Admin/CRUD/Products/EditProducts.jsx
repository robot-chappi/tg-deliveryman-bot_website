import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {categories, favoriteIngredients, types} from "../../../GenerationWeeklyMealPlan/mockdata";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const EditProducts = () => {
    const product = {
        id: 1,
        title: "Плов",
        weight: 450,
        type: {
            id: 2,
            title: "Обед"
        },
        category: {
            id: 1,
            title: "Обычная еда"
        },

        image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
        description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
        ingredients: [
            {id: 6, title: 'Маслины'},
            {id: 7, title: 'Зелень'},
            {id: 8, title: 'Чеснок'},
            {id: 9, title: 'Картофель'},
            {id: 10, title: 'Белый лук'}
        ],
        price: 300
    }
    // eslint-disable-next-line no-unused-vars
    const {id} = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState(product.description);
    const [weight, setWeight] = useState(product.weight);
    const [price, setPrice] = useState(product.price);
    const [image, setImage] = useState(product.image);
    const [type, setType] = useState(product.type);
    const [category, setCategory] = useState(product.category);
    const [ingredients, setIngredients] = useState(product.ingredients);


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
            formData.append('image', image);
            formData.append('type', type);
            formData.append('category', category);
            formData.append('ingredients', ingredients);

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

            return navigate(`/admin/products/show/${product.id}`)
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
                                       htmlFor="image">Изображение</label>
                                <input
                                    onClick={event => handleInputFile(event)}
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    aria-describedby="file_input_help" id="image" type="file"/>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                   id="file_input_help">PNG или JPG (Рекомендовано 300x240px)</p>
                                <div className={'mt-2'}>
                                    <img src={image} alt="product"/>
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
                                    {categories.map((item) => {
                                        return <option key={item.id} selected={category.id === item.id ? true : false} value={item.id}>{item.title}</option>
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
                                    {types.map((item) => {
                                        return <option key={item.id} selected={type.id === item.id ? true : false} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="ingredients"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Выбери ингридиенты продукта</label>
                                <select multiple={true} id="ingredients"
                                        onChange={(event) => handleIngredients(event)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    {favoriteIngredients.map((item) => {
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
};

export default EditProducts;