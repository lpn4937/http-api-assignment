// function to send a json object
const respondJSON = (request, response, status, object) => {
  // set status code and content type (application/json)
  response.writeHead(status, { 'Content-Type': 'application/json' });
  // stringify the object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  response.write(JSON.stringify(object));
  // Send the response to the client
  response.end();
};

  // function to show a success status code
const success = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'This is a successful response',
    id: 'Success',
  };

    // send our json with a success status code
  respondJSON(request, response, 200, responseJSON);
};

  // function to show a bad request without the correct parameters
const badRequest = (request, response, params) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'Bad Request',
  };

    // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // give the error a consistent id
    responseJSON.id = 'badRequest';
    // return our json with a 400 bad request code
    return respondJSON(request, response, 400, responseJSON);
  }

  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

// function to show a unauthorized request
const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'You are authorized to access this content',
    id: 'Unauthorized',
  };

  if (params.loggedIn !== 'yes') {
    // set our error message
    responseJSON.message = 'You are not authorized to access this content';
    // give the error a consistent id
    responseJSON.id = 'badRequest';
    // return our json with a 400 bad request code
    return respondJSON(request, response, 401, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

// function to show a forbidden request
const forbidden = (request, response) => {
  const responseJSON = {
    message: 'This is forbidden',
  };

  respondJSON(request, response, 403, responseJSON);
};

// funtion to show internal
const internal = (request, response) => {
  const responseJSON = {
    message: 'This is a something internal',
    id: 'Internal',
  };

  respondJSON(request, response, 500, responseJSON);
};

// function to show request isn't implemented
const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'This hasnt been implemented',
    id: 'Not Implemented',
  };

    // send our json with a success status code
  respondJSON(request, response, 200, responseJSON);
};

  // function to show not found error
const notFound = (request, response) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'Not Found',
  };

    // return our json with a 404 not found error code
  respondJSON(request, response, 404, responseJSON);
};

  // exports to set functions to public.
  // In this syntax, you can do getIndex:getIndex, but if they
  // are the same name, you can short handle to just getIndex,
module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
