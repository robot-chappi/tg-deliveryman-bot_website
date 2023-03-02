import React, {useState} from 'react';
import CatalogItem from "../CatalogItem/CatalogItem";
import filterItemCategory from "../Filter/filter";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Catalog = () => {
    const catalogData = [{
        id: 1,
        title: "Суп с креветками на гриле",
        type: "Обычная еда",
        weight: 350,
        category: {
            id: 1,
            title: "Обычная еда"
        },
        image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
        description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
        price: 500
    }, {
        id: 2,
        title: "Суп с креветками на гриле",
        type: "Обычная еда",
        weight: 350,
        category: {
            id: 1,
            title: "Обычная еда"
        },
        image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
        description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
        price: 500
    },
        {
            id: 3,
            title: "Суп с креветками на гриле",
            type: "Фастфуд",
            weight: 350,
            category: {
                id: 3,
                title: "Фастфуд"
            },
            image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
            description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
            price: 500
        },
        {
            id: 4,
            title: "Суп с креветками на гриле",
            type: "Фастфуд",
            weight: 350,
            category: {
                id: 3,
                title: "Фастфуд"
            },
            image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
            description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
            price: 500
        },
        {
            id: 5,
            title: "Суп с креветками на гриле",
            type: "Правильное питание",
            weight: 350,
            category: {
                id: 2,
                title: "Правильное питание"
            },
            image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
            description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
            price: 500
        },
        {
            id: 6,
            title: "Суп с креветками на гриле",
            type: "Правильное питание",
            weight: 350,
            category: {
                id: 2,
                title: "Правильное питание"
            },
            image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
            description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
            price: 500
        },
        {
            id: 7,
            title: "Суп с креветками на гриле",
            type: "Еда для диабетиков",
            weight: 350,
            category: {
                id: 4,
                title: "Еда для диабетиков"
            },
            image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
            description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
            price: 500
        },
        {
            id: 8,
            title: "Суп с креветками на гриле",
            type: "Еда для диабетиков",
            weight: 350,
            category: {
                id: 4,
                title: "Еда для диабетиков"
            },
            image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
            description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
            price: 500
        },
        {
            id: 9,
            title: "Суп с креветками на гриле",
            type: "Еда для диабетиков",
            weight: 350,
            category: {
                id: 4,
                title: "Еда для диабетиков"
            },
            image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
            description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
            price: 500
        },
        {
            id: 10,
            title: "Суп с креветками на гриле",
            type: "Еда для диабетиков",
            weight: 350,
            category: {
                id: 4,
                title: "Еда для диабетиков"
            },
            image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
            description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
            price: 500
        },
        {
            id: 11,
            title: "Суп с креветками на гриле",
            type: "Еда для диабетиков",
            weight: 350,
            category: {
                id: 4,
                title: "Еда для диабетиков"
            },
            image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
            description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
            price: 500
        },
        {
            id: 12,
            title: "Суп с креветками на гриле",
            type: "Еда для диабетиков",
            weight: 350,
            category: {
                id: 4,
                title: "Еда для диабетиков"
            },
            image: "https://eda.yandex.ru/images/1370147/d2f69ce626823d7b46a9805c92470e46-1100x825.jpg",
            description: "Суп – это один из лучших путей к благосостоянию и удовольствию. Это своего рода лакомство, которое может поднять дух даже в трудные минуты. Суп – это гармоничное произведение искусства составления меню, в котором сочетаются ароматы и освежающие сочетания.",
            price: 500
        },
    ]

    const categories = [{
        id: 1,
        title: "Обычная еда"
    },
        {
            id: 2,
            title: "Правильное питание"
        },
        {
            id: 3,
            title: "Фастфуд"
        },
        {
            id: 4,
            title: "Еда для диабетиков"
        },
    ]

    const [catalogDataItems, setCatalogDataItems] = useState(catalogData);
    const [paginateBack, setPaginateBack] = useState(0);
    const [paginateForward, setPaginateForward] = useState(5);

    const changeCategory = (name) => {
        const items = filterItemCategory(catalogData, name);
        return setCatalogDataItems(items);
    }

    return (
        <div>
            <Header/>
        <div className="bg-white dark:bg-gray-900">
            <div className="pt-20">
                <h1 className="text-center text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Каталог</h1>
            </div>

            <div className={'text-center mt-4 mb-10'}>
                <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Наши категории</h2>
                <ul className="text-gray-500 list-none dark:text-gray-400">
                    <li>
                        <button type={'submit'} onClick={() => setCatalogDataItems(catalogData)} rel="noopener noreferrer"
                                className="font-normal text-gray-900 dark:text-white">
                            <span>Все продукты</span>
                        </button>
                    </li>
                    {categories.map((item) => {
                        return <li key={item.id}>
                            <button type={'submit'} onClick={() => changeCategory(item.title)} rel="noopener noreferrer"
                                       className="font-normal text-gray-500 dark:text-gray-300">
                            <span>{item.title}</span>
                        </button>
                        </li>
                    })}
                </ul>

            </div>

            <section className="py-10 bg-white dark:bg-gray-800">
                <div
                    className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {catalogDataItems.slice(paginateBack, paginateForward).map((item) => {
                        return <CatalogItem key={item.id} item={item}/>
                    })}

                    {catalogDataItems.slice(paginateBack, paginateForward).length < 5 ? <p className={'text-center text-gray-900 dark:text-white'}>Товаров больше нету</p> : null}
                </div>
                <div className={'flex items-center justify-center mt-4'}>
                    <button disabled={paginateBack === 0 && paginateForward === 5 ? true : false} type={'button'} onClick={() => {
                        setPaginateBack(paginateBack - 5)
                        setPaginateForward(paginateForward - 5)
                    }}
                       className={`${paginateBack === 0 && paginateForward === 5 ? 'hidden' : 'block'} inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                        Previous
                    </button>
                    <button type={'button'} onClick={() => {
                        setPaginateBack(paginateBack + 5)
                        setPaginateForward(paginateForward + 5)
                    }}
                            disabled={catalogDataItems.slice(paginateBack, paginateForward).length < 5 ? true : false}
                       className={`${catalogDataItems.slice(paginateBack, paginateForward).length < 5 ? 'hidden' : 'block'} inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                        Next
                        <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div className={'flex justify-center mt-2'}>
                    <p className={'text-sm font-medium text-gray-800 dark:text-white'}>{paginateBack + ' - ' + paginateForward}</p>
                </div>
            </section>
        </div>
            <Footer/>
        </div>

    );
};

export default Catalog;