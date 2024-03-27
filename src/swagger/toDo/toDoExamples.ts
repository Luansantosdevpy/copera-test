export default {
    ToDoResponse: {
      value: {
        data: {
            _id: '66030521d1b05754eabfa68e',
            body: 'testando create',
            completed: false,
            createdAt: '2024-03-26T17:25:53.886Z',
            updatedAt: '2024-03-26T17:25:53.886Z',
            __v: 0
        },
      }
    },
    GetAllUsersResponse: {
      value: {
        data: [
            {
                _id: '66030521d1b05754eabfa68e',
                body: 'Example task',
                completed: false,
                createdAt: '2024-03-26T17:25:53.886Z',
                updatedAt: '2024-03-26T17:25:53.886Z',
                __v: 0
            },
            {
                _id: '6603079aea0d304569dcc502',
                body: 'Example task 2',
                completed: false,
                createdAt: '2024-03-26T17:27:33.886Z',
                updatedAt: '2024-03-26T17:27:33.886Z',
                __v: 0
            },
            {
                _id: '6603079bea0d304569dcc504',
                body: 'Example task true',
                completed: false,
                createdAt: '2024-03-26T17:29:48.886Z',
                updatedAt: '2024-03-26T17:29:48.886Z',
                __v: 0
            },
        ]
      }
    },
    GenericToDoError: {
      value: {
        error: 'Mensagem de erro...'
      }
    },
    TodoCountResponse: {
        value: {
            data: {
                pending: 6,
                completed: 1
            }
        }
    }
};
