import './App.css';
import 'aos/dist/aos.css';
// import {useEffect, useState} from "react";
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from "react-router-dom";
import AOS from 'aos';
import Main from "./components/Main/Main";
import Catalog from "./components/Catalog/Catalog";
import ProductItem from "./components/ProductItem/ProductItem";
import Order from "./components/Order/Order";
import Payment from "./components/Payment/Payment";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Admin/Auth/Auth";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Page404 from "./components/404/Page404";
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
                <Routes>
                    <Route index element={<Main/>}/>
                    <Route path={'/catalog'} element={<Catalog/>}/>
                    <Route path={'/order'} element={<Order/>}/>
                    <Route path={'/payment'} element={<Payment/>}/>
                    <Route path={'/admin'} element={<Admin/>}>
                        <Route path={'/admin'} element={<Dashboard/>}/>
                        <Route path={'/admin/auth'} element={<Auth/>}/>
                    </Route>
                    <Route path={'/product/:productId'} element={<ProductItem/>}/>
                    <Route path={'*'} element={<Page404/>}/>
                </Routes>
            {/*</AppContext.Provider>*/}
        </div>
    );
}

export default App;