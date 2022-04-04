const API_PARAM_CUSTOMER_ID = {
  name: 'customerId',
  description: 'Unique customer identifier',
  example: 'MyFirstID',
};
const API_PARAM_ENVIRONMENT = {
  name: 'environment',
  description: 'Environment identifier, dev/test/staging/prod',
  example: 'dev',
};
const API_PARAM_APP_ID = {
  name: 'appId',
  description: 'Platform specific application identifier',
  example: 'com.smithmicro.viewspot',
};

const API_RESPONSE_BAD_REQUEST = {
  status: 400,
  description: 'Bad request.',
  schema: {
    default: {
      statusCode: 400,
      message: 'Validation failed, errors: ...',
    },
  },
};

const API_RESPONSE_NOT_FOUND = {
  status: 404,
  description: 'Record not found.',
  schema: {
    default: {
      statusCode: 404,
      message: `There's no app com.smithmicro.viewspot in environment test for customer MyFirstID`,
    },
  },
};

const API_RESPONSE_CONFLICT = {
  status: 409,
  description: 'Conflict.',
  schema: {
    default: {
      statusCode: 409,
      message: 'App com.smithmicro.viewspot already exist ...',
    },
  },
};

const API_RESPONSE_INTERNAL_SERVER_ERROR = {
  status: 500,
  description: 'Internal Server Error.',
};

export {
  API_PARAM_CUSTOMER_ID,
  API_PARAM_ENVIRONMENT,
  API_PARAM_APP_ID,
  API_RESPONSE_BAD_REQUEST,
  API_RESPONSE_NOT_FOUND,
  API_RESPONSE_CONFLICT,
  API_RESPONSE_INTERNAL_SERVER_ERROR,
};
