'use strict'

const StatusCodeSuccess = {
    OK: 200,
    CREATED: 201,
}

const MessageSuccess = {
    OK: 'OK',
    CREATED: 'CREATED',
}

class SuccessResponse {
    constructor({ code = StatusCodeSuccess.OK, message = MessageSuccess.OK, metadata = {} }) {
        this.code = code;
        this.message = message;
        this.metadata = metadata;
    }

    send(res) {
        res.status(this.code).json({
            code: this.code,
            message: this.message,
            metadata: this.metadata,
        });
    }
}

class Ok extends SuccessResponse {
    constructor({messange, metadata}) {
        super({messange, metadata});
    }
}

class Created extends SuccessResponse {
    constructor({messange, metadata}) {
        super({messange, metadata});
    }
}

module.exports = {
    Ok,
    Created
}