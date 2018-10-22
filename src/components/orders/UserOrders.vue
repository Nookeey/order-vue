<template>
  <div class="container">
    <InfoOrder/>
    <div class="wrapper">
      <CreateOrder/>
      <section id="user-orders">
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
                    <th>Zapłacił</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(order, index) in orders" :key="index">
                    <td>{{ index }}</td>
                    <td>{{ order.customer }}</td>
                    <td>{{ order.dish }}</td>
                    <td>{{ order.price }}</td>
                    <td>
                      <label v-if="order.ispay"><input type="checkbox" checked="checked" disabled="disabled"/><span></span></label>
                      <label v-if="!order.ispay"><input type="checkbox" disabled="disabled"/><span></span></label>
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

export default {
  name: 'UserOrders',
  components: {
    CreateOrder,
    InfoOrder
  },
  data () {
    return {
      orders: []
    }
  },
  methods: {
  },
  created () {
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
  }
}
</script>

<style>
</style>
