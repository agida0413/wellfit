    import { Fragment, useEffect, useState } from "react";
    import axios from "axios";
    import { Link } from "react-router-dom";
    import Pagination from "../common/Pagination";
    function BoardList() {
        const [curpage, setCurpage] = useState(1);
        const [totalpage, setTotalapge] = useState(0);
        const [boardList, setBoardList] = useState([]);
        const [endpage, setEndpage] = useState(0);
        const [startpage, setStartpage] = useState(0);
        useEffect(() => {
            axios.get('http://localhost/board/list_react', {
                params: { page: curpage }
            }).then(response => {
                setTotalapge(response.data.totalpage);
                setBoardList(response.data.list);
                setCurpage(response.data.curpage);
                setStartpage(response.data.startpage)
                setEndpage(response.data.endpage)

            });
        }, [curpage]);
        const onPageChange = (page) => {
            setCurpage(page);
        };

        let html = boardList.map((vo) => (
            <tr key={vo.no}>
                <td className="text-center" style={{ width: "10%" }}>{vo.no}</td>
                <td style={{ width: "45%" }}><Link to={"/board/detail/" + vo.no}>{vo.subject}</Link></td>
                <td className="text-center" style={{ width: "15%" }}>{vo.name}</td>
                <td className="text-center" style={{ width: "20%" }}>{vo.regdate.substring(0, vo.regdate.indexOf(" "))}</td>
                <td className="text-center" style={{ width: "10%" }}>{vo.hit}</td>
            </tr>
        ));

        return (
            <div className="container py-5">
                <div className="row">
                    <h3 className="text-center">게시판</h3>
                    <table style={{marginBottom: "10px"}}>
                        <tbody>
                        <tr>
                            <td>
                                <Link to="/board/insert" className="btn btn-sm btn-success">새글</Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="table">
                        <thead>
                        <tr className="table-success">
                            <th className="text-center" style={{width: "10%"}}>번호</th>
                            <th className="text-center" style={{width: "45%"}}>제목</th>
                            <th className="text-center" style={{width: "15%"}}>이름</th>
                            <th className="text-center" style={{width: "20%"}}>작성일</th>
                            <th className="text-center" style={{width: "10%"}}>조회수</th>
                        </tr>
                        </thead>

                        <tbody>
                        {html}
                        </tbody>


                    </table>
                    <div className={"text-center"} style={{"marginTop":"20px"}}>



                        <Pagination curPage={curpage} totalPage={totalpage} startPage={startpage}
                                    endPage={endpage} onPageChange={onPageChange}/>

                    </div>
                </div>
            </div>
        );
    }

    export default BoardList;
