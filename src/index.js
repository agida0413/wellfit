import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from "./components/main/Header";
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Footer from "./components/main/Footer";
import Home from "./components/main/Home";
import BoardList from "./components/board/BoardList";
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardDelete from "./components/board/BoardDelete";
import BoardUpdate from "./components/board/BoardUpdate";
import ClothList from "./components/cloth/ClothList";
import ClothDetail from "./components/cloth/ClothDetail";
import BrandList from "./components/Brand/BrandList";
import BrandDetail from "./components/Brand/BrandDetail";
import OtherShopping from "./components/Other/OtherShopping";
import {QueryClientProvider,QueryClient} from "react-query";
const queryClient=new QueryClient({
    defaultOptions:{
        queries:{
            refetchOnWindowFocus:false,
            staleTime:5*30*600,
            retry:0
        }
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
<Router>

        <Header/>


    <div className={"container"}>
        <Routes>
    <Route exact path={"/"} element={<Home/>}/>
            <Route path={"/board/list"} element={<BoardList/>}/>
            <Route path={"/board/insert"} element={<BoardInsert/>}/>
            <Route path={"/board/detail/:no"} element={<BoardDetail/>}/>
            <Route path={"/board/update/:no"} element={<BoardUpdate/>}/>
            <Route path={"/board/delete/:no"} element={<BoardDelete/>}/>
            <Route path={"/cloth/list"} element={<ClothList/>}/>
            <Route path={"/cloth/detail/:pno"} element={<ClothDetail/>}/>
            <Route path={"/brand/list"} element={<BrandList/>}/>
            <Route path={"/brand/detail/:bno"} element={<BrandDetail/>}/>
            <Route path={"/other/shopping"} element={<OtherShopping/>}/>

        </Routes>
    </div>
    <Footer/>


</Router>
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
