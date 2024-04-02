import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../common/Pagination";
import Pagination1 from "react-js-pagination"
import {AllGetData} from "../actions/AllGetData";
<<<<<<< HEAD
import { useQuery } from "react-query";
import apiClient from '../../http-commons'
=======

>>>>>>> 2f28e7f26f9ecf74d895bd1034a6f34b04b1064d



function BrandDetail(){

    const {bno}=useParams()
    const [curpage, setCurpage] = useState(1);


<<<<<<< HEAD
    const  {isLoading,isError,error,data,refetch}=useQuery(['brand-detail',curpage],
    async () =>{
        return await apiClient.get(`/brand/detail/${bno}/${curpage}`)
    }
    )

    // const {isLoading,isError,error,data,ref}
    //     =AllGetData('http://localhost/brand/detail',
    //     {page:curpage,bno:bno},'brandDetail-'+bno,curpage)
=======
    const {isLoading,isError,error,data}
        =AllGetData('http://localhost/brand/detail',
        {page:curpage,bno:bno},'brandDetail-'+bno,curpage)
>>>>>>> 2f28e7f26f9ecf74d895bd1034a6f34b04b1064d
    if(isLoading) return <h3 className={"text-center"}>Loading</h3>
    if(isError) return <h3 className={"text-center"}>{error.message}</h3>






    const onPageChange = (page) => {
        setCurpage(page);
    };






    return (

        <div className={"container"}>



                <div className="text-center" style={{"marginTop":"40px"}}>

                    <img src="/assets/img/BrandImg.png" alt="" style={{"width": "50%", "height": "50%"}}
                         className="rounded-circle img-fluid border"/>
                    <h2 className="text-center "
                        style={{"fontWeight": "bold", "color": "purple"}}>{data.data.bcvo.name}</h2>





                <div className={"row"} style={{"marginTop":"50px"}}>

                    {
                        data.data.bclist.map((vo) =>

                            <div className="col-md-4">
                                <div className="card mb-4 product-wap rounded-0">
                                    <div className="card rounded-0">
                                        <img className="card-img rounded-0 img-fluid" src={vo.image}/>
                                        <div
                                            className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                            <ul className="list-unstyled">
                                                <li><a className="btn btn-success text-white" href="shop-single.html"><i
                                                    className="far fa-heart"></i></a></li>
                                                <li><a className="btn btn-success text-white mt-2"
                                                       href="shop-single.html"><i
                                                    className="far fa-eye"></i></a></li>
                                                <li><a className="btn btn-success text-white mt-2"
                                                       href="shop-single.html"><i
                                                    className="fas fa-cart-plus"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <Link to={"/cloth/detail/" + vo.pno}
                                              className="h3 text-decoration-none text-ellipsis"><span
                                        >{vo.name}</span></Link>
                                        <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                            <li>{vo.sex}</li>
                                            <li className="pt-2">
                                        <span
                                            className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                                <span
                                                    className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                                <span
                                                    className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                                <span
                                                    className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                                <span
                                                    className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                            </li>
                                        </ul>
                                        <ul className="list-unstyled d-flex justify-content-center mb-1">
                                            <li>
                                                <i className="text-warning fa fa-star"></i>
                                                <i className="text-warning fa fa-star"></i>
                                                <i className="text-warning fa fa-star"></i>
                                                <i className="text-muted fa fa-star"></i>
                                                <i className="text-muted fa fa-star"></i>
                                            </li>
                                        </ul>
                                        <p className="text-center mb-0">
                                            <Link to={"/"}><span style={{"fontWeight": "bold"}}>{vo.brand}</span></Link>
                                        </p>
                                        <p className="text-center mb-0">
                                            <span style={{
                                                "textDecoration": "line-through",
                                                "color": "gray"
                                            }}>{vo.originalprice}</span>
                                            <span style={{
                                                color: 'red',
                                                fontStyle: 'italic',
                                                marginLeft: '10px'
                                            }}>{vo.hit} hit</span>
                                        </p>

                                        <p className="text-center mb-0 ">
                                            <span style={{
                                                "fontSize": "30px",
                                                "fontWeight": "bold"
                                            }}>  {vo.nowprice}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>


                    <div className="row">
                        <Pagination curPage={curpage} totalPage={data.data.bctotalpage}
                                    startPage={data.data.bcstartpage}
                                    endPage={data.data.bcendpage} onPageChange={onPageChange}/>
                    </div>

                </div>
        </div>
    )
}

export default BrandDetail