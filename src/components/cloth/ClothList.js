
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Pagination from "../common/Pagination";
import { useQuery,useMutation } from "react-query";
import apiClient from '../../http-commons'
function ClothList(){

    const [list,setList]=useState([])
    const [curpage, setCurpage] = useState(1);
    const [totalpage, setTotalapge] = useState(0);
    const [endpage, setEndpage] = useState(0);
    const [startpage, setStartpage] = useState(0);
    const [ss,setSs]=useState('')
    const [category,setCategory]=useState('')
    const [sex,setSex]=useState('')
    const [cateList,setCateList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [totalCate,setTotalCate]=useState(0)
    const ssRef=useRef(null)
    
    const {isLoading,isError,error,data,refetch}=useQuery(['cloth-list',curpage,startpage,endpage,ss,category,sex],

       async () => {
            return await apiClient.get(`/cloth/list/${curpage}`,{
                params:{
                    ss:ss,
                    category:category,
                    sex:sex
                }
            })      
       }
   ) 
   if(isLoading) return <h1 className="text-center">Loading</h1>
   // 서버나  React에서 에러 발생 
   if(isError) return <h1 className="text-center">{error}</h1>
   console.log(data)
    // useEffect(() => {
    //     console.log(curpage)
    //     axios.get('http://localhost/cloth/list', {
    //         params: { page: curpage,
    //                     ss:ss,
    //                     category:category,
    //                     sex:sex
    //         }
    //     }).then(response => {
    //         setTotalapge(response.data.totalpage);
    //         setCurpage(response.data.curpage);
    //         setStartpage(response.data.startpage)
    //         setEndpage(response.data.endpage)
    //         setList(response.data.list)
    //         setCateList(response.data.cateList)
    //         setBrandList(response.data.brandList)
    //         setTotalCate(response.data.total)

    //     });
    // }, [curpage, startpage, endpage, ss, category, sex]);


    const onPageChange = (page) => {
        setCurpage(page);
    };
    const sexChange = (sex) => {
        setSex(sex)
    };


   
const cateChange=(cate)=>{
        setCategory(cate)
    setSs('')
    setCurpage(1)
}
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
                <div className="col-lg-3">
                    <h1 className="h2 pb-4">Select Condition</h1>
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span style={{"fontWeight": "bold", "fontSize": "30px"}}>성별</span>
                        </li>
                        <li className={"hv list-group-item d-flex justify-content-between align-items-center " + (sex === '' ? 'active bg-light' : '')}
                            onClick={() => sexChange('')}
                            style={{ color: "#000" }} // 텍스트 색상을 검은색으로 설정
                        >
                            전체
                        </li>
                            <li className={"hv list-group-item d-flex justify-content-between align-items-center " + (sex === '남성' ? 'active bg-light' : '')}
                                onClick={() => sexChange('남성')}
                                style={{ color: "#000" }} // 텍스트 색상을 검은색으로 설정
                            >
                                남성
                            </li>
                            <li className={"hv list-group-item d-flex justify-content-between align-items-center " + (sex === '여성' ? 'active bg-light' : '')}
                                onClick={() => sexChange('여성')}
                                style={{ color: "#000" }} // 텍스트 색상을 검은색으로 설정
                            >
                                여성
                            </li>
                            <li className={"hv list-group-item d-flex justify-content-between align-items-center " + (sex === '남성 여성' ? 'active bg-light' : '')}
                                onClick={() => sexChange('남성 여성')}
                                style={{ color: "#000" }} // 텍스트 색상을 검은색으로 설정
                            >
                                공용
                            </li>
                    </ul>


                    <ul className="list-group" style={{"marginTop": "30px"}}>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span style={{"fontWeight": "bold", "fontSize": "30px"}}>카테고리</span>
                        </li>
                        <li className={"hv list-group-item d-flex justify-content-between align-items-center " + (category === '' ? 'active bg-light' : '')}
                            onClick={() => cateChange('')}
                            style={{ color: "#000" }} // 텍스트 색상을 검은색으로 설정
                        >
                            전체
                            <span className="badge  rounded-pill"
                                  style={{backgroundColor: 'green'}}>{totalCate}</span>
                        </li>
                       {
                        data.data.cateList &&
                        data.data.cateList.map((vo)=>
                        <li className={"hv list-group-item d-flex justify-content-between align-items-center " + (category === vo.category ? 'active bg-light' : '')}
                        onClick={()=>cateChange(vo.category)}
                          style={{ color: "#000" }} // 텍스트 색상을 검은색으로 설정
                      >
                          {vo.category}
                          <span className="badge  rounded-pill"
                                style={{backgroundColor: 'green'}}>{vo.count}</span>
                      </li>
                        )
                       }
                    </ul>
                </div>

                <div className="col-lg-9">

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

                    <div className="row">
                       {data.data.cTlist && 
                       data.data.cTlist.map((vo)=>
                       
                       <div className="col-md-4" >
                       <div className="card mb-4 product-wap rounded-0">
                           <div className="card rounded-0">
                               <img className="card-img rounded-0 img-fluid" src={vo.image}/>
                               <div
                                   className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                   <ul className="list-unstyled">
                                       <li><a className="btn btn-success text-white" href="shop-single.html"><i
                                           className="far fa-heart"></i></a></li>
                                       <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i
                                           className="far fa-eye"></i></a></li>
                                       <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i
                                           className="fas fa-cart-plus"></i></a></li>
                                   </ul>
                               </div>
                           </div>
                           <div className="card-body">
                               <Link to={"/cloth/detail/"+vo.pno} className="h3 text-decoration-none text-ellipsis"><span
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
                                   <Link to={"/brand/detail/"+vo.bno}><span style={{"fontWeight":"bold"}}>{vo.brand}</span></Link>
                               </p>
                                   <p className="text-center mb-0">
                                       <span style={{"textDecoration": "line-through", "color": "gray"}}>{vo.originalprice}</span>
                                       <span style={{color:'red',fontStyle:'italic',marginLeft:'10px'}}>{vo.hit} hit</span>
                                   </p>
           
                                   <p className="text-center mb-0 ">
                                       <span style={{"fontSize": "30px", "fontWeight": "bold"}}>  {vo.nowprice}</span>
                                   </p>
                           </div>
                       </div>
                   </div>
                       
                       )
                       }

                    </div>
                    <div className="row">
                        <Pagination curPage={data.data.cTcurpage} totalPage={data.data.cTtotalpage} startPage={data.data.cTstartpage}
                                    endPage={data.data.cTendpage} onPageChange={onPageChange}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClothList