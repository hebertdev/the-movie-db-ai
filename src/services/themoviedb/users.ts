import { axiosInstance } from "helpers/axios";

//interfaces
import {
  NewTokenAuthenticationData,
  ValidateTokenAuthenticationData,
  NewSessionAuthenticationData,
  UserData,
} from "interfaces/themoviedb";

export async function newTokenAuthentication() {
  const { data } = await axiosInstance.get<NewTokenAuthenticationData>(
    "/authentication/token/new"
  );
  return data;
}

export async function validateTokenAuthenticationData({
  username,
  password,
  request_token,
}: {
  username: string;
  password: string;
  request_token: string;
}) {
  const { data } = await axiosInstance.post<ValidateTokenAuthenticationData>(
    `/authentication/token/validate_with_login`,
    {
      username: username,
      password: password,
      request_token: request_token,
    }
  );
  return data;
}

export async function newSessionAuthenticationData(token: string) {
  const { data } = await axiosInstance.post<NewSessionAuthenticationData>(
    "authentication/session/new",
    {
      request_token: token,
    }
  );
  return data;
}

export async function getUserDataAPI() {
  const { data } = await axiosInstance.get<UserData>(`/account`);
  return data;
}

export async function deleteSessionAPI() {
  const { data } = await axiosInstance.delete(`/authentication/session`);
  return data;
}
