import {Fragment, useEffect} from "react";
import {useState} from "react";
import {useRef} from "react";
import axios from "axios";
function Header() {
        const [id, setId] = useState('');
        const [pwd, setPwd] = useState('');
        const idRef = useRef();
        const pwdRef = useRef();
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [userName, setUserName] = useState('');

        useEffect(() => {
        const sid = sessionStorage.getItem('sid');
        const sname = sessionStorage.getItem('sname');
        if (sid && sname) {
            setIsLoggedIn(true);
            setUserName(sname);
        }
    }, []);

    const login = () => {
        if (id.trim() === '') {
            idRef.current.focus();
            alert('아이디를 입력해주세요');
            return;
        }
        if (pwd.trim() === '') {
            pwdRef.current.focus();
            alert('패스워드를 입력해주세요');
            return;
        }
        let formdata = new FormData();
        formdata.append('id', id);
        formdata.append('pwd', pwd);

        axios.post('http://localhost/member/login', formdata)
            .then(response => {
                if (response.data.result === 'OK') {
                    sessionStorage.setItem('sid', response.data.sid);
                    sessionStorage.setItem('sname', response.data.sname);
                    setIsLoggedIn(true);
                    setUserName(response.data.sname);
                } else {
                    setId('');
                    setPwd('');
                    alert('존재하지않는 아이디 이거나 패스워드가 틀립니다.');
                }
            })
            .catch(error => {
                console.error('로그인 요청 실패:', error);
                alert('로그인 요청에 실패하였습니다.');
            });
    }

    const logout = () => {
        sessionStorage.clear();
        setIsLoggedIn(false);
        setUserName('');
        setPwd('')
        setId('')
        alert('로그아웃 되었습니다.')
    }

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block" id="templatemo_nav_top">
                <div className="container text-light">
                    <div className="w-100 d-flex justify-content-between">
                        <div>
                            <i className="fa fa-envelope mx-2"></i>
                            <a className="navbar-sm-brand text-light text-decoration-none"
                               href="mailto:info@company.com">info@company.com</a>
                            <i className="fa fa-phone mx-2"></i>
                            <a className="navbar-sm-brand text-light text-decoration-none"
                               href="tel:010-020-0340">010-020-0340</a>
                        </div>
                    <div>
                        <a className="text-light" href="https://fb.com/templatemo" target="_blank" rel="sponsored"><i
                            className="fab fa-facebook-f fa-sm fa-fw me-2"></i></a>
                        <a className="text-light" href="https://www.instagram.com/" target="_blank"><i
                            className="fab fa-instagram fa-sm fa-fw me-2"></i></a>
                        <a className="text-light" href="https://twitter.com/" target="_blank"><i
                            className="fab fa-twitter fa-sm fa-fw me-2"></i></a>
                        <a className="text-light" href="https://www.linkedin.com/" target="_blank"><i
                            className="fab fa-linkedin fa-sm fa-fw"></i></a>
                    </div>
                </div>
            </div>
        </nav>
        <nav className="navbar navbar-expand-lg navbar-light shadow">
            <div className="container d-flex justify-content-between align-items-center">

                <a className="navbar-brand text-success logo h1 align-self-center" href="index.html">
                    WellFit
                </a>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                        data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
                    id="templatemo_main_nav">
                    <div className="flex-fill">
                        <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/brand/list">브랜드</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/cloth/list">상품</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/board/list">커뮤니티</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/other/shopping">사이트 외 쇼핑</a>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar align-self-center d-flex">
                        <div className="navbar align-self-center d-flex">
                            {isLoggedIn ? (
                                <div>
                                    <span>{userName}님, 로그인 되었습니다.</span>
                                    <button type="button" className="btn-primary" onClick={logout}
                                            style={{marginLeft: '20px'}}>Logout
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <span>ID&nbsp;&nbsp;&nbsp;<input type="text" size={"15"} value={id}
                                                                     onChange={(e) => setId(e.target.value)}
                                                                     ref={idRef}/></span>
                                    <span style={{marginLeft: '20px', marginRight: '20px'}}>PWD&nbsp;&nbsp;&nbsp;<input
                                        type="password" ref={pwdRef} size={"15"} value={pwd}
                                        onChange={(e) => setPwd(e.target.value)}/></span>
                                    <button type="button" className="btn-primary" onClick={login}>LOGIN</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </nav>
            <div className="modal fade bg-white" id="templatemo_search" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="w-100 pt-1 mb-5 text-right">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form action="" method="get" className="modal-content modal-body border-0 p-0">
                        <div className="input-group mb-2">
                            <input type="text" className="form-control" id="inputModalSearch" name="q"
                                   placeholder="Search ..."/>
                            <button type="submit" className="input-group-text bg-success text-light">
                                <i className="fa fa-fw fa-search text-white"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </Fragment>
)
}

export default Header