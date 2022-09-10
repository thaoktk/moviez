import axiosClient from "./axiosClient";

const getDataFilm = async (typeSearch, id) => {
  const res = await Promise.all([
    axiosClient.get(`/${typeSearch}/${id}`),
    axiosClient.get(`/${typeSearch}/${id}/credits`),
    axiosClient.get(`/${typeSearch}/${id}/videos`),
    axiosClient.get(`/${typeSearch}/${id}/similar`),
  ]);
  const filmDetail = res.reduce((acc, curr, index) => {
    switch (index) {
      case 0:
        acc.detail = { ...curr.data };
        break;
      case 1:
        acc.credits = curr.data.cast.slice(0, 8);
        break;
      case 2:
        acc.trailer = curr.data.results.find((result) => {
          return result.type === "Trailer";
        });
        break;
      case 3:
        acc.similar = curr.data.results.slice(0, 15);
        break;
      default:
        break;
    }
    return acc;
  }, {});

  return filmDetail;
};

const getTvVideo = async (seasons, id) => {
  if (seasons) {
    const episodeList = seasons.map(async (season) => {
      const result = await axiosClient.get(
        `/tv/${id}/season/${season.season_number}`
      );
      return {
        ...season,
        episodes: result.data.episodes,
      };
    });

    return episodeList;
  }
};

const getBannerHome = async (type) => {
  if (type === "movie") {
    const res = await axiosClient.get(`/${type}/now_playing`);
    return res.data.results;
  } else {
    const res = await axiosClient.get(`/${type}/airing_today`);
    return res.data.results;
  }
};

const getListFilmHome = async (type, paramSearch) => {
  if (paramSearch === "trending") {
    const res = await axiosClient.get(`/${paramSearch}/${type}/week`);
    return res.data.results;
  } else {
    const res = await axiosClient.get(`/${type}/${paramSearch}`);
    return res.data.results;
  }
};

const getResultSearch = async (valueDebounce) => {
  if (valueDebounce) {
    const res = await axiosClient.get("/search/keyword", {
      params: {
        query: valueDebounce,
      },
    });

    return res.data.results;
  }
};

const getFilmSearch = async (valueSearch, page) => {
  if (valueSearch) {
    const res = await axiosClient.get("/search/multi", {
      params: {
        query: valueSearch,
        page,
      },
    });
    return {
      results: res.data.results.filter(
        (result) => result.media_type !== "person"
      ),
      total_pages: res.data.total_pages,
    };
  }
};

const getAllGenresByType = async (type) => {
  const res = await axiosClient.get(`/genre/${type}/list`);
  return res.data.genres;
};

const getFilmsByGenres = async (type, genres, page) => {
  if (genres) {
    const res = await axiosClient.get(`/discover/${type}`, {
      params: {
        with_genres: genres.toString(),
        page,
      },
    });
    return {
      results: res.data.results,
      total_pages: res.data.total_pages,
    };
  }
};

const getListFilmsProfile = async (films) => {
  if (films) {
    const results = films.map(async (film) => {
      const result = await axiosClient.get(`/${film.type}/${film.filmId}`);
      return { ...result.data, media_type: film.type };
    });

    return results;
  }
};

export {
  getBannerHome,
  getListFilmHome,
  getDataFilm,
  getTvVideo,
  getResultSearch,
  getFilmSearch,
  getAllGenresByType,
  getFilmsByGenres,
  getListFilmsProfile,
};
