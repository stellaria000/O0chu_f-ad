import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NewMovie from "../new/NewMovie 2";
import Suggestion from "../o0chu/Suggestion";
import Header from "../nav/Header";
import Footer from "../footer/Footer";
import Cookies from "js-cookie";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import Auth from "../hoc/auth";
import ScrollToTopButton from "../scrolltop/ScrolltoptoButton";
import ScrollToQuestion from "../scrolltop/ScrolltoQuestion";
import Action from "./Mainlist";
import { useNavigate } from "react-router-dom";

// import OcheMovie from "./OchuMovie";

function List() {
  // 장르 선택
  const [selectedGenre, setSelectedGenre] = useState("오영추");

  // 장르 클릭 핸들러
  const handleGenreClick = (genre) => {
    document.location.href = `/movies/list/${genre}?genre=${genre}`;
  };

  const user = useSelector((state) => state.user);
  const [nickname, setNickname] = useState("");
  const nav = useNavigate();

  const shouldRenderSuggestion = user && user.userData && user.userData.role !== "1";

  // 컴포넌트 마운트 시 쿼리 파라미터로부터 장르 읽기
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const genreFromQuery = urlParams.get("genre");
    if (genreFromQuery) {
      setSelectedGenre(genreFromQuery);
    }
  }, []);

  useEffect(() => {
    if (user !== undefined && user.userData !== undefined) {
      setNickname(user.userData.nickname);
    }
  });

  return (
    <div>
      <Header />
      <div className="listWrap webSize">
        {shouldRenderSuggestion && user && user.userData && user.userData.isAuth ? (
          <h5 className="cateTitle marT_20">{nickname}님을 위한 영화</h5>
        ) : user && user.userData && user.userData.role === "1" ? null : (
          <h5 className="cateTitle marT_20">추천 영화</h5>
        )}

        {shouldRenderSuggestion && user && user.userData && user.userData.isAuth ? (
          <Suggestion />
        ) : !user || !user.userData || !user.userData.isAuth ? (
          <div className="loadBox">로그인 후 이용 가능한 서비스 입니다.</div>
        ) : null}

        {shouldRenderSuggestion}
        <h5 className="cateTitle">New</h5>
        <NewMovie></NewMovie>

        <p className="manu_p">
          <h5 className="cateTitle">액션</h5>{" "}
          <button
            onClick={() => {
              handleGenreClick("액션");
              // window.location.href = "/movies/list/액션";
            }}
          >
            +more
          </button>
        </p>
        <Action genres="액션" />

        <p className="manu_p">
          <h5 className="cateTitle">애니메이션</h5>{" "}
          <button
            onClick={() => {
              handleGenreClick("애니메이션");
              // window.location.href = "/movies/list/애니메이션";
            }}
          >
            +more
          </button>
        </p>
        <Action genres="애니메이션" />
        <p className="manu_p">
          <h5 className="cateTitle">공포 / 스릴러</h5>{" "}
          <button
            onClick={() => {
              handleGenreClick("공포 스릴러");
              // window.location.href = "/movies/list/공포 스릴러";
            }}
          >
            +more
          </button>
        </p>
        <Action genres="공포 스릴러" />
        <p className="manu_p">
          <h5 className="cateTitle">범죄</h5>{" "}
          <button
            onClick={() => {
              handleGenreClick("범죄");
              // window.location.href = "/movies/list/범죄";
            }}
          >
            +more
          </button>
        </p>
        <Action genres="범죄" />

        <p className="manu_p">
          <h5 className="cateTitle">코미디</h5>{" "}
          <button
            onClick={() => {
              handleGenreClick("코미디");
              // window.location.href = "/movies/list/코미디";
            }}
          >
            +more
          </button>
        </p>
        <Action genres="코미디" />
        <p className="manu_p">
          <h5 className="cateTitle">멜로 / 드라마</h5>{" "}
          <button
            onClick={() => {
              handleGenreClick("멜로 드라마");
              // window.location.href = "/movies/list/멜로 드라마";
            }}
          >
            +more
          </button>
        </p>
        <Action genres="멜로 드라마" />
        <div className="scroll-to-div">
          <ScrollToQuestion />
          <ScrollToTopButton />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Auth(List, false);
