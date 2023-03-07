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
import IndexRoles from "./components/Admin/CRUD/Roles/IndexRoles";
import Roles from "./components/Admin/CRUD/Roles/Roles";
import CreateRoles from "./components/Admin/CRUD/Roles/CreateRoles";
import ReviewRoles from "./components/Admin/CRUD/Roles/ReviewRoles";
import EditRoles from "./components/Admin/CRUD/Roles/EditRoles";
import IndexUsers from "./components/Admin/CRUD/Users/IndexUsers";
import Users from "./components/Admin/CRUD/Users/Users";
import CreateUsers from "./components/Admin/CRUD/Users/CreateUsers";
import ReviewUsers from "./components/Admin/CRUD/Users/ReviewUsers";
import EditUsers from "./components/Admin/CRUD/Users/EditUsers";
import IndexTariff from "./components/Admin/CRUD/Tariff/IndexTariff";
import Tariff from "./components/Admin/CRUD/Tariff/Tariff";
import CreateTariff from "./components/Admin/CRUD/Tariff/CreateTariff";
import ReviewTariff from "./components/Admin/CRUD/Tariff/ReviewTariff";
import EditTariff from "./components/Admin/CRUD/Tariff/EditTariff";
import IndexPrivileges from "./components/Admin/CRUD/Privileges/IndexPrivileges";
import CreatePrivileges from "./components/Admin/CRUD/Privileges/CreatePrivileges";
import ReviewPrivileges from "./components/Admin/CRUD/Privileges/ReviewPrivileges";
import EditPrivileges from "./components/Admin/CRUD/Privileges/EditPrivileges";
import Privileges from "./components/Admin/CRUD/Privileges/Privileges";
import IndexOrders from "./components/Admin/CRUD/Orders/IndexOrders";
import Orders from "./components/Admin/CRUD/Orders/Orders";
import ReviewOrders from "./components/Admin/CRUD/Orders/ReviewOrders";
import IndexFAQs from "./components/Admin/CRUD/FAQs/IndexFAQs";
import FAQs from "./components/Admin/CRUD/FAQs/FAQs";
import CreateFAQs from "./components/Admin/CRUD/FAQs/CreateFAQs";
import ReviewFAQs from "./components/Admin/CRUD/FAQs/ReviewFAQs";
import EditFAQs from "./components/Admin/CRUD/FAQs/EditFAQs";
import UserFAQ from "./components/UserFAQ/UserFAQ";
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
                    <Route path={'/faq_users'} element={<UserFAQ/>}/>
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
                        <Route path={'/admin/roles'} element={<IndexRoles/>}>
                            <Route path={'/admin/roles'} element={<Roles/>}/>
                            <Route path={'/admin/roles/create'} element={<CreateRoles/>}/>
                            <Route path={'/admin/roles/show/:id'} element={<ReviewRoles/>}/>
                            <Route path={'/admin/roles/edit/:id'} element={<EditRoles/>}/>
                        </Route>
                        <Route path={'/admin/users'} element={<IndexUsers/>}>
                            <Route path={'/admin/users'} element={<Users/>}/>
                            <Route path={'/admin/users/create'} element={<CreateUsers/>}/>
                            <Route path={'/admin/users/show/:id'} element={<ReviewUsers/>}/>
                            <Route path={'/admin/users/edit/:id'} element={<EditUsers/>}/>
                        </Route>
                        <Route path={'/admin/tariff'} element={<IndexTariff/>}>
                            <Route path={'/admin/tariff'} element={<Tariff/>}/>
                            <Route path={'/admin/tariff/create'} element={<CreateTariff/>}/>
                            <Route path={'/admin/tariff/show/:id'} element={<ReviewTariff/>}/>
                            <Route path={'/admin/tariff/edit/:id'} element={<EditTariff/>}/>
                        </Route>
                        <Route path={'/admin/privileges'} element={<IndexPrivileges/>}>
                            <Route path={'/admin/privileges'} element={<Privileges/>}/>
                            <Route path={'/admin/privileges/create'} element={<CreatePrivileges/>}/>
                            <Route path={'/admin/privileges/show/:id'} element={<ReviewPrivileges/>}/>
                            <Route path={'/admin/privileges/edit/:id'} element={<EditPrivileges/>}/>
                        </Route>
                        <Route path={'/admin/faqs'} element={<IndexFAQs/>}>
                            <Route path={'/admin/faqs'} element={<FAQs/>}/>
                            <Route path={'/admin/faqs/create'} element={<CreateFAQs/>}/>
                            <Route path={'/admin/faqs/show/:id'} element={<ReviewFAQs/>}/>
                            <Route path={'/admin/faqs/edit/:id'} element={<EditFAQs/>}/>
                        </Route>
                        <Route path={'/admin/orders'} element={<IndexOrders/>}>
                            <Route path={'/admin/orders'} element={<Orders/>}/>
                            <Route path={'/admin/orders/show/:id'} element={<ReviewOrders/>}/>
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