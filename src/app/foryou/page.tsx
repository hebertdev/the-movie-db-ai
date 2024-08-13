"use client";

//components
import { Banner } from "components/app/ForYou";
import { useUserContext } from "hooks/useUserContext";
import { useRouter } from "next/navigation";

export default function ForYouPage() {
  const { user } = useUserContext();

  const router = useRouter();

  if (!user) {
    router.push("/");
  }
  return (
    <>
      <div style={{ height: "60px" }} />
      <Banner />
    </>
  );
}
