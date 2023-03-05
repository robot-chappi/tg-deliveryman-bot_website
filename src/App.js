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
import Products from "./components/Admin/CRUD/Products/Products";
import EditProducts from "./components/Admin/CRUD/Products/EditProducts";
import CreateProducts from "./components/Admin/CRUD/Products/CreateProducts";
import IndexProducts from "./components/Admin/CRUD/Products/IndexProducts";
import ReviewProduct from "./components/Admin/CRUD/Products/ReviewProduct";
import IndexCategories from "./components/Admin/CRUD/Categories/IndexCategories";
import Categories from "./components/Admin/CRUD/Categories/Categories";
import CreateCategories from "./components/Admin/CRUD/Categories/CreateCategories";
import EditCategories from "./components/Admin/CRUD/Categories/EditCategories";
import ReviewCategories from "./components/Admin/CRUD/Categories/ReviewCategories";
import IndexTypes from "./components/Admin/CRUD/Types/IndexTypes";
import Types from "./components/Admin/CRUD/Types/Types";
import CreateTypes from "./components/Admin/CRUD/Types/CreateTypes";
import ReviewTypes from "./components/Admin/CRUD/Types/ReviewTypes";
import EditTypes from "./components/Admin/CRUD/Types/EditTypes";
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
                        <Route path={'/admin/products'} element={<IndexProducts/>}>
                            <Route path={'/admin/products'} element={<Products/>}/>
                            <Route path={'/admin/products/create'} element={<CreateProducts/>}/>
                            <Route path={'/admin/products/show/:id'} element={<ReviewProduct/>}/>
                            <Route path={'/admin/products/edit/:id'} element={<EditProducts/>}/>
                        </Route>
                        <Route path={'/admin/categories'} element={<IndexCategories/>}>
                            <Route path={'/admin/categories'} element={<Categories/>}/>
                            <Route path={'/admin/categories/create'} element={<CreateCategories/>}/>
                            <Route path={'/admin/categories/show/:id'} element={<ReviewCategories/>}/>
                            <Route path={'/admin/categories/edit/:id'} element={<EditCategories/>}/>
                        </Route>
                        <Route path={'/admin/types'} element={<IndexTypes/>}>
                            <Route path={'/admin/types'} element={<Types/>}/>
                            <Route path={'/admin/types/create'} element={<CreateTypes/>}/>
                            <Route path={'/admin/types/show/:id'} element={<ReviewTypes/>}/>
                            <Route path={'/admin/types/edit/:id'} element={<EditTypes/>}/>
                        </Route>
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