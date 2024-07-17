import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Gettotalstar from "../detail/Gettotalstar";

function Newlist({ movie, id }) {
  const [newlist, setnewlist] = useState([]);
  const [load, setloda] = useState(true);
  const nav = useNavigate();

  const kindWrapRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const [translate, setTranslate] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    setnewlist(movie);
    setloda(false);
  }, [movie]);

  function moveSlide(event, direction) {
    event.preventDefault();
    let newTranslate = translate;
    const liWidth = 232;
    const gap = 20;
    const moveDistance = liWidth + gap;

    if (direction === "next" && currentIdx < newlist.length - 5) {
      newTranslate -= moveDistance;
      setCurrentIdx((prevIdx) => prevIdx + 1);
      setShowPrev(true);
      setShowNext(currentIdx + 1 < newlist.length - 5);
    } else if (direction === "prev" && currentIdx > 0) {
      newTranslate += moveDistance;
      setCurrentIdx((prevIdx) => prevIdx - 1);
      setShowPrev(currentIdx - 1 > 0);
      setShowNext(true);
    }

    setTranslate(newTranslate);
  }

  return (
    <div style={{ position: "relative" }}>
      {load ? (
        <h1>loda...</h1>
      ) : (
        <div style={{ position: "relative" }}>
          <div className="kind_wrap" ref={kindWrapRef}>
            <div className="kind_slider">
              <ul className="slider" style={{ transform: `translateX(${translate}px)` }}>
                {newlist.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      nav(`/detail/${item.movie_id}`);
                    }}
                  >
                    <a>
                      {item.poster_path === "default_poster_url_here" ? <img src="/image/postrer.png" alt="포스터" /> : <img src={item.poster_path} alt="포스터" />}
                      <div>
                        <h3 className="movieTitle">{item.kr_title}</h3>
                        <Gettotalstar movie_id={item.movie_id} />
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="arrow">
            {showPrev && (
              <a href="#" className="prev" onClick={(e) => moveSlide(e, "prev")}>
                &lt;
              </a>
            )}
            {showNext && (
              <a href="#" className="next" onClick={(e) => moveSlide(e, "next")}>
                &gt;
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Newlist;
