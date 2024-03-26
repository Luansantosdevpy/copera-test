import healthcheckSchemas from './healthcheck/healthcheckSchemas';
import healthCheckExamples from './healthcheck/healthCheckExamples';
import toDoSchemas from './toDo/toDoSchemas';
import toDoExamples from './toDo/toDoExamples';

export default {
  components: {
    schemas: {
      ...healthcheckSchemas,
      ...toDoSchemas
    },
    examples: {
      ...healthCheckExamples,
      ...toDoExamples
    }
  }
};
