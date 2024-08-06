"use client";

import { useRouter } from "next/navigation";

//hooks
import { useUserContext } from "hooks/useUserContext";

//components
import { Content } from "components/app/Favorites";

export default function FavoritesPage() {
  const { user } = useUserContext();

  const router = useRouter();

  if (!user) {
    router.push("/");
  }

  return (
    <>
      <div style={{ height: "60px" }} />
      <Content />
    </>
  );
}
