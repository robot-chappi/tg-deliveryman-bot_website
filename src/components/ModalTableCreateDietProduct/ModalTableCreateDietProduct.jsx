import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClose} from '@fortawesome/free-solid-svg-icons'

const ModalTableCreateDietProduct = ({open, onClose, product}) => {
  if (Object.keys(product).length === 0) {
    product = {
      id: 1,
      title: 'Продукт',
      description: 'Описание',
      image: 'https://catherineasquithgallery.com/uploads/posts/2021-02/1614263543_16-p-cherno-belie-polosi-fon-17.jpg',
      weight: 100,
      price: 1000,
      ingredients: [{id: 1, title: 'Ингредиент'}, {id: 2, title: 'Ингредиент'}],
      category: {title: 'Категория'},
      type: {title: 'Тип'}
    }
  }
  return (
    <div className={`fixed inset-0 ${open ? 'block' : 'hidden pointer-events-none'}`}>

      <div
        className={`fixed inset-0 bg-black ${open ? 'opacity-50' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />

      <div className={`fixed overflow-y-scroll bg-white shadow-lg dark:bg-gray-900 pb-6 right-0 h-full w-full max-w-screen-sm p-4 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div>
          <button type={"button"}
                  onClick={onClose}
                  className="inline-flex p-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            <FontAwesomeIcon icon={faClose}/>
          </button>
        </div>
        <div
          className="gap-8 mb-10 overflow-y-auto items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img data-aos={"fade-down"} data-aos-duration={"1000"} className="w-full dark:hidden"
               src={product.image.includes('http') ? product.image : `${process.env.REACT_APP_API_URL+'/'+product.image}`}
               alt={'dashboard'}/>
          <img data-aos={"fade-down"} data-aos-duration={"1000"} className="w-full hidden dark:block"
               src={product.image.includes('http') ? product.image : `${process.env.REACT_APP_API_URL+'/'+product.image}`}
               alt={'dashboard'}/>
          <div data-aos={"fade-up"} data-aos-duration={"1000"} className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{product.title}</h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">{product.description}</p>
            <hr className="mb-3 border-gray-500 md:text-lg dark:border-gray-400"/>
            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Ингредиенты: </h2>
              <ul className={'mb-6 block max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400'}>
                {product.ingredients.map(i => {
                  return <li key={i.id}>
                    <div className={'gap-1 flex items-center'}>
                      <p>{i.title}</p>
                    </div>
                  </li>
                })}
              </ul>
            </div>
            <hr className="mb-6 border-gray-500 md:text-lg dark:border-gray-400"/>
            <p className="mb-1 font-light text-gray-900 md:text-lg dark:text-white">Категория: {product.category.title}</p>
            <p className="mb-1 font-light text-gray-900 md:text-lg dark:text-white">Тип: {product.type.title}</p>
            <p className="mb-1 font-light text-gray-900 md:text-lg dark:text-white">Вес: {product.weight}г</p>
            <p className="mb-1 font-light text-gray-900 md:text-lg dark:text-white">Цена: {product.price}₽</p>
          </div>
        </div>

      </div>

    </div>
    )
}

export default ModalTableCreateDietProduct