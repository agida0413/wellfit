<<<<<<< HEAD
import { Link, useParams } from "react-router-dom";
import { Fragment } from "react";
import { useQuery } from "react-query";
import apiClient from '../../http-commons';
=======
import {Link, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {AllGetData} from "../actions/AllGetData";
>>>>>>> 2f28e7f26f9ecf74d895bd1034a6f34b04b1064d

function ClothDetail() {
    const { pno } = useParams(); // 초기 pno 값을 받아옴
<<<<<<< HEAD
=======
    const [vo,setVo]=useState({})
    const [cList,setCList]=useState([])
    const [curpage,setCurpage]=useState(1)




>>>>>>> 2f28e7f26f9ecf74d895bd1034a6f34b04b1064d

    const { isLoading, isError, error, data, refetch } = useQuery(['cloth-detail', pno],
        async () => {
            return await apiClient.get(`/cloth/detail/${pno}`, { withCredentials: true }) // 쿠키저장
        }
    );

<<<<<<< HEAD
=======
    useEffect(() => {
        axios.get('http://localhost/cloth/detail', {
            params: {
                pno: pno
            },
            withCredentials: true
        })
            .then(response => {
                setVo(response.data.vo);
                setCList(response.data.cList)

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [pno,curpage]);

    let cookieHtml=cList.map((cvo) =>
        <div className="col-3">


            <div className="p-2 pb-3">
                <div className="product-wap card rounded-0">
                    <div className="card rounded-0">
                        <img className="card-img rounded-0 img-fluid" src={cvo.image} alt="Product"/>
                        <div
                            className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                            <ul className="list-unstyled">
                                <li><Link className="btn btn-success text-white"
                                          to="/shop-single"><i className="far fa-heart"></i></Link>
                                </li>
                                <li><Link className="btn btn-success text-white mt-2"
                                          to="/shop-single"><i className="far fa-eye"></i></Link>
                                </li>
                                <li><Link className="btn btn-success text-white mt-2"
                                          to="/shop-single"><i
                                    className="fas fa-cart-plus"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-body">
                    <span className="h3 text-decoration-none text-ellipsis"> <Link to={"/cloth/detail/" + cvo.pno}
                                                                                   style={{textDecoration: 'none'}}><span
                    >{cvo.name}</span></Link></span>
                        <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                            <li>M/L/X/XL</li>
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
                            <span style={{"textDecoration": "line-through", "color": "gray"}}>{cvo.originalprice}</span>
                            <span style={{color: 'red', fontStyle: 'italic', marginLeft: '10px'}}>{cvo.hit} hit</span>
                        </p>

                        <p className="text-center mb-0 ">
                            <span style={{"fontSize": "30px", "fontWeight": "bold"}}>  {cvo.nowprice}</span>
                        </p>


                    </div>
                </div>
            </div>
        </div>
    )
>>>>>>> 2f28e7f26f9ecf74d895bd1034a6f34b04b1064d
    return (
        <Fragment>
            {/* 로딩 중이면 로딩 메시지를 표시 */}
            {isLoading && <div>Loading...</div>}
            {/* 에러가 발생하면 에러 메시지를 표시 */}
            {isError && <div>Error: {error.message}</div>}
            {/* 데이터가 존재하면 상품 정보와 최근 본 상품을 표시 */}
            {data && data.data && (
                <div>
                    {/* 상품 정보 섹션 */}
                    <section className="bg-light">
                        <div className="container pb-5">
                            <div className="row">
                                <div className="col-lg-5 mt-5">
                                    <div className="card mb-3">
                                        <img className="card-img img-fluid" src={data.data.vo.image}
                                            alt="Card image cap" id="product-detail" style={{ height: '530px' }} />
                                    </div>
                                </div>
                                <div className="col-lg-7 mt-5">
                                    <div className="card">
                                        <div className="card-body">
                                            <h1 className="h2">{data.data.vo.name}</h1>
                                            <p className={"card-text"}>
                                                <span style={{
                                                    color: 'red',
                                                    fontStyle: 'italic'
                                                }}>{data.data.vo.hit} hit</span>
                                            </p>
                                            <p className="card-text">
                                                <span style={{
                                                    "textDecoration": "line-through",
                                                    "color": "gray"
                                                }}>{data.data.vo.originalprice}</span>
                                            </p>
                                            <p className="card-text">
                                                <span style={{
                                                    "fontSize": "30px",
                                                    "fontWeight": "bold"
                                                }}>  {data.data.vo.nowprice}</span>
                                            </p>
                                            {/* 상품 브랜드, 성별, 카테고리 정보 표시 */}
                                            <ul className="list-inline">
                                                <li className="list-inline-item">
                                                    <h6>Brand:</h6>
                                                </li>
                                                <li className="list-inline-item">
                                                    <p className="text-muted"><Link to={"/brand/detail/" + data.data.vo.bno}>
                                                        <span style={{ color: 'black', fontWeight: 'bold' }}>{data.data.vo.brand}</span></Link>
                                                    </p>
                                                </li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li className="list-inline-item">
                                                    <h6>sex : </h6>
                                                </li>
                                                <li className="list-inline-item">
                                                    <p className="text-muted"><strong
                                                        style={{ fontWeight: 'bold' }}>{data.data.vo.sex}</strong></p>
                                                </li>
                                            </ul>
                                            <ul className="list-inline">
                                                <li className="list-inline-item">
                                                    <h6>Category :</h6>
                                                </li>
                                                <li className="list-inline-item">
                                                    <p className="text-muted"><strong
                                                        style={{ fontWeight: 'bold' }}>{data.data.vo.category}</strong></p>
                                                </li>
                                            </ul>
                                            {/* 구매 버튼과 장바구니 버튼 */}
                                            <div className="row pb-3">
                                                <div className="col d-grid">
                                                    <button type="submit" className="btn btn-success btn-lg" name="submit"
                                                        value="buy">Buy
                                                    </button>
                                                </div>
                                                <div className="col d-grid">
                                                    <button type="submit" className="btn btn-success btn-lg" name="submit"
                                                        value="addtocard">Add To Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 최근 본 상품 섹션 */}
                    <section className="py-5">
                        <div className="container">
                            <div className="row text-left p-2 pb-3">
                                <h1>최근 본 상품</h1>
                            </div>
                            <div id="carousel-related-product" className="row">
                                {/* 최근 본 상품 목록을 표시 */}
                                {data.data.cList && data.data.cList.map((cvo) =>
                                    <div className="col-3" key={cvo.pno}>
                                        <div className="p-2 pb-3">
                                            <div className="product-wap card rounded-0">
                                                <div className="card rounded-0">
                                                    <img className="card-img rounded-0 img-fluid" src={cvo.image} alt="Product" />
                                                    <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                        <ul className="list-unstyled">
                                                            <li><Link className="btn btn-success text-white"
                                                                to="/shop-single"><i className="far fa-heart"></i></Link>
                                                            </li>
                                                            <li><Link className="btn btn-success text-white mt-2"
                                                                to="/shop-single"><i className="far fa-eye"></i></Link>
                                                            </li>
                                                            <li><Link className="btn btn-success text-white mt-2"
                                                                to="/shop-single"><i className="fas fa-cart-plus"></i></Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <span className="h3 text-decoration-none text-ellipsis">
                                                        <Link to={"/cloth/detail/" + cvo.pno} style={{ textDecoration: 'none' }}>
                                                            <span>{cvo.name}</span>
                                                        </Link>
                                                    </span>
                                                    <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                        <li>M/L/X/XL</li>
                                                        <li className="pt-2">
                                                            <span className="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                                            <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                                            <span className="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                                            <span className="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                                            <span className="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
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
                                                        <span style={{"textDecoration": "line-through", "color": "gray"}}>
                                                            {cvo.originalprice}
                                                        </span>
                                                        <span style={{ color: 'red', fontStyle: 'italic', marginLeft: '10px' }}>
                                                            {cvo.hit} hit
                                                        </span>
                                                    </p>
                                                    <p className="text-center mb-0 ">
                                                        <span style={{"fontSize": "30px", "fontWeight": "bold"}}>
                                                            {cvo.nowprice}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
<<<<<<< HEAD
            )}
=======
            </section>
            <div className={"row"}>

            </div>
>>>>>>> 2f28e7f26f9ecf74d895bd1034a6f34b04b1064d
        </Fragment>
    )
}

export default ClothDetail;
