import { useState,useRef } from "react";
import { useMutation } from "react-query";
/*
    useQuery : 단일 URL연결후 = 데이터 읽기
    useQueries : 다중 URL 연결 = 데이터 읽기
    useMutation : 특정 데이터 처리 => 쓰기 => insert,update,delete
*/
import apiClient from '../../http-commons'
import { useNavigate } from "react-router-dom";

function BoardInsert(){
   const nameRef=useRef(null)
   const subRef=useRef(null)
   const contRef=useRef(null)
   const pwdRef=useRef(null)

   const [name,setName]=useState('')
   const [subject,setSubject]=useState('')
   const [content,setContent]=useState('')
   const [pwd,setPwd]=useState('')
   const [result,setResult]=useState(null)
   const nav=useNavigate()
   const {isLoading,mutate:freeboardInsert}=useMutation(
      async () => {
        return await apiClient.post(`/board/insert`,{
            name:name,
            subject:subject,
            content:content,
            pwd:pwd 
        })
      },
      {
        onSuccess:(res)=>{
            const resData={
               status:res.status,
               headers:res.headers,
               data:res.data
            }
            setResult(resData)
            // => yes/no => 이동 , 오류발생
            if(res.data.msg==="yes")
            {
                window.location.href="/board/list"
            } 
            else
            {
                alert("게시물 추가에 오류가 발생하였습니다")
            }
        }
      },
      {
         onError:(err)=>{
            setResult(err.response)
         }
      }
   )
   const boardInsert=()=>{
     if(name.trim()==="")
     {
        nameRef.current.focus()
        return 
     }
     else if(subject.trim()==="")
     {
        subRef.current.focus()
        return 
     }
     else if(content.trim()==="")
     {
        contRef.current.focus()
        return 
     }
     else if(pwd.trim()==="")
     {
        pwdRef.current.focus()
        return 
     }
     // 유효성 검사 => NOT NULL일경우 => 입력란 (input ,select , textarea) => ref (id)
     freeboardInsert()
   }
   return (
      <div className="row" style={{"width":"800px"}}>
        <h3 className="text-center">글쓰기</h3>
        <table className="table">
           
            <tbody>
                <tr>
                    <th className="text-center" width="15%">이름</th>
                    <td width={"85%"}>
                        <input type="text" className="input-sm" size={"20"}
                          ref={nameRef} value={name}
                          onChange={(e)=>setName(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <th className="text-center" width="15%">제목</th>
                    <td width={"85%"}>
                        <input type="text" className="input-sm" size={"50"}
                          ref={subRef} value={subject}
                          onChange={(e)=>setSubject(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <th className="text-center" width="15%">내용</th>
                    <td width={"85%"}>
                        <textarea rows={"10"} cols={"52"}
                          ref={contRef} value={content}
                          onChange={(e)=>setContent(e.target.value)}
                        ></textarea>
                    </td>
                </tr>
                <tr>
                    <th className="text-center" width="15%">비밀번호</th>
                    <td width={"85%"}>
                        <input type="password" className="input-sm" size={"10"}
                          ref={pwdRef} value={pwd}
                          onChange={(e)=>setPwd(e.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                   
                    <td colSpan={"2"} className="text-center">
                        <button className="btn-sm btn-info" onClick={boardInsert}>글쓰기</button>&nbsp;
                        <button className="btn-sm btn-warnning" onClick={()=>nav(-1)}>취소</button>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
   )
}
export default BoardInsert
