import { Fragment,useEffect,useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import apiClient from '../../http-commons'
/*
    이력서 
    => 이력서 
    => 교육내역서 
    => 포트폴리어 
       = 2차 팀별 프로젝트 
       = 1차 팀별 프로젝트 
       = 개인 프로젝트 (유사) 
    => 자소서 
    ----------------------- 
    실무 : ERP => 관리 (데이터베이스 : CRUD) 
           팀별 / 개인 (인터뷰)
*/
function BoardList(){
   const [curpage,setCurpage]=useState(1)
   const {isLoading,isError,error,data,refetch:hitIncrement}=useQuery(['board-list',curpage],
      async () => {
        return await apiClient.get(`/board/list/${curpage}`)
      }
   )
   const prev=()=>{
      setCurpage(curpage>1?curpage-1:curpage)
   }
   const next=()=>{
      setCurpage(curpage<data.data.totalpage?curpage+1:curpage)
   }
   useEffect(()=>{
    hitIncrement()
   },[isLoading])
   if(isLoading) return <h1 className="text-center">서버에서 데이터 전송 지연중...</h1>
   if(isError) return <h1 className="text-center">Error발생:{error}</h1>
   console.log(data)
   
   return (
     <div className="row" style={{"width":"800px"}}>
        <h3 className="text-center">자유 게시판</h3>
        <table className="table">
            <tbody>
               <tr>
                <td>
                    <Link className="btn btn-sm btn-primary" to="/board/insert">새글</Link>
                </td>
               </tr>
            </tbody>
        </table>
        <table className="table">
            <thead>
                <tr className="danger">
                    <th className="text-center" width="10%">번호</th>
                    <th className="text-center" width="45%">제목</th>
                    <th className="text-center" width="15%">이름</th>
                    <th className="text-center" width="20%">작성일</th>
                    <th className="text-center" width="10%">조회수</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.data.bList &&
                    data.data.bList.map((board)=>
                        <tr>
                            <td className="text-center" width="10%">{board.no}</td>
                            <td width="45%"><Link to={"/board/detail/"+board.no}>{board.subject}</Link></td>
                            <td className="text-center" width="15%">{board.name}</td>
                            <td className="text-center" width="20%">{board.regdate}</td>
                            <td className="text-center" width="10%">{board.hit}</td>
                        </tr>
                    )
                }
                <tr>
                    <td colSpan={"5"} className="text-center">
                        <button className="btn-sm btn-success" onClick={prev}>이전</button>
                        {curpage} page / {data.data.totalpage} pages
                        <button className="btn-sm btn-success" onClick={next}>다음</button>
                    </td>
                </tr>
            </tbody>
        </table>
     </div>
   )
}

export default BoardList