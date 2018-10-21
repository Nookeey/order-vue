import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAAutIPeY93hTq_e1Ut4osRPO6yMWLhI8c',
  authDomain: 'order-nh-x.firebaseapp.com',
  databaseURL: 'https://order-nh-x.firebaseio.com',
  projectId: 'order-nh-x',
  storageBucket: 'order-nh-x.appspot.com',
  messagingSenderId: '197639519083'
}
const firebaseApp = firebase.initializeApp(config)
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()
