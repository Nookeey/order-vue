<template>
  <section id="login">
    <div class="container">
      <div class="card">
        <form @submit.prevent="login" class="col s12">
          <div class="card-content">
            <div class="row">
                <div class="row center">
                  <span class="card-title teal-text darken-1">ZALOGUJ SIĘ</span>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="password" type="password" v-model="password">
                    <label for="password">Hasło:</label>
                  </div>
                </div>
            </div>
          </div>
          <div class="card-action center">
            <button type="submit" class="waves-effect waves-light btn teal darken-2">Zaloguj</button>
            <p v-if="feedback" class="red-text">{{ feedback }}</p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import db from '../../firebase/init'
import firebase from 'firebase'
import moment from 'moment'

export default {
  name: 'LoginOrder',
  data () {
    return {
      email: 'ordernh@order.com',
      pass: 'haslo1234',
      password: null,
      feedback: null,
      timestamp: Date.now()
    }
  },
  methods: {
    login () {
      if (this.password) {
        let ref = db.collection('admin').doc('admin')
        ref.get().then(doc => {
          if (doc.exists) {
            if (moment(doc.data().timestamp).format('l') === moment(this.timestamp).format('l')) {
              if (doc.data().password === this.password) {
                firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
                  .then(() => {
                    this.$router.push({ name: 'AdminOrders' })
                  })
                  .catch(err => {
                    console.log(err)
                  })
              } else {
                this.feedback = 'Admin Zajęty! Nieprawidłowe hasło!'
              }
            } else {
              firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
                .then(() => {
                  ref.set({
                    password: this.password,
                    timestamp: moment(Date.now()).format('l')
                  })
                })
                .then(() => {
                  this.$router.push({ name: 'AdminOrders' })
                })
                .catch(err => {
                  console.log(err)
                })
            }
          } else {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.pass)
              .then(cred => {
                ref.set({
                  password: this.password,
                  timestamp: moment(Date.now()).format('l')
                })
              })
              .then(() => {
                this.$router.push({ name: 'AdminOrders' })
              })
              .catch(err => {
                console.log(err)
                if (err.code === 'auth/email-already-in-use') {
                  ref.set({
                    password: this.password,
                    timestamp: moment(Date.now()).format('l')
                  })
                    .then(() => {
                      this.$router.push({ name: 'AdminOrders' })
                    })
                }
              })
          }
        })
      } else {
        this.feedback = 'Musisz podać hasło!'
      }
    }
  }
}
</script>

<style scoped>
  .container { width: 70%; display: block; }
  .card { margin: 150px auto 0; max-width: 400px; width: 100%; }
  .row { margin-bottom: 0; }
</style>
