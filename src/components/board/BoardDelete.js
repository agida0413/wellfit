import { useMutation } from "react-query";
import { useNavigate,useParams } from "react-router-dom";
import apiClient from '../../http-commons'
import { useState,useRef } from "react";

function BoardDelete(){
   const {no} = useParams()
   const nav = useNavigate()
   const pwdRef=useRef(null)
   const [pwd,setPwd]=useState('')
   const {isLoading,mutate:boardDelete}=useMutation(
      async () => {
          return await apiClient.delete(`/board/delete/${no}/${pwd}`)
      },
      {
         onSuccess:(res)=>{
             if(res.data.msg==='yes')
             {
                 window.location.href='/board/list'
             }
             else
             {
                alert("비밀번호가 틀립니다")
                setPwd('')
                pwdRef.current.focus()
             }
         }
      },
      {
         onError:(err)=>{
            console.log(err.response)
         }
      }
   )
   const boardDeleteOk=()=>{
      if(pwd.trim()==="")
      {
         pwdRef.current.focus()
         return 
      }
      boardDelete()
   }
   return (
     <div className="row" style={{"width":"350px"}}>
        <table className="table">
            <tbody>
                <tr>
                    <td className="text-center">
                        비밀번호:<input type="password" className="input-sm" size="15"
                                    ref={pwdRef} value={pwd}
                                    onChange={(e)=>setPwd(e.target.value)}
                                />
                    </td>
                </tr>
                <tr>
                    <td className="text-center">
                        <button className="btn-sm btn-danger" onClick={boardDeleteOk}>삭제</button>&nbsp;
                        <button className="btn-sm btn-danger" onClick={()=>nav(-1)}>취소</button>
                    </td>
                </tr>
            </tbody>
        </table>
     </div>
   )
}

export default BoardDelete