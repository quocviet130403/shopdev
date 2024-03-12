'use strict'

const productRepo = require("../models/repositories/product.repo")
const { BadRequest } = require("../core/error.response");
const commentModel = require("../models/comment.model");

class CommentService {
    async createComment({
        userId, productId, content, parentId
    }) {
        const product = await productRepo.findOneProduct({ product_id: productId, select: [] })
        if (!product) throw new BadRequest('Product not found.')

        const comment = await commentModel.create({
            comment_productId: productId,
            comment_userId: userId,
            comment_content: content
        })

        let rightValue;
        if (parentId) {
            
            const parentComment = await commentModel.findOne({ _id: parentId })
            if (!parentComment) throw new BadRequest('Parent comment not found.')

            rightValue = parentComment.comment_right

            await commentModel.updateMany({ 
                comment_productId: productId,
                comment_right: { $gte: rightValue }
            }, { $inc: { comment_right: 2 } })

            await commentModel.updateMany({ 
                comment_productId: productId,
                comment_left: { $gte: rightValue }
            }, { $inc: { comment_left: 2 } })

        } else {
            const commentMaxRightValue = await commentModel.findOne({ comment_productId: productId }).sort({ comment_right: -1 })

            if (commentMaxRightValue) {
                rightValue = commentMaxRightValue.comment_right + 1
            } else {
                rightValue = 1
            }
        }

        comment.comment_left = rightValue
        comment.comment_right = rightValue + 1

        comment.save()
    }

    async getListComment({ productId }) {

    }

    async deleteComment({ commentId }) {

    }
}

module.exports = new CommentService();