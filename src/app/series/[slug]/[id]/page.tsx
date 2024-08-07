//services
import { getTvDetailsAPI } from "services/themoviedb";

import { Banner } from "components/app/SerieDetails";

interface SerieDetailsProps {
  params: { id: string };
}

export default async function SerieDetails({ params }: SerieDetailsProps) {
  const { id } = params;
  const data = await getTvDetailsAPI(id);

  return (
    <>
      <div style={{ height: "65px" }} />
      <Banner movie={data} />
    </>
  );
}
