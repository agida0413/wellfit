import { useQuery } from "react-query";
import apiClient from '../../http-commons'
import { useParams,Link } from "react-router-dom";
import { useEffect } from "react";
function BoardDetail(){
   const {no}=useParams()
   // useEffect(()=>{},[no])
   const {isLoading,isError,error,data,refetch:boardDetail}=useQuery(['board-detail',no],
     async () => {
        return await apiClient.get(`/board/detail/${no}`)
     }
   )
   useEffect(()=>{
      boardDetail()
   },[isLoading])
   if(isLoading) return <h1 className="text-center">서버에서 전송 지연중...</h1>
   if(isError) return <h1 className="text-center">Error발생:{error}</h1>
   console.log(data)
   return (
      <div className="row" style={{"width":"800px"}}>
        <h3 className="text-center">내용보기</h3>
        <table className="table">
            <tbody>
                <tr>
                    <th className="text-center success" width="20%">번호</th>
                    <td className="text-center" width={"30%"}>{data.data.no}</td>
                    <th className="text-center success" width="20%">작성일</th>
                    <td className="text-center" width={"30%"}>{data.data.regdate}</td>
                </tr>
                <tr>
                    <th className="text-center success" width="20%">이름</th>
                    <td className="text-center" width={"30%"}>{data.data.name}</td>
                    <th className="text-center success" width="20%">조회수</th>
                    <td className="text-center" width={"30%"}>{data.data.hit}</td>
                </tr>
                <tr>
                    <th className="text-center success" width="20%">제목</th>
                    <td colSpan={"3"}>{data.data.subject}</td>
                </tr>
                <tr>
                    <td colSpan={"4"} className="text-left" valign="top" height={"200"}>
                        <pre style={{"whiteSpace":"pre-wrap","backgroundColor":"white","border":"none"}}>{data.data.content}</pre>
                    </td>
                </tr>
                <tr>
                    <td colSpan={"4"} className="text-right">
                        <Link className="btn btn-xs btn-danger" to={"/board/update/"+data.data.no}>수정</Link>&nbsp;
                        <Link className="btn btn-xs btn-primary" to={"/board/delete/"+data.data.no}>삭제</Link>&nbsp;
                        <Link className="btn btn-xs btn-info" to="/board/list">목록</Link>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
   )
}

export default BoardDetail