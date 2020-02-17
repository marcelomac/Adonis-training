'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnderecoSchema extends Schema {
  up () {
    this.create('enderecos', (table) => {
      table.increments()
      table.string('cep')
      table.string('bairro')
      table.string('cidade')
      table.integer('numero')
      table.string('complemento')
      table.timestamps()
    })
  }

  down () {
    this.drop('enderecos')
  }
}

module.exports = EnderecoSchema
