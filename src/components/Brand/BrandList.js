import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Pagination from "../common/Pagination";
import axios from "axios";

function BrandList(){
    const [list,setList]=useState([])
    const [curpage, setCurpage] = useState(1);
    const [totalpage, setTotalapge] = useState(0);
    const [endpage, setEndpage] = useState(0);
    const [startpage, setStartpage] = useState(0);
    const [ss,setSs]=useState('')

    useEffect(() => {
        axios.get('http://localhost/brand/list',{
            params:{
                ss:ss,
                page:curpage
            }
        }).then(response => {
            setTotalapge(response.data.totalpage);
            setCurpage(response.data.curpage);
            setStartpage(response.data.startpage)
            setEndpage(response.data.endpage)
            setList(response.data.list)


        });
    }, [curpage, startpage, endpage, ss]);
    const onPageChange = (page) => {
        setCurpage(page);
    };
    const changeSs=(event)=>{
        setSs(event.target.value)
        setCurpage('1')
    }

    let html=list.map((vo) =>
        <div className="col-12 col-md-4 p-5 mt-3" style={{"borderTop":"1px gray solid"}}>
            <img src="../assets/img/BrandImg.png" alt="" style={{"width": "100%", "height": "70%"} }
                 className="rounded-circle img-fluid border"/>
            <h2 className="text-center mt-3 mb-3" style={{"fontWeight":"bold","color":"purple"}}>{vo.name}</h2>
            <p className="text-center"><Link to={'/brand/detail/'+vo.bno} className="btn btn-success">Go Shop</Link>
            </p>
        </div>
    )
    return (
        <div className={"container py-5"} >
            <div className={"row"} >
                <div className="row">

                    <div className="col-md-6 pb-4">
                        <div className="d-flex">
                            <div className="input-group mb-2">
                                <input type="text" className="form-control" id="inputModalSearch" name="q"
                                       placeholder="Search ..."
                                       placeholder="Search ..."
                                       value={ss}
                                       onChange={changeSs}

                                />
                                <button type="submit" className="input-group-text bg-success text-light">
                                    <i className="fa fa-fw fa-search text-white"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className={"row"}>
                {html}
            </div>
            <div className="row">
                <Pagination curPage={curpage} totalPage={totalpage} startPage={startpage}
                            endPage={endpage} onPageChange={onPageChange}/>
            </div>

        </div>
    )
}

export default BrandList