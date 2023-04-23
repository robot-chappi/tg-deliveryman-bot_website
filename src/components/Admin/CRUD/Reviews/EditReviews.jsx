import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import {getReview, patchReview} from '../../../../http/reviewAPI'
import {observer} from 'mobx-react-lite'

const EditReviews = observer(() => {
    // eslint-disable-next-line no-unused-vars
    const {id} = useParams();
    const navigate = useNavigate();

    const [text, setText] = useState('');
    const [mark, setMark] = useState();
    const [chatId, setChatId] = useState('');
    const [isChecked, setIsChecked] = useState();

    const [loading, setLoading] = useState(true);

    let marks = [{mark: 1}, {mark: 2}, {mark: 3}, {mark: 4}, {mark: 5}, {mark: 6}, {mark: 7}, {mark: 8}, {mark: 9}, {mark: 10}]

    useEffect(() => {
        getReview(id).then(data => {
            setText(data.text)
            setMark(data.mark)
            setChatId(data.chatId)
            setIsChecked(data.isChecked)
        }).finally(() => setLoading(false))
    }, [])

    const sendReview = async () => {
        try {
            await patchReview(id, {text: text, mark: mark, chatId: chatId, isChecked: isChecked})

            return navigate(`/admin/reviews/show/${id}`)
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
            <section className="bg-white h-screen pt-10 dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <div className="mx-auto max-w-screen-sm">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Редактирование</h2>
                        <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Здесь можно отредактировать категорию</p>
                    </div>
                    <form action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="text"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Название
                                </label>
                                <textarea name="text" id="text"
                                       onChange={event => setText(event.target.value)}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                          placeholder="Напишите комментарий" required={true}>{text}</textarea>
                            </div>
                            <div>
                                <label htmlFor="mark"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Категория продукта</label>
                                <select id="mark"
                                        onChange={event => setMark(event.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Выберете оценку</option>
                                    {marks.map((item) => {
                                        return <option key={item.mark} selected={mark === item.mark ? true : false} value={item.mark}>{item.mark}</option>
                                    })}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="isChecked"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Категория продукта</label>
                                <select id="isChecked"
                                        onChange={event => setIsChecked(event.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Выберете проверку</option>
                                    <option selected={isChecked === true ? true : false} value={true}>Проверено</option>
                                    <option selected={isChecked === false ? true : false} value={false}>Непроверено</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="chatId"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ChatId
                                </label>
                                <input type="text" name="chatId" id="chatId"
                                       onChange={event => setChatId(event.target.value)}
                                       value={chatId}
                                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                       placeholder="Напишите chatId пользователя" required={true}/>
                            </div>
                        </div>
                        <button type={"button"}
                                onClick={sendReview}
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

export default EditReviews;