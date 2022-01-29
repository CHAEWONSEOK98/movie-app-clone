import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [genres, setGenres] = useState([]);
  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    //console.log(json);
    setLoading((current) => !current);
    setDetails(json.data.movie);
    setGenres(json.data.movie.genres);
  }, [id]);

  useEffect(() => {
    if (id !== "" && id.length > 1) {
      getMovie();
    }
  }, [getMovie, id]);

  //console.log(details);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movie}>
          <img
            src={details.background_image_original}
            alt={details.background_image_original}
            className={styles.movie__main__img}
          />
          <div>{details.title}</div>
        </div>
      )}
    </div>
  );
}

export default Detail;
