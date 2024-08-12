import type { Metadata, ResolvingMetadata } from "next";

//services
import { getMovieDetailsAPI } from "services/themoviedb";

import { Banner, RelatedMovies } from "components/app/MovieDetails";
import { urlImageW1900 } from "helpers/images";

interface MovieDetailsProps {
  params: { id: string };
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const data = await getMovieDetailsAPI(id);

  const images = [urlImageW1900(data.poster_path)] || [];
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data.title,
    description: data.overview,
    openGraph: {
      images: [...images, ...previousImages],
    },
  };
}

export default async function MovieDetails({ params }: MovieDetailsProps) {
  const { id } = params;
  const data = await getMovieDetailsAPI(id);

  return (
    <>
      <div style={{ height: "65px" }} />
      <Banner movie={data} />
      <RelatedMovies movie={data} />
    </>
  );
}
