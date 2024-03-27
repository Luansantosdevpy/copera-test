export default {
    get: {
      summary: 'Retorna todos as tarefas da base',
      description:
        'Esta rota é responsável por retornar todas as tarefas da base de dados',
      tags: ['ToDo'],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/GetAllToDosResponse'
              },
              examples: {
                ToDo: {
                  $ref: '#/components/examples/GetAllToDosResponse'
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
  