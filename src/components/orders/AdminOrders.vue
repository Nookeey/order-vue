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
                      <a class="btn-floating btn-small waves-effect waves-light blue"><i class="material-icons">create</i></a>
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
                      <a @click="deleteNewOrder(order.id)" class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete_forever</i></a>
                      <a class="btn-floating btn-small waves-effect waves-light blue"><i class="material-icons">create</i></a>
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
  </div>
</template>

<script>
import CreateOrder from '../layout/CreateOrder'
import InfoOrder from '../layout/InfoOrder'
import db from '../../firebase/init'
import firebase from 'firebase'
import moment from 'moment'

export default {
  name: 'AdminOrders',
  components: {
    CreateOrder,
    InfoOrder
  },
  data () {
    return {
      orders: [],
      ordersNew: []
    }
  },
  methods: {
    logoutIfNewDay () {
      let user = firebase.auth().currentUser
      if (user) {
        let ref = db.collection('admin').doc('admin')
        ref.get().then(doc => {
          if (doc.exists) {
            if (moment(doc.data().timestamp).format('l') !== moment(this.timestamp).format('l')) {
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
    // delete accepted order
    deleteOrder (id) {
      db.collection('orders').doc(id).delete()
    },
    // delete new order
    deleteNewOrder (id) {
      db.collection('orders').doc(id).delete()
    },
    // set ispay
    setIsPay (id, value) {
      db.collection('orders').doc(id).update({
        ispay: value
      })
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
</style>
