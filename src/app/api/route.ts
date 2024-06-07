import Service from './service'

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
// export namespace TestApi {
//   export const getPhotos = async () => {
//     const url = `${TEST_API_PATH}/photos`
//     return fetch(url).then((res) => res.json())
//   }
// }

// export default queryKeys
