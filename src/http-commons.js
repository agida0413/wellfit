import axios from "axios";
// get, post , put , delete : rest => 다른 프로그램과 연동 
/*
    JSP = Server
    React = Server
    Ajax = Server
    Vue = Server 
    => RestFul 
    get / post / put / delete => CRUD
    @PutMapping 
    @DeleteMapping  
    ---------- Web 에서는 주로 사용 
    => Front
       javascript / typescript 
        = .js          .ts
    ---------------------------- 
    React = Redux = React-Query 
    Vue = Vue3 = Vuex
    ---------------------------- next.js 

*/
// => 공통 모듈 
export default axios.create({
    baseURL:"http://localhost",
    headers:{
        "Content-Type":"application/json"
    }
})