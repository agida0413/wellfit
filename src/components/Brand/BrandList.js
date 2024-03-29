import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import Pagination from "../common/Pagination";
import axios from "axios";
import {AllGetData} from "../actions/AllGetData";

function BrandList(){

    const [curpage, setCurpage] = useState(1);
    const [ss,setSs]=useState('')
    const ssRef=useRef(null)
    const {isLoading,isError,error,data}
        =AllGetData('http://localhost/brand/list',
        {page:curpage,ss:ss},'brandList-'+ss,curpage)
    if(isLoading) return <h3 className={"text-center"}>Loading</h3>
    if(isError) return <h3 className={"text-center"}>{error.message}</h3>

    const onPageChange = (page) => {
        setCurpage(page);
    };

    let temp=''
    const changeSs=(event)=>{
       temp=event.target.value
      ssRef.current.value=temp
    }
    const find=()=>{
        setSs(temp)
        setCurpage(1)
    }


    return (
        <div className={"container py-5"} >
            <div className={"row"} >
                <div className="row">

                    <div className="col-md-6 pb-4">
                        <div className="d-flex">
                            <div className="input-group mb-2">
                                <input type="text" className="form-control" id="inputModalSearch" name="q"
                                       placeholder="Search ..."

                                        onChange={changeSs}
                                       ref={ssRef}

                                />
                                <button type="submit" className="input-group-text bg-success text-light" onClick={find}>
                                    <i className="fa fa-fw fa-search text-white"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className={"row"}>
                {
                    data.data.list.map((vo) =>
                        <div className="col-12 col-md-4 p-5 mt-3" style={{"borderTop":"1px gray solid"}}>
                            <img src="../assets/img/BrandImg.png" alt="" style={{"width": "100%", "height": "70%"} }
                                 className="rounded-circle img-fluid border"/>
                            <h2 className="text-center mt-3 mb-3" style={{"fontWeight":"bold","color":"purple"}}>{vo.name}</h2>
                            <p className="text-center"><Link to={'/brand/detail/'+vo.bno} className="btn btn-success">Go Shop</Link>
                            </p>
                        </div>
                    )
                }
            </div>
            <div className="row">
                <Pagination curPage={curpage} totalPage={data.data.totalpage} startPage={data.data.startpage}
                            endPage={data.data.endpage} onPageChange={onPageChange}/>
            </div>

        </div>
    )
}

export default BrandList