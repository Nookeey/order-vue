<template>
  <div class="container">
    <InfoOrder/>
    <div class="wrapper">
      <CreateOrder/>
      <section id="admin-orders">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <span class="card-title teal-text darken-1">ZAMOWIENIA</span>
            </div>
            <div class="row">
              <table>
                <a @click="showModalAgree('#modalAgreeDeleteAllOrders', 'accepted')" class="btn-floating btn-large waves-effect waves-light red halfway-fab right delete-all-orders"><i class="material-icons">delete_forever</i></a>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Imię</th>
                    <th>Danie</th>
                    <th>Cena</th>
                    <th class="center-align" style="width: 100px;">Zapłacił</th>
                    <th class="right-align" style="width: 150px;">Opcje</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(order, index) in orders" :key="index">
                    <td>{{ index }}</td>
                    <td>{{ order.customer }}</td>
                    <td>{{ order.dish }}</td>
                    <td>{{ order.price }}</td>
                    <td class="center-align">
                      <label class="1" @click="setIsPay(order.id, false)" v-if="order.ispay"><input type="checkbox" checked="checked"/><span></span></label>
                      <label class="2" @click="setIsPay(order.id, true)" v-if="!order.ispay"><input type="checkbox"/><span></span></label>
                    </td>
                    <td class="right-align">
                      <a @click="deleteOrder(order.id)" class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete_forever</i></a>
                      <a @click="setOrder(order, '#modalUpdateOrder')" class="btn-floating btn-small waves-effect waves-light blue"><i class="material-icons">create</i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="admin-new-orders">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <span class="card-title teal-text darken-1">NOWE ZAMOWIENIA</span>
            </div>
            <div class="row">
              <table>
                <a @click="showModalAgree('#modalAgreeDeleteAllOrders', 'new')" class="btn-floating btn-large waves-effect waves-light red halfway-fab right delete-all-orders"><i class="material-icons">delete_forever</i></a>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Imię</th>
                    <th>Danie</th>
                    <th>Cena</th>
                    <th class="center-align" style="width: 100px;">Zapłacił</th>
                    <th class="right-align" style="width: 150px;">Opcje</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(order, index) in ordersNew" :key="index">
                    <td>{{ index }}</td>
                    <td>{{ order.customer }}</td>
                    <td>{{ order.dish }}</td>
                    <td>{{ order.price }}</td>
                    <td class="center-align">
                      <label @click="setIsPay(order.id, false)" v-if="order.ispay"><input type="checkbox" checked="checked"/><span></span></label>
                      <label @click="setIsPay(order.id, true)" v-if="!order.ispay"><input type="checkbox"/><span></span></label>
                    </td>
                    <td class="right-align">
                      <a @click="deleteOrder(order.id)" class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete_forever</i></a>
                      <a @click="setOrder(order, '#modalUpdateOrder')" class="btn-floating btn-small waves-effect waves-light blue"><i class="material-icons">create</i></a>
                      <a @click="accept(order.id)" class="btn-floating btn-small waves-effect waves-light green"><i class="material-icons">check</i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="overflow"></div>
    <!-- START MODAL UPDATE ORDER -->
    <div id="modalUpdateOrder" class="modal">
      <form @submit.prevent="updateOrder" class="col s12">
        <div class="modal-content">
            <div class="row mb">
              <span class="card-title teal-text darken-1">EDYTUJ ZAMOWIENIE</span>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="customer" type="text" v-model="customer">
                <label for="customer" class="active">Imię</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <textarea id="dish" class="materialize-textarea" v-model="dish"></textarea>
                <label for="dish" class="active">Danie</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="price" type="number" v-model="price">
                <label for="price" class="active">Cena</label>
              </div>
            </div>
            <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
              <div v-if="feedback" class="alert alert-danger">{{ feedback }}</div>
            </transition>
        </div>
        <div class="modal-footer">
          <a @click="hideModal('#modalUpdateOrder')" class="modal-close waves-effect waves-green btn-flat">Anuluj</a>
          <button type="submit" class="waves-effect waves-light btn teal darken-2">Zapisz</button>
        </div>
      </form>
    </div>
    <!-- END MODAL UPDATE ORDER -->

    <!-- START MODAL AGREE DELETE ALL ORDERS-->
    <div id="modalAgreeDeleteAllOrders" class="modal">
      <div class="modal-content">
        <div class="row">
          <span class="card-title teal-text darken-1">Usunąć wszystkie zamówenia?</span>
        </div>
      </div>
      <div class="modal-footer">
        <a @click="hideModalAgree('#modalAgreeDeleteAllOrders')" class="modal-close waves-effect waves-green btn-flat">Nie</a>
        <button @click="deleteAllOrders('#modalAgreeDeleteAllOrders')" class="waves-effect waves-light btn teal darken-2">Tak</button>
      </div>
    </div>
    <!-- END MODAL AGREE DELETE ALL ORDERS -->
  </div>
