import Service from '../'

const API_PATH: string = 'http://43.200.33.31:3000'

class AuthService extends Service {
  constructor(url: string) {
    super(url)
  }

  signIn(walletAddress: string, verifyValue: string) {
    return this.http.post<any[]>('/user/auth/login', { walletAddress, verifyValue })
  }
}

export default new AuthService(API_PATH)
