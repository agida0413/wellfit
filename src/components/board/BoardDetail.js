import {Link, useNavigate, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";

function BoardDetail(){
    /*
    Fragment 임시 루트를 만들ㄸ)
    useState : 변수 =state(계속 변경되는 데이터가 있는경우에)
    props : 고정된 데이터 = > 태그의 속성값을 전송
    =>함수 매개변수로 받는다
    useEffect : mounted(window.onload)
    useParams : URL데이터 전송
    useRef : 태그제어
    useNavigate : 브라우저 이동 제어
    useMemo/useContext/useReducer == > Redux(Front의 MVC)
     */
let {no}=useParams()
    const nav=useNavigate()
    const [vo,setVo]=useState({})
    useEffect(() => {
        axios.get('http://localhost/board/detail_react',{
            params:{
                no:no
            }
        }).then(response=>{
            setVo(response.data)
        })
    }, []);

    const update=()=>{

    }
    return(
        <Fragment>
            <div className={"container py-5"}>

                    <div className={"row"}>
                        <h3 className={"text-center"}>내용보기</h3>
                        <table className={"table"}>
                            <tbody>
                            <tr>
                                <th width={"20%"} style={{"backgroundColor": "#f2f2f2"}} className={"text-center"}>번호
                                </th>
                                <td width={"30%"} className={"text-center"}>{vo.no}</td>
                                <th width={"20%"} style={{"backgroundColor": "#f2f2f2"}} className={"text-center"}>작성일
                                </th>
                                <td width={"30%"} className="text-center">{vo.regdate}</td>
                            </tr>
                            <tr>
                                <th width={"20%"} style={{"backgroundColor": "#f2f2f2"}} className={"text-center"}>이름
                                </th>
                                <td width={"30%"} className={"text-center"}>{vo.name}</td>
                                <th width={"20%"} style={{"backgroundColor": "#f2f2f2"}} className={"text-center"}>조회수
                                </th>
                                <td width={"30%"} className={"text-center"}>{vo.hit}</td>
                            </tr>
                            <tr>
                                <th width={"20%"} style={{"backgroundColor": "#f2f2f2"}} className={"text-center"}>제목
                                </th>
                                <td colSpan={"3"}
                                    style={{"fontWeight": "bold"}}>{vo.subject}</td>
                            </tr>
                            <tr>
                                <td colSpan={"4"} className={"text-left"} valign={"top"} height={"200"}>
                                    <pre style={{
                                        "white-space": "pre-wrap",
                                        "border": "none",
                                        "backgroundColor": "white"
                                    }}>{vo.content}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={"4"} className={"text-right"}>
                                    <Link to={"/board/update/" + vo.no} className={"btn btn-info btn-xs"}>수정</Link>
                                    <Link to={"/board/delete/" + vo.no} className="btn btn-success btn-xs">삭제</Link>
                                    <Link className="btn btn-warning btn-xs" onClick={() => nav(-1)}>목록</Link>
                                </td>
                            </tr>


                            </tbody>
                        </table>
                    </div>
            </div>
        </Fragment>
)
}

export default BoardDetail