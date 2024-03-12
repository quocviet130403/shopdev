'use strict'

const { Created, Ok } = require("../core/success.error")
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

    async getListComment(req, res, next) {
        new Ok({
            message: 'List Comment',
            metadata: await commentService.getListComment(req.query)
        }).send(res)
    }
}

module.exports = new CommentController()