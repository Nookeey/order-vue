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
import getAcceptedOrdersMixin from '../../mixins/getAcceptedOrdersMixin'
import logoutIfNewDayMixin from '../../mixins/logoutIfNewDayMixin'

export default {
  name: 'UserOrders',
  components: {
    CreateOrder,
    InfoOrder
  },
  data () {
    return {
      orders: [],
      timestamp: Date.now()
    }
  },
  mixins: [getAcceptedOrdersMixin, logoutIfNewDayMixin]
}
</script>

<style>
</style>
