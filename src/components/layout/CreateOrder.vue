<template>
  <section id="create-order">
    <div class="card">
      <div class="card-content">
        <div class="row">
          <form @submit.prevent="createOrder" class="col s12">
            <div class="row">
              <span class="card-title teal-text darken-1">DODAJ ZAMOWIENIE</span>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <input id="customer" type="text" v-model="customer">
                <label for="customer">Imię</label>
              </div>
              <div class="input-field col s6">
                <input id="price" type="number" v-model="price">
                <label for="price">Cena</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <textarea id="dish" class="materialize-textarea" v-model="dish"></textarea>
                <label for="dish">Danie</label>
              </div>
            </div>
            <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
              <div v-if="feedbackDanger" class="alert alert-danger">{{ feedbackDanger }}</div>
              <div v-if="feedbackSuccess" class="alert alert-success">{{ feedbackSuccess }}</div>
            </transition>
            <button type="submit" class="waves-effect waves-light btn teal darken-2" :disabled="!deadlineStatus">Dodaj</button>
          </form>
          <button @click="deadlineStatus = !deadlineStatus">Toggle Deadline Status</button>
        </div>
      </div>
    </div>

    <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
      <div v-if="!deadlineStatus" class="alert alert-success"><span>{{ feedbackDeadline }}</span></div>
    </transition>

  </section>
</template>

<script>
// eslint-disable-next-line
import firebase from 'firebase'
import db from '../../firebase/init'
// eslint-disable-next-line
import moment from 'moment'
import 'moment/locale/pl'

export default {
  name: 'CreateOrder',
  data () {
    return {
      validate: false,
      feedbackDeadline: 'Koniec',
      feedbackDanger: null,
      feedbackSuccess: null,
      customer: null,
      price: null,
      dish: null,
      deadline: null,
      currnetTime: moment(Date.now()).format('LTS'),
      deadlineStatus: true
    }
  },
  created () {
    // setInterval(() => {
    //   this.currnetTime = moment(Date.now()).format('LTS')
    //   if (this.currnetTime >= this.deadline) {
    //     this.deadlineStatus = true
    //   } else {
    //     this.deadlineStatus = false
    //   }
    // }, 1000)

    db.collection('information')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(change => {
          console.log(change)
          if (change.type === 'added') {
            this.deadline = change.doc.data().deadline
          }
          if (change.type === 'modified') {
            this.deadline = change.doc.data().deadline
          }
        })
      })
  },
  methods: {
    createOrder () {
      if (this.customer && this.price && this.dish) {
        db.collection('orders').add({
          customer: this.customer,
          price: this.price,
          dish: this.dish,
          ispay: false,
          accepted: false
        }).then(() => {
          this.customer = null
          this.price = null
          this.dish = null
          this.feedbackSuccess = 'Twoje zamówienia zostało przekazane do administratora.'
          this.feedbackDanger = null
          setTimeout(() => {
            this.feedbackSuccess = null
          }, 2000)
        }).catch(err => console.log(err))
      } else {
        this.feedbackDanger = 'Proszę wypełnić wszystkie pola!'
        this.feedbackSuccess = null
        setTimeout(() => {
          this.feedbackDanger = null
        }, 2000)
      }
    }
  }
}
</script>

<style>
  #create-order .row { margin-bottom: 0; }
  #create-order .alert-success { margin-top: 3em; }
  #create-order .alert-success span { display: block; margin: 0 auto; }
</style>
