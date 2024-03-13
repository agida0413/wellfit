import {Link, useNavigate, useParams} from "react-router-dom";
import {Fragment, useEffect, useRef, useState} from "react";
import axios from "axios";

function  BoardUpdate(){

    let {no}=useParams()
    const nav=useNavigate()
    const [vo,setVo]=useState({})
    const [name,setName]=useState('')
    const [subject,setSubject]=useState('')
    const [content,setContent]=useState('')
    const [pwd,setPwd]=useState('')

    // <태그 제어 > ref
    const nameRef=useRef()
    const subjectRef=useRef()
    const contentRef=useRef()
    const pwdRef=useRef()
    useEffect(() => {
        axios.get('http://localhost/board/update_react',{
            params:{
                no:no
            }
        }).then(response=>{
            setVo(response.data)
            setName(response.data.name)
            setSubject(response.data.subject)
            setContent(response.data.content)

        })
    }, []);
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

    const update_ok=()=>{
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
        formdate.append('no',no)
        axios.post('http://localhost/board/update_ok_react',formdate).then(response=>{
            if(response.data==='YES'){
                window.location.href="/board/list"
            }
            else{
                alert('게시판 수정')
            }

        })
    }

    return (
        <div className={"container py-5"}>

        <div className={"row"}>
            <h3 className={"text-center"}>글쓰기</h3>
            <table className={"table"}>
                <tbody>
                <tr>
                    <td width={"15%"} className={"text-center"}>이름</td>
                    <td width={"85%"}>
                        <input type={"text"} size={"15"} className={"input-sm"}
                               onChange={nameChange} defaultValue={vo.name} ref={nameRef}
                        />
                    </td>
                </tr>
                <tr>
                    <td width={"15%"} className={"text-center"}>제목</td>
                    <td width={"85%"}>
                        <input type={"text"} size={"50"} className={"input-sm"}
                               onChange={subjectChange} defaultValue={vo.subject}  ref={subjectRef}
                        />
                    </td>
                </tr>
                <tr>
                    <td width={"15%"} className={"text-center"}>내용</td>
                    <td width={"85%"}>
                                <textarea rows={"10"} cols={"52"}
                                          onChange={contentChange}
                                          ref={contentRef}
                                          defaultValue={vo.content}
                                ></textarea>
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
                        <input type={"button"} className={"btn-sm btn-info"} value={"수정"}
                        onClick={update_ok}/>
                        <input type={"button"} className={"btn-sm btn-warning"} value={"취소"}
                               onClick={() => nav(-1)}/>
                    </td>
                </tr>
                </tbody>

            </table>
        </div>
        </div>

    )
}

export default BoardUpdate