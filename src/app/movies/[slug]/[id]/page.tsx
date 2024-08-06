//services
import { getMovieDetailsAPI } from "services/themoviedb";

import { Banner } from "components/app/MovieDetails";

interface MovieDetailsProps {
  params: { id: string };
}

export default async function MovieDetails({ params }: MovieDetailsProps) {
  const { id } = params;
  const data = await getMovieDetailsAPI(id);

  return (
    <>
      <div style={{ height: "65px" }} />
      <Banner movie={data} />
    </>
  );
}
