export interface NewTokenAuthenticationData {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface ValidateTokenAuthenticationData {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface NewSessionAuthenticationData {
  success: boolean;
  session_id: string;
}

export interface UserData {
  avatar: Avatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface Avatar {
  gravatar: Gravatar;
  tmdb: Tmdb;
}

export interface Gravatar {
  hash: string;
}

export interface Tmdb {
  avatar_path: string;
}
