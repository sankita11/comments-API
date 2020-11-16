const CommentController = require('../controller/comment.controller');

exports.routes = function (app) {

    app.get("/comment/all", CommentController.getAllComments);

    app.get("/comment/:commentID([0-9]+)", CommentController.getCommentsByID);

    app.put("/comment", CommentController.createComment);

    app.patch("/comment/:commentID([0-9]+)", CommentController.updateComment);

    app.delete("/comment/:commentID([0-9]+)", CommentController.deleteComment);

}