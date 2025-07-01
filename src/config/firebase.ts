import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA4bQuh9Y2fDBce0n3zGXHehTpRiGPp91I',
  authDomain: 'plastation136.firebaseapp.com',
  projectId: 'plastation136',
  storageBucket: 'plastation136.firebasestorage.app',
  messagingSenderId: '807118955466',
  appId: '1:807118955466:web:6c4a8a063deaef57df2533',
  measurementId: 'G-PZ1JC0W987',
}

export const app = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(app)
