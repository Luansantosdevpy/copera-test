export default {
    delete: {
      summary: 'Deleta uma tarefa',
      description:
        'Esta rota é responsável por deletar uma tarefa na base de dados',
      tags: ['ToDo'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'ID da tarefa a ser deletada'
        }
      ],
      responses: {
        204: {
          description: 'No Content',
          content: {
            'application/json': {
              schema: {
                type: true
              },
              example: true
            }
          }
        },
        404: {
          description: 'NOT FOUND ERROR',
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
  