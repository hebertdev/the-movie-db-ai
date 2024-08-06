import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

export function useSimpleSearch() {
  const [simpleSearchText, setSimpleSearchText] = useState<string>("");
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = useCallback(() => {
    if (simpleSearchText.length <= 2) return;
    setLoadingSearch(true);
    router.push(`/search?query=${encodeURIComponent(simpleSearchText)}`);
  }, [router, simpleSearchText]);

  const handleSetSimpleSearchText = (text: string) => {
    setSimpleSearchText(text);
  };

  const handleSetLoadingSearch = (value: boolean) => {
    setLoadingSearch(value);
    setSimpleSearchText("");
  };
  return {
    loadingSearch,
    simpleSearchText,
    handleSetSimpleSearchText,
    handleSearch,
    handleSetLoadingSearch,
  };
}
