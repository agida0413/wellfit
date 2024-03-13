import {Fragment, useState,useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function BoardInsert(){
    const nav=useNavigate()
    const [name,setName]=useState('')
    const [subject,setSubject]=useState('')
    const [content,setContent]=useState('')
    const [pwd,setPwd]=useState('')

    // <태그 제어 > ref
    const nameRef=useRef()
    const subjectRef=useRef()
    const contentRef=useRef()
    const pwdRef=useRef()
    const nameChange=(e)=>{
        setName(e.target.value)
    }
    const subjectChange=(e)=>{
        setSubject(e.target.value)
    }
    const contentChange=(e)=>{
        setContent(e.target.value)
    }
    const pwdChange=(e)=>{
        setPwd(e.target.value)
    }

    const insert=()=>{
        if(name.trim()===''){
            nameRef.current.focus()
            return
        }

        if(subject.trim()===''){
            subjectRef.current.focus()
            return
        }

        if(content.trim()===''){
            contentRef.current.focus()
            return
        }

        if(pwd.trim()===''){
            pwdRef.current.focus()
            return
        }
        let formdate=new FormData
        formdate.append('name',name)
        formdate.append('subject',subject)
        formdate.append('content',content)
        formdate.append('pwd',pwd)
        axios.post('http://localhost/board/insert_react',formdate).then(response=>{
            if(response.data==='YES'){
                window.location.href="/board/list"
            }
            else{
                alert('게시판 추가실패')
            }

        })
    }
    return(
        <div className={"container py-5"}>
            <div className={"row"}>
            <div className={"row"}>
                <h3 className={"text-center"}>글쓰기</h3>
                    <table className={"table"}>
                        <tbody>
                        <tr>
                            <td width={"15%"} className={"text-center"}>이름</td>
                            <td width={"85%"}>
                                <input type={"text"} size={"15"} className={"input-sm"}
                                onChange={nameChange} value={name} ref={nameRef}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td width={"15%"} className={"text-center"}>제목</td>
                            <td width={"85%"}>
                                <input type={"text"} size={"50"} className={"input-sm"}
                                onChange={subjectChange} value={subject} ref={subjectRef}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td width={"15%"} className={"text-center"}>내용</td>
                            <td width={"85%"}>
                                <textarea rows={"10"} cols={"52"}
                                onChange={contentChange}
                                           ref={contentRef}
                                >{content}</textarea>
                            </td>
                        </tr>
                        <tr>
                            <td width={"15%"} className={"text-center"}>비밀번호</td>
                            <td width={"85%"}>
                                <input type={"password"} size={"15"} className={"input-sm"}
                                onChange={pwdChange} value={pwd} ref={pwdRef}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={"2"} className={"text-center"}>
                                <input type={"button"} className={"btn-sm btn-info"} value={"글쓰기"} onClick={insert}/>
                                <input type={"button"} className={"btn-sm btn-warning"} value={"취소"}
                                onClick={()=>nav(-1)}/>
                            </td>
                        </tr>
                        </tbody>

                    </table>
            </div>
            </div>
        </div>
    )
}

export default BoardInsert