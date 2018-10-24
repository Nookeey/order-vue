import db from '../firebase/init'

export default {
  created () {
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
