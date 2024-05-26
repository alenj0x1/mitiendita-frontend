import { jwtDecode } from "jwt-decode"

export default class ManageToken {
  public findToken(): string|null {
    return localStorage.getItem('token')
  }

  public deleteToken(): void {
    localStorage.removeItem('token')
  }

  public decodedToken(): any {
    const token = this.findToken();

    if (token) {
      return jwtDecode<{ nameid: string; role: string}>(token)
    }

    return 0
  }
}