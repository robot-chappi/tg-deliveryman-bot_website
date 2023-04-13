import React from 'react'

const ModalTableCreateDietProduct = ({open, onClose, product, children}) => {
  return (
    <div className={`fixed inset-0 ${open ? '' : 'pointer-events-none'}`}>
      <section className="bg-white shadow-lg dark:bg-gray-900 pb-6">
      <div
        className={`fixed inset-0 bg-black ${open ? 'opacity-50' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />

      {/* opacity добавь */}
      <div className={`fixed right-0 h-full w-full max-w-screen-sm p-4 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div>
          <button onClick={onClose}>Click to close modal</button>
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

        { children }
      </div>
      </section>
    </div>
    )
}

export default ModalTableCreateDietProduct