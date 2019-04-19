export interface AuthResponse {
  user: {
    id: number,
    name: string,
    email: string,
    //expires_in: number
  },
  token: string,

}
