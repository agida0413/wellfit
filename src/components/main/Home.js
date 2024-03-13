import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Home(){

function Middle(){
    const [list,setList]=useState([])

    useEffect(() => {
        axios.get('http://localhost/main/middle').then(response=>{
            setList(response.data)
        })
    }, []);

    let html=list.map((vo) =>
        <div className="col-12 col-md-4 p-5 mt-3">
         <img src={vo.image} alt="" style={{"width":"100%","height":"70%"}}
                             className="rounded-circle img-fluid border"/>
            <h5 className="text-center mt-3 mb-3">{vo.brand}</h5>
            <p className="text-center"><Link to={"/brand/detail/"+vo.bno} className="btn btn-success">Go Shop</Link></p>
        </div>
    )
    return (
        <section className="container py-5">
            <div className="row text-center pt-3">
                <div className="col-lg-6 m-auto">
                    <h1 className="h1">Brand Top 3</h1>

                </div>
            </div>
            <div className="row">
                {html}

            </div>
        </section>
    )
}


    function Bottom() {
    const [list,setList]=useState([])
        useEffect(() => {
            axios.get('http://localhost/main/bottom').then(response=>{
                setList(response.data)
            })
        }, []);
        let html=list.map((vo) =>
            <div className="col-12 col-md-4 mb-4">
                <div className="card h-100">

                        <img src={vo.image} className="card-img-top" alt="..."/>

                    <div className="card-body">
                        <ul className="list-unstyled d-flex justify-content-between">
                            <li>
                                <i className="text-warning fa fa-star"></i>
                                <i className="text-warning fa fa-star"></i>
                                <i className="text-warning fa fa-star"></i>
                                <i className="text-warning fa fa-star"></i>
                                <i className="text-warning fa fa-star"></i>
                            </li>

                        </ul>
                        <Link to={"/cloth/detail/"+vo.pno} className="h2 text-decoration-none text-dark"

                        >{vo.name}</Link>
                        <p className="card-text">
                            <span style={{"textDecoration": "line-through", "color": "gray"}}>{vo.originalprice}</span>
                            <span style={{color: 'red', fontStyle: 'italic', marginLeft: '10px'}}>{vo.hit} hit</span>
                        </p>

                        <p className="card-text">
                            <span style={{"fontSize":"30px","fontWeight":"bold"}}>  {vo.nowprice}</span>
                        </p>

                    </div>
                </div>
            </div>
        )
        return (
            <section className="bg-light">
                <div className="container py-5">
                    <div className="row text-center py-3">
                        <div className="col-lg-6 m-auto">
                            <h1 className="h1">많이 찾아본 상품</h1>

                        </div>
                    </div>
                    <div className="row">
                        {html}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <Fragment>

            <Middle/>
            <Bottom/>
        </Fragment>

    )
}

export default Home