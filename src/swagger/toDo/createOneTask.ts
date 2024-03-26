export default {
    post: {
      summary: 'Criar uma tarefa',
      description:
        'Esta rota é responsável por criar uma tarefa na base de dados',
      tags: ['ToDo'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ToDoPayload'
            }
          }
        }
      },
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
  