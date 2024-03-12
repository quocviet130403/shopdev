'use strict'

const { Created } = require("../core/success.error")
const commentService = require("../services/comment.service")

class CommentController {
    async createComment(req, res, next) {
        new Created({ 
            message: 'Comment Created Successfully', 
            metadata: await commentService({
                userId: req.userId,
                ...req.body
            }) 
        }).send(res)
    }
}

module.exports = new CommentController()