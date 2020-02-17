'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class File extends Model {
  // criando um campo virtual (computed) para pegar a Url do arquivo:
  static get computed () {
    return ['url']
  }

  getUrl ({ id }) {
    // usando o Env para pegar o endereço da aplicação:
    return `${Env.get('APP_URL')}/files/${id}`
  }
}

module.exports = File
