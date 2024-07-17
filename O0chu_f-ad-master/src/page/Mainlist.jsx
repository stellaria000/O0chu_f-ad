import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../config/api";
import Newlist from "../new/Newlist";
import Loading from "../loading/Loading";

const Action = ({ genres }) => {
  const [action, setaction] = useState([]);
  const [loading, setLoading] = useState(true);

  const a = "액션";

  useEffect(() => {
    axios
      .get(`${api}/api/movie/main/list/?genres=${genres}`)
      .then((res) => {
        setaction(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div>{loading ? <Loading /> : <Newlist movie={action} />}</div>;
};

export default Action;
