export default {
    put: {
      summary: 'Altera a descrição de uma tarefa',
      description:
        'Esta rota é responsável por alterar a descrição de uma tarefa na base de dados',
      tags: ['ToDo'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'ID do produto'
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateDescriptionTask'
            }
          }
        }
      },
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
  