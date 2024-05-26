export default class ManageToken {
  public findToken(): string|null {
    return localStorage.getItem('token')
  }

  public deleteToken(): void {
    localStorage.removeItem('token')
  }
}