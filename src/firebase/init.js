import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAXNfjQE0zVekqCIQmvSL3m8oVVWd3iUbY',
  authDomain: 'order-nh.firebaseapp.com',
  databaseURL: 'https://order-nh.firebaseio.com',
  projectId: 'order-nh',
  storageBucket: '',
  messagingSenderId: '296908586054'
}
const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()
