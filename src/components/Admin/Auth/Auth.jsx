import React, {useContext, useState} from 'react'
import {useNavigate} from "react-router-dom";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import {observer} from 'mobx-react-lite'
import {Context} from '../../../index'
import {getUserToken} from '../../../http/userAPI'

const Auth = observer(() => {
    const navigate = useNavigate();
    const [password, setPassword] = useState();
    const {user} = useContext(Context);

    const authToAdmin = () => {
        try {
            if (String(password) === String(process.env.REACT_APP_ADMIN_PASSWORD)) {
                getUserToken(String(process.env.REACT_APP_ADMIN_CHATID)).then(data => {
                    user.setIsAuth(true);
                    user.setIsAdmin(true)
                    user.setUser(data)
                })
                localStorage.removeItem('auth')
            }
            if (String(password) === String(process.env.REACT_APP_COPYWRITER_PASSWORD)) {
                getUserToken(String(process.env.REACT_APP_COPYWRITER_CHATID)).then(data => {
                    user.setIsAuth(true);
                    user.setIsCopywriter(true)
                    user.setUser(data)
                })
                localStorage.removeItem('auth')
            }
            if (String(password) === String(process.env.REACT_APP_ANALYST_PASSWORD)) {
                getUserToken(String(process.env.REACT_APP_ANALYST_CHATID)).then(data => {
                    user.setIsAuth(true);
                    user.setIsAnalyst(true)
                    user.setUser(data)
                })
                localStorage.removeItem('auth')
            }
            return navigate("/admin");
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Header/>
            <section className="bg-gray-50 dark:bg-gray-900 py-40">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Вход в Админ панель
                            </h1>
                            {localStorage.getItem('auth') ?
                              <form className="space-y-4 md:space-y-6" action="#">
                                  <div>
                                      <label htmlFor="password"
                                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Пароль</label>
                                      <input type="password" name="password" id="password" placeholder="••••••••"
                                             onChange={event => setPassword(event.target.value)}
                                             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                             required=""/>
                                  </div>
                                  <button type="submit" onClick={authToAdmin}
                                          className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Войти
                                  </button>
                              </form>
                              :
                              <button type="submit" onClick={() => navigate('/admin')}
                                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Войти
                              </button>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
});

export default Auth;