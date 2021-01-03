export class User {
  constructor(
    public email: string,
    public role: string,
    public name: string,
    private _accessToken: string,
    private _refreshToken: string
  ) {}

  get accessToken() {
    return this._accessToken;
  }

  get refreshToken() {
    return this._refreshToken;
  }
}