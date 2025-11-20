import axios from "axios";
interface searchParams{
    topic: string;
    page: number;
}


const myKey = import.meta.env.VITE_TMDB_TOKEN;

export async function searchMovie({topic, page}: searchParams) {
  
  
  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: topic,
        include_adult: false,
        language: "en-US",
        page: page,
      },
      headers: {
        Authorization: `Bearer ${myKey}`
      }
    }
  );
  console.log(response.data);
  
  return response.data;
}


export default searchMovie;