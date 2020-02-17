'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

const TaskHook = exports = module.exports = {}

/**
 * Hook para enviar email para o usuário.
 * Se a taskInstance NÃO tiver user_id ou se o user_id NÃO foi editado
 * recentemente (dirty): return
 *
 */
TaskHook.sendNewTaskMail = async (taskInstance) => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) { return }

  /**
   * o .fetch() retorna qual o usuário está relacionado com a task
   */
  const { email, username } = await taskInstance.user().fetch()
  const file = await taskInstance.file().fetch()
  const { title } = taskInstance

  /**
   * Job.kue: está em app\Jobs\NewTaskMail.js
   * Ver opções de config: https://github.com/nrempel/adonis-kue#dispatching-jobs
   */
  Kue.dispatch(Job.key, { email, username, file, title }, { attempts: 3 })
}
