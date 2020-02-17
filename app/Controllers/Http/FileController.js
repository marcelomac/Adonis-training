'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  async show ({ params, response }) {
    const file = await File.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  /**
   * Create/save a new file.
   * POST files
   */
  async store ({ request, response }) {
    try {
      // verifica se existe um arquivo com nome 'file' na requisição:
      if (!request.file('file')) return

      /**
       * VER SOLUÇÃO PARA LANÇAR throw QUANDO ARQUIVO FOR MAIOR QUE
       * O LIMITE ESTIPULADO;
       *
       * VER: https://adonisjs.com/docs/4.1/file-uploads
       *
       */

      // tamanho limite dos arquivos:
      const upload = request.file('file', { size: '10mb' })

      // define um novo nome para o arquivo:
      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      // se não aconteceu a ação de 'move', ou seja, o upload:
      if (!upload.moved()) {
        throw upload.error()
      }

      // criar um registro no bd
      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Erro no upload de arquivo' } })
    }
  }
}

module.exports = FileController