</template>

<script>
import CreateOrder from '../layout/CreateOrder'
import InfoOrder from '../layout/InfoOrder'
import db from '../../firebase/init'
import firebase from 'firebase'
import moment from 'moment'
import $ from 'jquery'

export default {
  name: 'AdminOrders',
  components: {
    CreateOrder,
    InfoOrder
  },
  data () {
    return {
      id: null,
      customer: null,
      dish: null,
      price: null,
      orders: [],
      ordersNew: [],
      feedback: null,
      modalName: null,
      updateOrderStatus: false,
      timestamp: Date.now(),
      arrayName: null
    }
  },
  methods: {
    logoutIfNewDay () {
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
    },
    // accept order
    accept (id) {
      db.collection('orders').doc(id).update({
        accepted: true
      }).then(() => {
        this.ordersNew = this.ordersNew.filter(order => order.id !== id)
      }).catch(err => console.log(err))
    },
    // delete order
    deleteOrder (id) {
      db.collection('orders').doc(id).delete()
    },
    // set ispay
    setIsPay (id, value) {
      db.collection('orders').doc(id).update({
        ispay: value
      })
    },
    setOrder (order, el) {
      this.id = order.id
      this.customer = order.customer
      this.dish = order.dish
      this.price = order.price
      this.modalName = el
      this.showModal()
    },
    showModal () {
      $('.overflow').show()
      $(this.modalName).show()
    },
    hideModal () {
      $('.overflow').hide()
      $(this.modalName).hide()
      this.modalName = null
    },
    updateOrder () {
      this.updateOrderStatus = true
      db.collection('orders').doc(this.id).update({
        customer: this.customer,
        dish: this.dish,
        price: this.price
      }).then(() => {
        this.id = null
        this.customer = null
        this.dish = null
        this.price = null
        this.hideModal(this.modalName)
      })
    },
    showModalAgree (el, arrayName) {
      this.arrayName = arrayName
      $('.overflow').show()
      $(el).show()
    },
    hideModalAgree (el) {
      $('.overflow').hide()
      $(el).hide()
    },
    deleteAllOrders () {
      if (this.arrayName === 'accepted') {
        this.orders.forEach(order => db.collection('orders').doc(order.id).delete())
      } else if (this.arrayName === 'new') {
        this.ordersNew.forEach(order => db.collection('orders').doc(order.id).delete())
      }
      this.hideModalAgree('#modalAgreeDeleteAllOrders')
      this.arrayName = null
    }
  },
  created () {
    this.logoutIfNewDay()

    // get accepted orders
    db.collection('orders').where('accepted', '==', true)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            this.orders.push({
              id: change.doc.id,
              customer: change.doc.data().customer,
              price: change.doc.data().price,
              dish: change.doc.data().dish,
              ispay: change.doc.data().ispay
            })
          }
          if (change.type === 'removed') {
            this.orders = this.orders.filter(order => order.id !== change.doc.id)
          }
          if (change.type === 'modified') {
            this.orders = this.orders.map(function (order) {
              if (order.id === change.doc.id) {
                order.customer = change.doc.data().customer
                order.dish = change.doc.data().dish
                order.price = change.doc.data().price
                order.ispay = change.doc.data().ispay
              }
              return order
            })
          }
        })
      })

    // get not accepted orders
    db.collection('orders').where('accepted', '==', false)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            this.ordersNew.push({
              id: change.doc.id,
              customer: change.doc.data().customer,
              price: change.doc.data().price,
              dish: change.doc.data().dish,
              ispay: change.doc.data().ispay
            })
          }
          if (change.type === 'removed') {
            this.ordersNew = this.ordersNew.filter(order => order.id !== change.doc.id)
          }
          if (change.type === 'modified') {
            this.ordersNew = this.ordersNew.map(function (order) {
              if (order.id === change.doc.id) {
                order.customer = change.doc.data().customer
                order.dish = change.doc.data().dish
                order.price = change.doc.data().price
                order.ispay = change.doc.data().ispay
              }
              return order
            })
          }
        })
      })
  }
}
</script>

<style scoped>
  td { position: relative; }
  td .fixed-action-btn.direction-left ul, .fixed-action-btn.direction-right ul { right: 40px; }
  td .fixed-action-btn.direction-left ul li, .fixed-action-btn.direction-right ul li { margin: 4px 15px 0 0; }
  a.btn-floating.btn-large.waves-effect.waves-light.red.halfway-fab.right.delete-all-orders { top: -28px; }
</style>
