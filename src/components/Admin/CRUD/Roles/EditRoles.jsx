import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const EditRoles = () => {
    const role = {
            id: 2,
            name: 'Копирайтер',
            slug: 'copywriter'
        }

    // eslint-disable-next-line no-unused-vars
    const {id} = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState(role.name);
    const [slug, setSlug] = useState(role.slug);


    const sendRole = () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('slug', slug);

            // return console.log({
            //     'title': title,
            // });

            return navigate(`/admin/roles/show/${role.id}`)
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div>
            <Header/>
            <section className="bg-white h-screen pt-10 dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <div className="mx-auto max-w-screen-sm">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Редактирование</h2>
                        <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Здесь можно отредактировать роль</p>
                    </div>
                    <form action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название
                                </label>
                                <input type="text" name="name" id="name"
                                       onChange={event => setName(event.target.value)}
                                       value={name}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите название роли" required={true}/>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="slug"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Опознование
                                </label>
                                <input type="text" name="slug" id="slug"
                                       onChange={event => setSlug(event.target.value)}
                                       value={slug}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите опознование роли" required={true}/>
                            </div>
                        </div>
                        <button type={"button"}
                                onClick={sendRole}
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

export default EditRoles;