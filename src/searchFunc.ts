import axios from "axios";
interface searchParams{
    query: string;
    page: number;
}


const myKey = import.meta.env.VITE_TMDB_TOKEN;

export async function searchMovie({query, page}: searchParams) {
  console.log([query, page]);
  
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${myKey}`
      }
    }
  );

  return response.data;
}


export default searchMovie;