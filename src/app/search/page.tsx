//services
import { searchMovieAPI, searchTvAPI } from "services/themoviedb";

//components
import { Banner, Results } from "components/app/Search";

export default async function SearchPage(props: any) {
  const { searchParams } = props;

  let movies = null;
  let tvs = null;

  if (searchParams.query) {
    try {
      const data_movies = await searchMovieAPI(searchParams.query);
      movies = data_movies.results;
      const data_tvs = await searchTvAPI(searchParams.query);
      tvs = data_tvs.results;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div style={{ height: "65px" }} />
      <Banner movies={movies!} tvs={tvs!} />
      <Results movies={movies!} tvs={tvs!} />
    </>
  );
}
