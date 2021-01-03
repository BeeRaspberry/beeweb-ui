export interface ILoginUser {
  accessToken: string;
  refreshToken: string;
  role: string;
  name: string;
}

export interface LoginUserResponse {
  loginUser: ILoginUser;
}