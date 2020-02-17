'use strict'

const moment = require('moment')
// crypto está integrada ao Adonis a partir da v. 10
// const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      // 'input' para buscar um único campo da requisição
      const email = request.input('email')

      /**
       * Adonis provê o "findByOrFail": se não encontrar retorna erro e
       * cai no "catch"  */
      const user = await User.findByOrFail('email', email)

      // user.token = crypto.randomBytes(10).toString('hex')
      user.token = Math.floor(Math.random() * 90000) + 10000

      user.token_created_at = new Date()
      await user.save()

      /**
       * Parâmetros:
       * [Templates de email], (em resources/views/emails)
       * {parâmetros para o corpo do email},
       * dados da mensagem
       */
      await Mail.send(
        ['emails.forgot_password', 'emails.forgot_password-text'],
        { email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}` },
        (message) => {
          message
            .to(user.email)
            .from('marcelo.a.mac@gmail.com', 'Marcelo | Macagnan')
            .subject('Recuperação de senha')
        }
      )
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Algo não deu certo, esse e-mail existe?' } })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = request.all()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment()
        .subtract('5', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'O token de recuperação está expirado ' } })
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Algo deu errado ao resetar sua senha' } })
    }
  }
}
module.exports = ForgotPasswordController
