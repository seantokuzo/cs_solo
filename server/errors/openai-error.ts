import { CustomError } from './custom-error'

export class OpenAiError extends CustomError {
  statusCode = 500

  constructor() {
    super('❌ Error fetching game from OpenAI')

    Object.setPrototypeOf(this, OpenAiError.prototype)
  }

  serializeErrors() {
    return { message: 'Error creating game with OpenAI' }
  }
}
