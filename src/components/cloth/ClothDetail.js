import {Link, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {AllGetData} from "../actions/AllGetData";



function ClothDetail(){
    const { pno } = useParams(); // 초기 pno 값을 받아옴
    const [vo,setVo]=useState({})
    const [cList,setCList]=useState([])
    const [curpage,setCurpage]=useState(1)






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
    return (
        <Fragment>
            <div>
                <section className="bg-light">
                    <div className="container pb-5">
                        <div className="row">
                            <div className="col-lg-5 mt-5">
                                <div className="card mb-3">
                                    <img className="card-img img-fluid" src={vo.image}
                                         alt="Card image cap" id="product-detail" style={{height: '530px'}}/>
                                </div>

                            </div>
                            <div className="col-lg-7 mt-5">
                                <div className="card">
                                    <div className="card-body">
                                        <h1 className="h2">{vo.name}</h1>
                                        <p className={"card-text"}>
                                          <span style={{
                                              color: 'red',
                                              fontStyle: 'italic'

                                          }}>{vo.hit} hit</span>

                                        </p>
                                        <p className="card-text">
                                        <span style={{
                                            "textDecoration": "line-through",
                                            "color": "gray"
                                        }}>{vo.originalprice}</span>

                                        </p>

                                        <p className="card-text">
                                            <span style={{
                                                "fontSize": "30px",
                                                "fontWeight": "bold"
                                            }}>  {vo.nowprice}</span>
                                        </p>
                                        <p className="py-2">
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-warning"></i>
                                            <i className="fa fa-star text-secondary"></i>
                                            <span className="list-inline-item text-dark"></span>
                                        </p>
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <h6>Brand:</h6>
                                            </li>
                                            <li className="list-inline-item">
                                                <p className="text-muted"><Link to={"/brand/detail/"+vo.bno}>
                                                    <span style={{color: 'black', fontWeight: 'bold'}}>{vo.brand}</span></Link>
                                                </p>
                                            </li>
                                        </ul>

                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <h6>sex : </h6>
                                            </li>
                                            <li className="list-inline-item">
                                                <p className="text-muted"><strong
                                                    style={{fontWeight: 'bold'}}>{vo.sex}</strong></p>
                                            </li>
                                        </ul>

                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <h6>Category :</h6>
                                            </li>
                                            <li className="list-inline-item">
                                            <p className="text-muted"><strong
                                                    style={{fontWeight: 'bold'}}>{vo.category}</strong></p>
                                            </li>
                                        </ul>


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

            </div>
            <section className="py-5">
                <div className="container">
                    <div className="row text-left p-2 pb-3">
                        <h4>Related Products</h4>
                    </div>

                    {/* Start Carousel Wrapper */}
                    <div id="carousel-related-product">
                        <div className="row">


                            {cookieHtml}

                        </div>
                    </div>
                </div>
            </section>
            <div className={"row"}>

            </div>
        </Fragment>

    )
}

export default ClothDetail

