export default {
    get: {
      summary: 'Retorna todas as tarefas completas e incompletas',
      description:
        'Esta rota é responsável por retornar todas as tarefas completas e incompletas',
      tags: ['ToDo'],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/TodoCountResponse'
              },
              examples: {
                ToDo: {
                  $ref: '#/components/examples/TodoCountResponse'
                }
              }
            }
          }
        },
        400: {
          description: 'ERROR',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/GenericToDoError'
              },
              examples: {
                GenericToDoError: {
                  $ref: '#/components/examples/GenericToDoError'
                }
              }
            }
          }
        }
      }
    }
  };
  