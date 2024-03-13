import {useEffect, useState} from "react";
import axios from "axios";


function OtherShopping(){
const [ss,setSs]=useState('가방')
 const [list,setList]=useState([])
    useEffect(() => {
        axios.get('http://localhost/other/shopping',{
            params:{
                ss:ss
            }
        }).then(response=>{
            console.log(response.data)
                setList(response.data.items)

        })
    }, [ss]);

const ssChange=(e)=>{
setSs(e.target.value)
    }
    let html=list.map((news)=>
        <table className={"table"}>
            <tbody>
            <tr>
                <td width={"20%"}><img src={news.image} width={"50%"}/></td>

                <td width={"80%"}><a href={news.link}><h3 style={{"color":"orange"}} dangerouslySetInnerHTML={{__html: news.title}}></h3></a></td>
            </tr>

            </tbody>
        </table>
    )

    return(
        <>
            <div className={"row"}>
                <div className={"text-center"} style={{marginBottom:"20px",marginTop:"20px"}}>

                    <span  style={{fontSize:"40px",fontStyle:"italic",color:"purple"}}>우리 쇼핑몰에 없는 상품을 찾아보세요</span>

                </div>
                <table className={"table"}>
                    <tbody>


                    <tr>
                        <td>

                            <button value={"바지"} className={"btn btn-sm btn-primary"} onClick={ssChange}
                                    style={{"marginRight": "5px"}}>바지
                            </button>
                            <button value={"상의"} className={"btn btn-sm btn-primary"} onClick={ssChange}
                                    style={{"marginRight": "5px"}}>상의
                            </button>
                            <button value={"스포츠"} className={"btn btn-sm btn-primary"} onClick={ssChange}
                                    style={{"marginRight": "5px"}}>스포츠
                            </button>
                            <button value={"뷰티"} className={"btn btn-sm btn-primary"} onClick={ssChange}
                                    style={{"marginRight": "5px"}}>뷰티
                            </button>
                            <button value={"아우터"} className={"btn btn-sm btn-primary"} onClick={ssChange}
                                    style={{"marginRight": "5px"}}>아우터
                            </button>

                            <button value={"스니커즈"} className={"btn btn-sm btn-primary"} onClick={ssChange}
                                    style={{"marginRight": "5px"}}>스니커즈
                            </button>

                            <button value={"양말"} className={"btn btn-sm btn-primary"} onClick={ssChange}
                                    style={{"marginRight": "5px"}}>양말
                            </button>

                            <button value={"여성 가방"} className={"btn btn-sm btn-primary"} onClick={ssChange}
                                    style={{"marginRight": "5px"}}>여성 가방
                            </button>


                            <button value={"가방"} className={"btn btn-sm btn-primary"} onClick={ssChange} style={{"marginRight": "5px"}}>가방</button>

                            <button value={"액세서리"} className={"btn btn-sm btn-primary"} onClick={ssChange}
                                    style={{"marginRight": "5px"}}>액세서리
                            </button>

                            <button value={"속옷"} className={"btn btn-sm btn-primary"} onClick={ssChange}
                                    style={{"marginRight": "5px"}}>속옷
                            </button>

                            <button value={"신발"} className={"btn btn-sm btn-primary"} onClick={ssChange}
                                    style={{"marginRight": "5px"}}>신발
                            </button>

                            <button value={"선글라스/안경테"} className={"btn btn-sm btn-primary"} onClick={ssChange}
                                    style={{"marginRight": "5px"}}>선글라스/안경테
                            </button>

                            <button value={"모자"} className={"btn btn-sm btn-primary"} onClick={ssChange}
                                    style={{"marginRight": "5px"}}>모자
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className={"row"}>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        {html}

                    </tr>
                    </tbody>
                </table>
            </div>

        </>
    )
}
export default OtherShopping