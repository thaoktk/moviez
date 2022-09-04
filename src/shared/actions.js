import axiosClient from "./axiosClient";

const getDataFilm = async (typeSearch, id, setFilm) => {
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
        acc.trailer = curr.data.results.find(
          (result) =>
            result.type === "Trailer" && result.name === "Official Trailer"
        );
        break;
      case 3:
        acc.similar = curr.data.results.slice(0, 15);
        break;
      default:
        break;
    }
    return acc;
  }, {});
  setFilm(filmDetail);
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

export { getDataFilm, getTvVideo };
