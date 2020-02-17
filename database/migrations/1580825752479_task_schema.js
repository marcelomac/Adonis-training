'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      // Relacionamento da tarefa com o Projeto:
      table
        .integer('project_id')
        .unsigned() // somente valores positivos
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      // Relacionamento da tarefa com o usuário responsável:
      table
        .integer('user_id')
        .unsigned() // somente valores positivos
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      // Relacionamento da tarefa com arquivos:
      table
        .integer('file_id')
        .unsigned() // somente valores positivos
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.text('description')
      table.timestamp('due_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
