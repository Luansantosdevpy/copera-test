export default {
    post: {
      summary: 'Completa tarefas em lote',
      description:
        'Esta rota é responsável por completar tarefas em lote',
      tags: ['ToDo'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CompleteTaskPayload'
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
  