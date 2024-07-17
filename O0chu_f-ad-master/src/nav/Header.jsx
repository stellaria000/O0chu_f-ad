import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Container, FormControl, Form, InputGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandBackFist, faFaceLaugh, faFaceGrimace, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faGun, faTv, faFrog, faStar, faFile, faThumbsUp, faUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import MyModal from "../modal/MyModal";
import axios from "axios";

import Search from "./Search";
import Auth from "../hoc/auth";

import { useDispatch, useSelector } from "react-redux";
import { click } from "../_actions/click_action";
import { api } from "../config/api";
// import { get } from "http";

function Header() {
  // 장르 선택
  const [selectedGenre, setSelectedGenre] = useState("오영추");

  // 장르 클릭 핸들러
  const handleGenreClick = (genre) => {
    dispath(click(window.scrollY));
    document.location.href = `/movies/list/${genre}?genre=${genre}`;
  };
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const dispath = useDispatch();
  const [role, setRole] = useState(null);
  const nav = useNavigate();

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const user = useSelector((state) => state.user);

  // 컴포넌트 마운트 시 쿼리 파라미터로부터 장르 읽기
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const genreFromQuery = urlParams.get("genre");
    if (genreFromQuery) {
      setSelectedGenre(genreFromQuery);
    }
  }, []);

  useEffect(() => {
    if (user !== undefined && user.userData && user.userData.isAuth) {
      setNickname(user.userData.nickname);
      setRole(user.userData.role);
      setIsLoggedIn(true);
    }
  });

  const handleLoginClick = () => {
    nav("/login");
  };

  const handleLogout = (event) => {
    Cookies.remove("token");
    event.preventDefault();

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.clear();
    window.location.reload();
    //캐시

    setIsLoggedIn(false);
  };

  const handleMovieAddClick = () => {
    setModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    const data = {
      SERACH_QUERY: searchQuery,
    };

    // 'searchQuery' 변수를 'SEARCH_QUERY'로 전달
    axios
      .get(`${api}/api/search?SEARCH_QUERY=${searchQuery}`)
      .then((response) => {
        if (response.data === "검색 성공!") {
          setModalMessage("영화 정보가 저장되었습니다!");
        } else {
          setModalMessage("제목을 다시 확인해주세요");
        }
        setModalOpen(true);

        setTimeout(() => {
          setModalMessage("");
        }, 2000);
        console.log(response);
      })
      .catch((error) => {
        console.error("에러 발생: ", error);
        setModalMessage("이미 존재하는 영화입니다!");

        setTimeout(() => {
          setModalMessage("");
        }, 2000);
      });
  };

  const handleTrashClick = () => {
    nav("/trash");
  };

  return (
    <div>
      <Navbar bg="" expand="lg" className="webSize">
        <Container className="mo_dis_ju_c">
          <Link to="/">
            <Navbar.Brand>
              <img src="/image/logo2.png" alt="Logo" />
            </Navbar.Brand>
          </Link>

          <Navbar.Collapse id="basic-navbar-nav" className="rigth mo_dis_bl">
            <Nav className="ml-auto">
              <Search />
              {!isLoggedIn ? (
                <Button variant="outline-success" onClick={handleLoginClick}>
                  Login
                </Button>
              ) : (
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle className="greenButton">
                    <FontAwesomeIcon icon={faUser} />
                  </DropdownToggle>
                  <DropdownMenu className="drop">
                    {role !== "1" && (
                      <DropdownItem
                        onClick={() => {
                          nav(`/mypage`);
                        }}
                      >
                        MyPage
                      </DropdownItem>
                    )}
                    {role === "1" && <DropdownItem onClick={handleMovieAddClick}>영화추가</DropdownItem>}
                    <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MyModal
        open={modalOpen}
        width={500}
        title="영화 추가"
        onCancel={() => setModalOpen(false)}
        text={[<input type="text" placeholder="영화 제목을 입력하세요" className="modaltext" onChange={handleSearchChange}></input>]}
        onAddClick={handleSearchClick}
        modalMessage={modalMessage}
      />

      <Navbar bg="" expand="lg" style={{ borderBottom: "2px solid green" }}>
        <Container className="cu_nav">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="center-collapse">
            <Nav className="center">
              <Nav.Link
                className={selectedGenre === "오영추" && !location.pathname.includes("/detail") ? "nav-link activeLink" : "nav-link"}
                onClick={(event) => {
                  event.preventDefault();
                  dispath(click(window.scrollY));
                  setSelectedGenre("오영추");
                  nav("/");
                }}
              >
                <FontAwesomeIcon icon={faThumbsUp} activeClassName="onActive" />
                오영추
              </Nav.Link>

              <Nav.Link
                className={selectedGenre === "액션" ? "nav-link activeLink" : "nav-link"}
                onClick={(event) => {
                  const a = "액션";
                  event.preventDefault();
                  dispath(click(window.scrollY));
                  handleGenreClick("액션");
                  // document.location.href = "/movies/list/" + a;
                  // nav(`/movies/list/${a}`);
                }}
              >
                <FontAwesomeIcon icon={faHandBackFist} />
                액션
              </Nav.Link>
              <Nav.Link
                className={selectedGenre === "애니메이션" ? "nav-link activeLink" : "nav-link"}
                onClick={(event) => {
                  const a = "애니메이션";

                  dispath(click(window.scrollY));
                  handleGenreClick("애니메이션");
                  // document.location.href = "/movies/list/" + a;

                  // nav(`/movies/list/${a}`);
                }}
              >
                <FontAwesomeIcon icon={faFrog} />
                애니메이션
              </Nav.Link>
              <Nav.Link
                className={selectedGenre === "공포 스릴러" ? "nav-link activeLink" : "nav-link"}
                onClick={(event) => {
                  const a = "공포 스릴러";

                  dispath(click(window.scrollY));
                  handleGenreClick("공포 스릴러");
                  // document.location.href = "/movies/list/" + a;

                  // nav(`/movies/list/${a}`);
                }}
              >
                <FontAwesomeIcon icon={faFaceGrimace} />
                공포 | 스릴러
              </Nav.Link>
              <Nav.Link
                className={selectedGenre === "범죄" ? "nav-link activeLink" : "nav-link"}
                onClick={(event) => {
                  const a = "범죄";

                  dispath(click(window.scrollY));
                  handleGenreClick("범죄");

                  // nav(`/movies/list/${a}`);
                  // document.location.href = "/movies/list/" + a;
                }}
              >
                <FontAwesomeIcon icon={faGun} />
                범죄
              </Nav.Link>
              <Nav.Link
                className={selectedGenre === "코미디" ? "nav-link activeLink" : "nav-link"}
                onClick={(event) => {
                  const a = "코미디";
                  event.preventDefault();
                  dispath(click(window.scrollY));
                  handleGenreClick("코미디");
                  // nav(`/movies/list/${a}`);
                  // document.location.href = "/movies/list/" + a;
                }}
              >
                <FontAwesomeIcon icon={faFaceLaugh} />
                코미디
              </Nav.Link>
              <Nav.Link
                className={selectedGenre === "로맨스" ? "nav-link activeLink" : "nav-link"}
                onClick={(event) => {
                  const a = "로맨스";
                  event.preventDefault();
                  dispath(click(window.scrollY));
                  handleGenreClick("로맨스");
                  // nav(`/movies/list/${a}`);
                  // document.location.href = "/movies/list/" + a;
                }}
              >
                <FontAwesomeIcon icon={faHeart} />
                로맨스
              </Nav.Link>
              <Nav.Link
                className={selectedGenre === "멜로 드라마" ? "nav-link activeLink" : "nav-link"}
                onClick={(event) => {
                  const a = "멜로 드라마";
                  event.preventDefault();
                  dispath(click(window.scrollY));
                  handleGenreClick("멜로 드라마");
                  // nav(`/movies/list/${a}`);
                  // document.location.href = "/movies/list/" + a;
                }}
              >
                <FontAwesomeIcon icon={faTv} />
                멜로 | 드라마
              </Nav.Link>

              {role === "1" ? (
                <>
                  <Nav.Link onClick={handleTrashClick}>
                    <FontAwesomeIcon icon={faTrash} activeClassName="onActive" />
                    휴지통
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    className={selectedGenre === "wishlist" ? "nav-link activeLink" : "nav-link"}
                    onClick={() => {
                      handleGenreClick("wishlist");
                    }}
                  >
                    <FontAwesomeIcon icon={faStar} />찜
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
