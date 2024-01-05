'use strict';

const StatusCodeError = {
    CONFLICT: 409,
    EXSIST: 400,
}

const StatusCodeMessage = {
    CONFLICT: 'Conflict',
    EXSIST: 'Exsist',
}

class ErrorHandle extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

class ConflictError extends ErrorHandle {
  constructor(message = StatusCodeMessage.CONFLICT, statusCode = StatusCodeError.CONFLICT) {
    super(statusCode, message);
  }
}

class ExsistError extends ErrorHandle {
  constructor(message = StatusCodeMessage.EXSIST, statusCode = StatusCodeError.EXSIST) {
    super(statusCode, message);
  }
}

module.exports = {
    ConflictError,
    ExsistError
}