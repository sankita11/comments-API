const CommentController = require('../controller/comment.controller');

exports.routes = function (app) {

    app.get("/", CommentController.getAllComments);

    app.get("/:commentID([0-9]+)", CommentController.getCommentsByID);

    app.put("/", CommentController.createComment);

    app.patch("/:commentID([0-9]+)", CommentController.updateComment);

    app.delete("/:commentID([0-9]+)", CommentController.deleteComment);

}