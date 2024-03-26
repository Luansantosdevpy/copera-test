export default {
    get: {
      summary: 'Retorna uma tarefa da base',
      description:
        'Esta rota é responsável por retornar uma tarefa da base de dados a partir do ID',
      tags: ['ToDo'],
      parameters: [
        {
          in: 'path',
          name: 'ID',
          required: true,
          description: 'ID da tarefa a ser buscado'
        }
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                $ref: '#/components/schemas/ToDoResponse'
              },
              examples: {
                ToDo: {
                  $ref: '#/components/examples/ToDoResponse'
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
  