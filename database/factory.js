'use strict'

const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    email: faker.username() + '@gmail.com',
    password: faker.password()
  }
})
