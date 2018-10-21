<template>
  <section id="info-order">
    <div class="card">
      <div class="cart-content">
        <ul class="collection with-header">
          <li class="collection-header"><span class="card-title teal-text darken-1">SZCZEGÓŁY ZAMÓWIENIA</span></li>
          <li class="collection-item"><div class="d-grid"><span class="item">Zamawia:</span><span class="value">Ktos</span></div></li>
          <li class="collection-item"><div class="d-grid"><span class="item">Restauracja:</span><span class="value">Jakas restuauracja</span></div></li>
          <li class="collection-item"><div class="d-grid"><span class="item">Informacja:</span><span class="value">Jakas informacja</span></div></li>
          <li class="collection-item"><div class="d-grid"><span class="item">Deadline:</span><span class="value">10:50</span></div></li>
          <li class="collection-item" style="height: 43px;"></li>
        </ul>
        <a v-if="user && admin" @click="logout" class="btn-floating btn-large waves-effect waves-light red halfway-fab left"><i class="material-icons">exit_to_app</i></a>
        <a v-if="user && admin" class="btn-floating btn-large waves-effect waves-light blue halfway-fab"><i class="material-icons">create</i></a>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'InfoOrder',
  data () {
    return {
      user: null,
      admin: false
    }
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
    if (this.$route.name === 'AdminOrders') {
      this.admin = true
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login' })
      })
    }
  }
}

</script>

<style>
  #info-order .collection-item .d-grid { display: grid; grid-template-columns: 110px 1fr; }
  #info-order .collection-item .d-grid .item { font-weight: 600; }
</style>
