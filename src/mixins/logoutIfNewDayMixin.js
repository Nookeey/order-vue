import db from '../firebase/init'
import firebase from 'firebase'
import moment from 'moment'

export default {
  created () {
    let user = firebase.auth().currentUser
    if (user) {
      let ref = db.collection('admin').doc('admin')
      ref.get().then(doc => {
        if (doc.exists) {
          if (doc.data().timestamp !== moment(this.timestamp).format('l')) {
            firebase.auth().signOut().then(() => {
              this.$router.push({ name: 'Login' })
            })
          }
        }
      })
    }
  }
}
