import React, {useContext, useEffect, useState} from 'react'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {faqs} from "../GenerationWeeklyMealPlan/mockdata";
import {getCategories} from '../../http/categoryAPI'
import {getTypes} from '../../http/typeAPI'
import {getPaginationProducts} from '../../http/productAPI'
import {observer} from 'mobx-react-lite'
import {Context} from '../../index'
import {getPaginationFaqs} from '../../http/faqAPI'

const UserFAQ = observer(() => {
  const {main} = useContext(Context);

  useEffect(() => {
    getPaginationFaqs(3,1).then(data => {
      main.setFaqs(data.rows)
      main.setTotalCountFaqs(data.count)
    })
  }, [])

  useEffect(() => {
    getPaginationFaqs(3, main.pageFaqs).then(data => {
      main.setFaqs(data.rows)
      main.setTotalCountFaqs(data.count)
    })
  }, [main.pageFaqs])


    return (
        <div>
            <Header/>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Часто задаваемые вопросы</h2>
                    <div
                        className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
                        <div>
                            {main.faqs.map((i) => {
                                return <div key={i.id} className="mb-10">
                                    <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                  clip-rule="evenodd"></path>
                                        </svg>
                                        {i.title}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">{i.description}</p>
                                </div>
                            })}
                          {main.faqs.length < 3 ? <p className={'text-center text-gray-900 dark:text-white'}>Вопросов больше нету</p> : null}
                            <div className={'flex items-center justify-center mt-4'}>
                              <button disabled={main.pageFaqs !== 1 ? false : true} type={'button'} onClick={() => {
                                main.setPageFaqs(main.pageFaqs - 1)
                              }}
                                      className={`${main.pageFaqs !== 1 ? 'block' : 'hidden'} inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                                <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd"
                                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                        clipRule="evenodd"></path>
                                </svg>
                                Предыдущий
                              </button>
                              <button type={'button'} onClick={() => {
                                main.setPageFaqs(main.pageFaqs + 1)
                              }}
                                      disabled={main.faqs.length < 3 ? true : false}
                                      className={`${main.faqs.length < 3 ? 'hidden' : 'block'} inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
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
                                <p className={'text-sm font-medium text-gray-800 dark:text-white'}>{'Колличество: ' + main.totalCountFaqs}</p>
                              </div>
                              <div className={'flex justify-center mt-2'}>
                                <p className={'text-sm font-medium text-gray-800 dark:text-white'}>{'Страница: ' + main.pageFaqs}</p>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
});

export default UserFAQ;