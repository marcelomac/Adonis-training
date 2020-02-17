'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('genero').notNullable()
      table.timestamp('datanasc')
      table.string('cpf_cnpj', 14).unique()
      table.string('telefone1')
      table.string('telefone2')

      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
