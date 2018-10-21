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
            <button type="submit" class="waves-effect waves-light btn teal darken-2">Dodaj</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import db from '../../firebase/init'

export default {
  name: 'CreateOrder',
  data () {
    return {
      validate: false,
      feedbackDanger: null,
      feedbackSuccess: null,
      customer: null,
      price: null,
      dish: null
    }
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
</style>
