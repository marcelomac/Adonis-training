'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const addresses = request.input('addresses')

    // trx: sigla para transaction
    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)

    await user.addresses().createMany(addresses, trx)

    // se ocorreu tudo bem, ou seja, criou User e Addresses sem problemas:
    await trx.commit()

    return user
  }

  show ({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return 'You cannot see someone else\'s profile'
    }
    return auth.user
  }
}

module.exports = UserController
