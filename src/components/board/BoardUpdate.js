import { useParams,useNavigate } from "react-router-dom";
import { useQuery,useMutation } from "react-query";
import apiClient from '../../http-commons'
import { useRef,useState,useEffect } from "react";

function BoardUpdate(){
   const {no} = useParams()
   // js ts
   const nav = useNavigate()
   const nameRef=useRef(null)
   const subRef=useRef(null)
   const contRef=useRef(null)
   const pwdRef=useRef(null)

   const [name,setName]=useState('')
   const [subject,setSubject]=useState('')
   const [content,setContent]=useState('')
   const [pwd,setPwd]=useState('')
   const [result,setResult]=useState(null)
   // 수정 데이터 읽기 
   const {data}=useQuery(['board-update',no],
      async () => {
        return await apiClient.get(`/board/update/${no}`)
      },
      {
         onSuccess:(res)=>{
             setName(res.data.name)
             setSubject(res.data.subject)
             setContent(res.data.content)
         }
      },
      {
          onError:(err)=>{
            console.log(err.response)
          }
      }
   )
   // 수정 
   const {mutate:boardUpdate}=useMutation(
      async () => {
        return await apiClient.put(`/board/update_ok/${no}`,{
           name:name,
           subject:subject,
           content:content,
           pwd:pwd
        })
      },
      {
         onSuccess:(res)=>{
            
            if(res.data.msg==="yes")
            {
                window.location.href='/board/detail/'+no
            }
            else
            {
                alert("비밀번호가 틀립니다!!")
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
   const boardUpdateok=()=>{
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
    boardUpdate()
   }
   return (
    <div className="row" style={{"width":"800px"}}>
    <h3 className="text-center">수정하기</h3>
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
                    <button className="btn-sm btn-info" onClick={boardUpdateok}>수정</button>&nbsp;
                    <button className="btn-sm btn-warnning" onClick={()=>nav(-1)}>취소</button>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
   )
}
export default BoardUpdate
