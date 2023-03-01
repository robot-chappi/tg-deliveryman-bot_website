import './App.css';
import 'aos/dist/aos.css';
// import {useEffect, useState} from "react";
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from "react-router-dom";
import AOS from 'aos';
import Main from "./components/Main/Main";
import Catalog from "./components/Catalog/Catalog";
import Header from "./components/Header/Header";
import ProductItem from "./components/ProductItem/ProductItem";
import Footer from "./components/Footer/Footer";
import Order from "./components/Order/Order";
import Payment from "./components/Payment/Payment";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Admin/Auth/Auth";
// import AppContext from "./context";
// import axios from "axios";

function App() {
    const {tg} = useTelegram();
    // const [items, setItems] = useState([]);
    // const [cartItems, setCartItems] = useState([]);
    // const [favorites, setFavorites] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        tg.ready();
        // async function fetchData() {
        //     try {
        //         const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
        //             axios.get('https://60d62397943aa60017768e77.mockapi.io/cart'),
        //             axios.get('https://60d62397943aa60017768e77.mockapi.io/favorites'),
        //             axios.get('https://60d62397943aa60017768e77.mockapi.io/items'),
        //         ]);
        //
        //         setIsLoading(false);
        //         setCartItems(cartResponse.data);
        //         setFavorites(favoritesResponse.data);
        //         setItems(itemsResponse.data);
        //
        //         console.log(items)
        //     } catch (error) {
        //         alert('Ошибка при запросе данных ;(');
        //         console.error(error);
        //     }
        // }
        AOS.init({
            once: true
        });
        // fetchData();
    }, [tg])

    return (
        <div className="App">
            {/*<AppContext.Provider value={{items}}>*/}
                <Header/>
                <Routes>
                    <Route index element={<Main/>}/>
                    <Route path={'/catalog'} element={<Catalog/>}/>
                    <Route path={'/order'} element={<Order/>}/>
                    <Route path={'/payment'} element={<Payment/>}/>
                    <Route path={'/admin/auth'} element={<Auth/>}/>
                    <Route path={'/admin'} element={<Admin/>}/>
                    <Route path={'/product/:productId'} element={<ProductItem/>}/>
                </Routes>
                <Footer/>
            {/*</AppContext.Provider>*/}
        </div>
    );
}

export default App;