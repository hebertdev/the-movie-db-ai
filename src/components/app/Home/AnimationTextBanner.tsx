"use client";

import React, { useEffect, useState } from "react";
import { Box, Text } from "@mantine/core";
import classes from "./Banner.module.css";

export function AnimationTextBanner() {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const [hashtagsStyles, setHashtagsStyles] = useState<
    Record<number, React.CSSProperties>
  >({});
  const scrollLimit = 50;
  const scrollLowerLimit = 10;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition < scrollLowerLimit) {
        // Si el scroll vuelve a 0, reinicia la visibilidad y los estilos de los hashtags
        setVisibleIndexes([]);
        setHashtagsStyles({});
        return;
      }

      // Calcula cuántos elementos deben ser visibles en función de la posición de desplazamiento
      const visibleCount =
        Math.floor((scrollPosition - scrollLowerLimit) / scrollLimit) + 1;

      // Genera un array con los índices de los elementos visibles, asegurándose de no superar la cantidad de hashtags
      const indexes = Array.from(
        { length: Math.min(visibleCount, hashtags.length) },
        (_, index) => index
      );

      // Genera estilos para nuevos hashtags y actualiza el estado
      const newStyles: Record<number, React.CSSProperties> = {};
      indexes.forEach((index) => {
        if (!hashtagsStyles[index]) {
          newStyles[index] = {
            fontSize: `${Math.floor(Math.random() * 30) + 10}px`,
            transform: `rotate(${Math.random() * 30 - 10}deg)`,
            background: `linear-gradient(45deg, ${getRandomColor()}, ${getRandomColor()})`,
            WebkitBackgroundClip: "text",
            color: "transparent",
          };
        }
      });

      setHashtagsStyles((prevStyles) => ({ ...prevStyles, ...newStyles }));
      setVisibleIndexes(indexes);
    };

    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hashtagsStyles]);
  return (
    <Box className={classes.contianer_hashtag}>
      {visibleIndexes.map((index) => (
        <Text key={index} style={hashtagsStyles[index]}>
          #{hashtags[index]}
        </Text>
      ))}
    </Box>
  );
}

const hashtags = [
  // JavaScript
  "JavaScript",
  "React",
  "Nextjs",
  "Nodejs",

  // Python
  "Python",
  "Django",

  // Web Development
  "WebDevelopment",
  "Frontend",
  "Backend",
  "API",
  "GraphQL",
  "RESTful",
  "Serverless",
  "Database",
  "ORM",

  // Databases
  "SQL",
  "MySQL",
  "PostgreSQL",
  "Redis",

  // Other Technologies and Concepts
  "FullStack",
  "AWS",
  "Firebase",
  "Authentication",
  "Authorization",
  "Testing",
  "ContinuousIntegration",
  "Deployment",
  "Scalability",
];
