import { FILM_URL, IMAGE_URL } from "./constant";

const translateError = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already in use!";
    case "auth/user-not-found":
      return "Your email may be incorrect!";
    case "auth/wrong-password":
      return "Your password is wrong!";
    case "auth/invalid-email":
      return "Your email is invalid!";
    default:
      return "Something went wrong!";
  }
};

const getImage = (size = "original", path) => `${IMAGE_URL}/${size}${path}`;

const getMovieEmbed = (id) => `${FILM_URL}/movie?id=${id}`;

const getTvEmbed = (id, season, episode) =>
  `${FILM_URL}/tv?id=${id}&s=${season}&e=${episode}`;

export { translateError, getImage, getMovieEmbed, getTvEmbed };
