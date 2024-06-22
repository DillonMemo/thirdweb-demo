import Service from '../'

const API_PATH: string = 'http://43.200.33.31:3000'

export type SignInResponse = {
  userSeq: number
  nickName: string
  profileUrl?: string
  refreshToken: string
  accessToken: string
}

export type ProfileImageUploadResponse = {
  profileUrl: string
}

export type RefreshTokenResponse = Partial<Pick<SignInResponse, 'refreshToken'>> &
  Pick<SignInResponse, 'accessToken'>

class AuthService extends Service {
  constructor(url: string) {
    super(url)
  }

  signIn(walletAddress: string, verifyValue: string) {
    return this.http.post<SignInResponse>('/user/auth/login', { walletAddress, verifyValue })
  }

  refreshToken(refreshToken: SignInResponse['refreshToken']) {
    return this.http.patch<RefreshTokenResponse>('/user/auth/refresh/token', undefined, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
  }

  profileImageUpload(formData: FormData) {
    return this.http.put<Required<Pick<SignInResponse, 'profileUrl'>>>('/user/image', formData)
  }

  editNickName(nickName: SignInResponse['nickName']) {
    return this.http.put('/user/nick-name', { nickName })
  }
}

export default new AuthService(API_PATH)
