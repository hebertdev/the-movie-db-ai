"use client";

import { useState, ReactNode, createContext, useEffect } from "react";

//helpers
import { deleteToken, getToken } from "helpers/auth";

//services
import { getUserData } from "services/themoviedb/users";

//interfaces
import { Movie, UserData } from "interfaces/themoviedb";
import { notifications } from "@mantine/notifications";
import { getFavoriteMoviesAPI, getFavoriteTvAPI } from "services/themoviedb";

export interface UserContextProps {
  user: UserData | null | undefined;
  logout: () => void;
  loadingUser: boolean;
  toggleLoadingUser: (value: boolean) => void;
  handleGetUser: () => void;
  favoriteMovies: Movie[];
  favoriteTvs: Movie[];
  handleGetFavoriteMovies: () => void;
  handleGetFavoriteTvs: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as UserContextProps);

export function UserContextProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserData>();
  const [loadingUser, setLoadingUser] = useState(true);

  const logout = () => {
    deleteToken();
    window.location.href = "/";
  };

  const toggleLoadingUser = (value: boolean) => {
    setLoadingUser(value);
  };

  const handleGetUser = async () => {
    if (!getToken()) return;
    try {
      toggleLoadingUser(true);
      const data = await getUserData();
      setUser(data);
      toggleLoadingUser(false);
    } catch (error) {
      toggleLoadingUser(false);
      notifications.show({
        title: "Error",
        message: `Ocurrió un error al conectarte con infojobs`,
        color: "red",
      });
    }
  };

  const [loadingMovies, setLoadingMovies] = useState(true);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [favoriteTvs, setFavoriteTvs] = useState<Movie[]>([]);

  const handleGetFavoriteMovies = async () => {
    if (!user) return;
    try {
      setLoadingMovies(true);
      const data = await getFavoriteMoviesAPI(user.username);
      setFavoriteMovies(data.results);
      setLoadingMovies(false);
    } catch (error) {
      console.log(error);
      setLoadingMovies(false);
    }
  };

  const handleGetFavoriteTvs = async () => {
    if (!user) return;
    try {
      setLoadingMovies(true);
      const data = await getFavoriteTvAPI(user.username);
      setFavoriteTvs(data.results);
      setLoadingMovies(false);
    } catch (error) {
      console.log(error);
      setLoadingMovies(false);
    }
  };

  useEffect(() => {
    if (user) {
      handleGetFavoriteMovies();
      handleGetFavoriteTvs();
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        loadingUser,
        toggleLoadingUser,
        handleGetUser,
        favoriteMovies,
        favoriteTvs,
        handleGetFavoriteMovies,
        handleGetFavoriteTvs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
