<template>
  <section id="info-order">
    <div class="card">
      <div class="cart-content">
        <ul class="collection with-header">
          <li class="collection-header"><span class="card-title teal-text darken-1">SZCZEGÓŁY ZAMÓWIENIA</span></li>
          <li class="collection-item"><div class="d-grid"><span class="item">Zamawia:</span><span class="value">{{ person }}</span></div></li>
          <li class="collection-item"><div class="d-grid"><span class="item">Restauracja:</span><span class="value">{{ restaurant }}</span></div></li>
          <li class="collection-item"><div class="d-grid"><span class="item">Informacja:</span><span class="value">{{ info }}</span></div></li>
          <li class="collection-item"><div class="d-grid"><span class="item">Deadline:</span><span class="value">{{ deadline }}</span></div></li>
          <li class="collection-item" style="height: 43px;"></li>
        </ul>
        <a v-if="user && admin" @click="logout" class="btn-floating btn-large waves-effect waves-light red halfway-fab left"><i class="material-icons">exit_to_app</i></a>
        <a @click="showModal" v-if="user && admin" class="btn-floating btn-large waves-effect waves-light blue halfway-fab"><i class="material-icons">create</i></a>
      </div>
    </div>

    <div class="overflow"></div>
    <!-- START MODAL UPDATE INFORMATION -->
    <div id="modalUpdateInformation" class="modal">
      <form @submit.prevent="setInfo" class="col s12">
        <div class="modal-content">
          <div class="row mb">
            <span class="card-title teal-text darken-1">EDYTUJ ZAMOWIENIE</span>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="person" type="text" v-model="person">
              <label for="person" class="active">Zamawia</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="restaurant" type="text" v-model="restaurant">
              <label for="restaurant" class="active">Restauracja</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="link" type="text" v-model="link">
              <label for="link" class="active">Link</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <textarea id="info" class="materialize-textarea" v-model="info"></textarea>
              <label for="info" class="active">Informacja</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="deadline" type="time" v-model="deadline">
              <label for="deadline" class="active">Deadline</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <a @click="hideModal" class="modal-close waves-effect waves-green btn-flat">Anuluj</a>
          <button type="submit" class="waves-effect waves-light btn teal darken-2">Zapisz</button>
        </div>
      </form>
    </div>
    <!-- END MODAL UPDATE INFORMATION -->
  </section>
</template>

<script>
import firebase from 'firebase'
import db from '../../firebase/init'
import $ from 'jquery'

export default {
  name: 'InfoOrder',
  data () {
    return {
      user: null,
      admin: false,
      person: null,
      restaurant: null,
      link: null,
      info: null,
      deadline: null
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

    db.collection('information')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(change => {
          console.log(change)
          if (change.type === 'added') {
            this.person = change.doc.data().person
            this.restaurant = change.doc.data().restaurant
            this.link = change.doc.data().link
            this.info = change.doc.data().info
            this.deadline = change.doc.data().deadline
          }
          if (change.type === 'modified') {
            this.person = change.doc.data().person
            this.restaurant = change.doc.data().restaurant
            this.link = change.doc.data().link
            this.info = change.doc.data().info
            this.deadline = change.doc.data().deadline
          }
        })
      })
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login' })
      })
    },
    setInfo () {
      let ref = db.collection('information').doc('information')
      ref.set({
        person: this.person,
        restaurant: this.restaurant,
        link: this.link,
        info: this.info,
        deadline: Date.parse(this.deadline + ':00')
      }).then(() => {
        this.hideModal()
      })
    },
    showModal () {
      $('.overflow').show()
      $('#modalUpdateInformation').show()
    },
    hideModal () {
      $('.overflow').hide()
      $('#modalUpdateInformation').hide()
    }
  }
}

</script>

<style>
  #info-order .collection-item .d-grid { display: grid; grid-template-columns: 110px 1fr; }
  #info-order .collection-item .d-grid .item { font-weight: 600; }
</style>
