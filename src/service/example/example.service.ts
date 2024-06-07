import Service from '../'

const TEST_API_PATH: string = 'https://jsonplaceholder.typicode.com'

class TestService extends Service {
  constructor(url: string) {
    super(url)
  }

  getPhotos() {
    return this.http.get<any[]>('/photos')
  }
}

export default new TestService(TEST_API_PATH)
