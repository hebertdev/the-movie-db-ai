"use client";

import { FormEvent, KeyboardEvent, useEffect, useState } from "react";

//helpers
import { setValue, getValue } from "helpers/segmentBannerHome";
import { urlImageW1900 } from "helpers/images";

//hooks
import {
  useDescriptiveSearchAi,
  useRecommendationAi,
  useSimpleSearch,
} from "hooks/useSearch";

//components
import { SvgAi } from "./SvgAi";

//mantineui
import {
  Box,
  Container,
  Button,
  SegmentedControl,
  useMantineTheme,
} from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";

//styles
import classes from "./Banner.module.css";
import { ButtonModalRecommendation } from "./ButtonModalRecommendation";
import { ButtonModalDescriptiveSearch } from "./ButtonModalDescriptiveSearch";
import { PopularData } from "interfaces/themoviedb";

export function Banner({ data }: { data: PopularData }) {
  const [segment, setSegment] = useState<string>("1");
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const url_image = urlImageW1900(data.results[0].backdrop_path);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (segment === "1") {
      handleGenerate();
    } else if (segment === "3") {
      handleSearch();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (segment === "1") {
        handleGenerate();
      }

      if (segment === "3") {
        handleSearch();
      }
    }
  };

  return (
    <Box className={classes.container_general}>
      {/* Este div se usará como fondo */}
      <Box
        className={classes.background_image}
        style={{
          backgroundImage: `url(${url_image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

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
                    { label: "Busqueda normal", value: "3" },
                  ]}
                  size={mobile ? "xs" : "sm"}
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
                    <span
                      className={classes.span_txt}
                      style={{ color: "white" }}
                    >
                      <small> {searchText.length} /120</small>
                    </span>
                  </div>
                )}

                {segment === "3" && (
                  <textarea
                    value={simpleSearchText}
                    onChange={(e) => handleSetSimpleSearchText(e.target.value)}
                    placeholder={"Harry Potter."}
                    className={classes.textarea_ai}
                    rows={1}
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
