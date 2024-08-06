"use client";

import { FormEvent, KeyboardEvent, useEffect, useState } from "react";

//helpers
import { setValue, getValue } from "helpers/segmentBannerHome";

//hooks
import {
  useDescriptiveSearchAi,
  useRecommendationAi,
  useSimpleSearch,
} from "hooks/useSearch";

//components
import { SvgAi } from "./SvgAi";

//mantineui
import { Box, Container, Button, SegmentedControl } from "@mantine/core";

//styles
import classes from "./Banner.module.css";
import { ButtonModalRecommendation } from "./ButtonModalRecommendation";
import { ButtonModalDescriptiveSearch } from "./ButtonModalDescriptiveSearch";

export function Banner() {
  const [segment, setSegment] = useState<string>("1");

  useEffect(() => {
    const savedSegment = getValue();
    if (savedSegment) {
      setSegment(savedSegment);
    }
  }, []);

  const handleSetSegment = (value: string) => {
    setSegment(value);
    if (value === "1") {
      setValue("1");
    }
    if (value === "2") {
      setValue("2");
    }
    if (value === "3") {
      setValue("3");
    }
  };

  const {
    handleSetSearchText,
    handleGenerate,
    modifiedAiResponse,
    searchText,
    loading,
    handleClearRecommendation,
  } = useRecommendationAi();

  const {
    simpleSearchText,
    handleSetSimpleSearchText,
    loadingSearch,
    handleSearch,
  } = useSimpleSearch();

  const {
    descriptiveSearchText,
    handleSetDescriptiveSearchText,
    handleSubmitChat,
    modifiedConversation,
    loadingDescriptiveSearch,
    handleClearConversation,
  } = useDescriptiveSearchAi();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (segment === "1") {
      handleGenerate();
    } else if (segment === "2") {
      handleSearch();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (segment === "1") {
        handleGenerate();
      }

      if (segment === "2") {
        handleSubmitChat();
      }

      if (segment === "3") {
        handleSearch();
      }
    }
  };

  return (
    <Box className={classes.container_general}>
      <Container size={"xl"}>
        <Box className={classes.container_all}>
          <Box className={classes.container_info}>
            <Box
              className={classes.container_box}
              component="form"
              onSubmit={(event) => handleSubmit(event)}
            >
              <div className={classes.container_svg}>
                <SvgAi />
              </div>
              <div className={classes.container_text_textarea}>
                <SegmentedControl
                  value={segment}
                  onChange={handleSetSegment}
                  data={[
                    { label: "Exprésate", value: "1" },
                    {
                      label: "Busqueda descriptiva",
                      value: "2",
                    },
                    { label: "Busqueda normal", value: "3" },
                  ]}
                />
                <p className={classes.title_ai + " title"}>
                  {segment === "1"
                    ? "Descubre peliculas según tus gustos y preferencias."
                    : segment === "2"
                    ? "Si olvidaste el nombre de una película, prueba buscar usando detalles importantes de la trama o momentos clave que recuerdes."
                    : "Buscar una película o serie de televisión."}
                </p>
                {segment === "1" && (
                  <div className={classes.container_txt}>
                    <textarea
                      value={searchText}
                      onChange={(e) => handleSetSearchText(e.target.value)}
                      placeholder={"Películas que inspiran a ser programador."}
                      className={classes.textarea_ai}
                      rows={3}
                      onKeyDown={handleKeyDown}
                    />
                    <span className={classes.span_txt}>
                      <small> {searchText.length} /120</small>
                    </span>
                  </div>
                )}
                {segment === "2" && (
                  <textarea
                    value={descriptiveSearchText}
                    onChange={(e) =>
                      handleSetDescriptiveSearchText(e.target.value)
                    }
                    placeholder={
                      "Son dos policias que luchan contra terroristas en la ciudad de Miami."
                    }
                    className={classes.textarea_ai}
                    rows={3}
                    onKeyDown={handleKeyDown}
                  />
                )}

                {segment === "3" && (
                  <textarea
                    value={simpleSearchText}
                    onChange={(e) => handleSetSimpleSearchText(e.target.value)}
                    placeholder={"Harry Potter."}
                    className={classes.textarea_ai}
                    rows={3}
                    onKeyDown={handleKeyDown}
                  />
                )}

                {segment === "1" ? (
                  <ButtonModalRecommendation
                    loading={loading}
                    handleGenerate={handleGenerate}
                    modifiedAiResponse={modifiedAiResponse}
                    handleClearRecommendation={handleClearRecommendation}
                  />
                ) : segment === "2" ? (
                  <ButtonModalDescriptiveSearch
                    descriptiveSearchText={descriptiveSearchText}
                    handleSetDescriptiveSearchText={
                      handleSetDescriptiveSearchText
                    }
                    handleSubmitChat={handleSubmitChat}
                    modifiedConversation={modifiedConversation}
                    handleClearConversation={handleClearConversation}
                    loadingDescriptiveSearch={loadingDescriptiveSearch}
                  />
                ) : (
                  <Button
                    variant="filled"
                    loading={loadingSearch}
                    type="submit"
                  >
                    Buscar película
                  </Button>
                )}
              </div>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
