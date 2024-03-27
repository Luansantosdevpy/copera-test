export default {
    ToDoPayload: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            body: {
              type: 'string'
            },
            completed: {
              type: 'boolean'
            },
            completedAt: {
              type: 'string'
            },
            created_at: {
              type: 'string'
            },
            updated_at: {
              type: 'string'
            }
          }
        }
      }
    },
    ToDoUpdatePayload: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            body: {
              type: 'string'
            },
            completed: {
              type: 'boolean'
            },
            completedAt: {
              type: 'string'
            },
            created_at: {
              type: 'string'
            },
            updated_at: {
              type: 'string'
            }
          }
        }
      }
    },
    ToDoResponse: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            _id: {
              type: 'string'
            },
            body: {
              type: 'string'
            },
            completed: {
              type: 'boolean'
            },
            completedAt: {
              type: 'string'
            },
            created_at: {
              type: 'string'
            },
            updated_at: {
              type: 'string'
            }
          }
        }
      }
    },
    GetAllToDosResponse: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            _id: {
              type: 'string'
            },
            body: {
              type: 'string'
            },
            completed: {
              type: 'boolean'
            },
            completedAt: {
              type: 'string'
            },
            created_at: {
              type: 'string'
            },
            updated_at: {
              type: 'string'
            }
          }
        }
      }
    },
    DeleteToDosInBatch: {
      type: 'object',
      properties: {
          ids: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }  
    },
    UpdateDescriptionTask: {
      type: 'object',
      properties: {
        body: {
        type: 'string'
        }
      }  
    },
    UpdateTaskStatus: {
      type: 'object',
      properties: {
          completed: {
          type: 'boolean'
        }
      }  
    },
    CompleteTaskPayload: {
      type: 'object',
      properties: {
        ids: {
            type: 'array',
            items: {
              type: 'string'
            }
            },
            body: {
                type: 'string'
            }
        }  
    },
    TodoCountResponse: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              pending: {
                type: 'number'
              },
              completed: {
                type: 'number'
              }
            }
          }
        }
      },
    GenericToDoError: {
      type: 'object',
      properties: {
        error: {
          type: 'string'
        }
      }
    }
  };
  