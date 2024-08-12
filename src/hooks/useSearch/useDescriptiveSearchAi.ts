import { useState } from "react";
//actions
import { Message, chatBot } from "app/actions";
import { searchMovieAPI, searchTvAPI } from "services/themoviedb";
import { Movie } from "interfaces/themoviedb";
import { notifications } from "@mantine/notifications";
import { getTokenOpenai } from "helpers/openai";

export interface ModifiedMessage {
  role: "user" | "assistant";
  content: string;
}

export function useDescriptiveSearchAi() {
  const [descriptiveSearchText, setDescriptiveSearchText] =
    useState<string>("");
  const [loadingDescriptiveSearch, setLoadingDescriptiveSearch] =
    useState<boolean>(false);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [modifiedConversation, setModifiedConversation] = useState<any[]>([]);

  const handleSetDescriptiveSearchText = (value: string) => {
    setDescriptiveSearchText(value);
  };

  const handleSubmitChat = async () => {
    if (!getTokenOpenai()) {
      notifications.show({
        title: "Error",
        message: `API Key de OpenAI es requerida`,
        color: "red",
      });
      return;
    }
    if (loadingDescriptiveSearch) return;
    if (descriptiveSearchText.length <= 3) return;
    let message = descriptiveSearchText;
    setDescriptiveSearchText("");

    let user_message = {
      role: "user",
      content: descriptiveSearchText,
    };

    setModifiedConversation((prevModifiedConversation) => [
      ...prevModifiedConversation,
      user_message,
    ]);

    try {
      setLoadingDescriptiveSearch(true);

      const { messages } = await chatBot(
        [...conversation, { role: "user", content: message }],
        getTokenOpenai()!
      );

      setConversation(messages);
      if (messages[messages.length - 1].role === "assistant") {
        let string_content_to_object_content = JSON.parse(
          messages[messages.length - 1].content
        );
        let movies: Movie[] = [];
        if (string_content_to_object_content.movies.length > 0) {
          for (const movie of string_content_to_object_content.movies) {
            try {
              let data;
              let dateProperty: "release_date" | "first_air_date" =
                "release_date";
              if (movie.type === "movie") {
                data = await searchMovieAPI(movie.name);
              } else {
                data = await searchTvAPI(movie.name);
                dateProperty = "first_air_date";
              }
              // Extrae el año de la fecha de lanzamiento de la película o serie
              const movieYear = movie.release_date.split("-")[0];

              // Filtra los resultados por el año de lanzamiento
              const filteredResults = data.results.filter((item) => {
                const date = (item as any)[dateProperty]; // Usa aserción de tipo
                const itemYear = date.split("-")[0];
                return itemYear === movieYear;
              });

              const firstResult = filteredResults[0];
              if (firstResult) {
                movies = [...movies, firstResult];
              }
            } catch (error) {
              console.error("Error fetching movie or TV:", error);
            }
          }
        }
        if (movies.length > 0) {
          let modified_assistant_message = {
            role: "assistant",
            content: JSON.stringify(
              {
                ai_message: string_content_to_object_content.ai_message,
                movies: movies,
                success: string_content_to_object_content.success,
              },
              null,
              2
            ),
          };
          setModifiedConversation((prevModifiedConversation) => [
            ...prevModifiedConversation,
            modified_assistant_message,
          ]);
        } else {
          setModifiedConversation((prevModifiedConversation) => [
            ...prevModifiedConversation,
            {
              role: "assistant",
              content: messages[messages.length - 1].content,
            },
          ]);
        }
      }

      setDescriptiveSearchText("");
    } catch (error) {
      notifications.show({
        title: "Error",
        message: `API Key de OpenAI es requerida`,
        color: "red",
      });
    } finally {
      setLoadingDescriptiveSearch(false);
    }
  };

  const handleClearConversation = () => {
    setModifiedConversation([]);
    setConversation([]);
    setDescriptiveSearchText("");
  };

  return {
    descriptiveSearchText,
    handleSetDescriptiveSearchText,
    handleSubmitChat,
    loadingDescriptiveSearch,
    modifiedConversation,
    handleClearConversation,
  };
}
