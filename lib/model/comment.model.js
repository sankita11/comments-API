const db = require('../db');

// Get All comments from comments table
exports.getAllComments = async () => {
    const queryResult = await db.query("SELECT * from comments");
    return queryResult[0];
}

// Get a comment by ID from comments table
exports.getCommentsByID = async (commentID) => {
    const queryResult = await db.query("SELECT * from comments WHERE id = ?", [commentID]);
    return queryResult[0][0];
}

//Create and save new comment in comments table
exports.createComment = async (comment) => {
    const result = await db.query("INSERT INTO comments SET ?", [comment]);
    return result;
}

//Update comment details by ID
exports.updateComment = async (commentID, comment) => {
    const result = await db.query("UPDATE comments SET ? WHERE id = ?", [comment, commentID]);
    return result
}

// Delete row in comments table by ID
exports.deleteComment = async (commentID) => {
    const result = await db.query("DELETE FROM comments WHERE id = ?", [commentID]);
    return result;
}