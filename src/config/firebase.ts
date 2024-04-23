// import { getAnalytics } from 'firebase/analytics'
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCuKV6Z9lsWnjJYdRtZlTSm-G1XBcjkMBQ',
  authDomain: 'miracle-play-estack.firebaseapp.com',
  projectId: 'miracle-play-estack',
  storageBucket: 'miracle-play-estack.appspot.com',
  messagingSenderId: '360997083689',
  appId: '1:360997083689:web:8d90ce138ab43b7bf79a38',
  measurementId: 'G-B303K5SNSP',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const auth = getAuth(app)

// const analytics = getAnalytics(app)

// Get a list of cities from your database
// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
//   }

export { app, auth, db }
