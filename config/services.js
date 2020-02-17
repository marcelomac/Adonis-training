'use strict'

const Env = use('Env')

module.exports = {
  Sentry: {
    dsn: Env.get('SENTRY_DSN')
  }
}
