const CommentModel = require('../model/comment.model');

//Get All Comment
exports.getAllComments = async (req, res) => {
  try {
    const comments = await CommentModel.getAllComments();
    return res.send(comments);
  } catch (error) {
    return res.status(500).send({
      "error": error.message
    })
  }
}

// Get Comment By ID
exports.getCommentsByID = async (req, res) => {
  try {
    const commentID = req.params.commentID;
    const comments = await CommentModel.getCommentsByID(commentID);
    return res.send(comments);
  } catch (error) {
    return res.status(500).send({
      "error": error.message
    })
  }
}

// Create and Save a comment in DB
exports.createComment = async (req, res) => {

  try {
    const requestBody = req.body;

    if( !requestBody.email || !requestBody.name || !requestBody.comment ){
      return res.status(422).send({
        "error": "Please check your input, one or more fields are missing"
      }) 
    }

    const validCommentMsg = validateComment(requestBody)
    if( validCommentMsg !== 'VALID'){
      return res.status(422).send({
        "error": validCommentMsg
      }) 
    }

    await CommentModel.createComment(requestBody);
    return res.send({
      "success": "Comment created successfully"
    });
  } catch (error) {
    if( error.message.match(/Duplicate entry.*?for key 'email'/)){
      return res.status(500).send({
        "error": "Email already exists. Please use the diffrent email"
      })  
    }
    return res.status(500).send({
      "error": error.message
    })
  }

}

// Update a comment details by ID
exports.updateComment = async (req, res) => {

  try {
    const commentID = req.params.commentID;
    const requestBody = req.body;

    if( !requestBody.email && !requestBody.name && !requestBody.comment ){
      return res.status(422).send({
        "error": "Invalid input"
      }) 
    }

    const validCommentMsg = validateComment(requestBody)
    if( validCommentMsg !== 'VALID'){
      return res.status(422).send({
        "error": validCommentMsg
      }) 
    }
  
    // Check if ID passed is valid
    const comment = await CommentModel.getCommentsByID(commentID);
    if (!comment) {
      return res.status(404).send({
        "error": "Comment ID not found"
      });
    }

    await CommentModel.updateComment(commentID, requestBody);
    return res.send({
      "success": "Comment updated successfully"
    });

  } catch (error) {
    if( error.message.match(/Duplicate entry.*?for key 'email'/)){
      return res.status(500).send({
        "error": "Email already exists. Please use the diffrent email"
      })  
    }
    return res.status(500).send({
      "error": error.message
    })
  }

}

//Delete a comment by ID
exports.deleteComment = async (req, res) => {

  try {
    const commentID = req.params.commentID;

    // Check if ID passed is valid
    const comment = await CommentModel.getCommentsByID(commentID);
    if (!comment) {
      return res.status(404).send({
        "error": "Comment ID not found"
      });
    }

    await CommentModel.deleteComment(commentID);
    return res.send({
      "success": "Comment deleted successfully"
    });
  } catch (error) {

    return res.status(500).send({
      "error": error.message
    })

  }

}

function validateComment( comment ){
  if( comment.comment && comment.comment.length > 200 ){
    return "Comment text too long, it shouldnt be more than 200 characters"
  }
  if( comment.name && comment.name.length > 45 ){
    return "Name too long, it shouldnt be more than 45 characters"
  }
  if( comment.email && comment.email.length > 45 ){
    return "Email too long, it shouldnt be more than 45 characters" 
  }
  if( comment.email && !comment.email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)){
    return "Invalid email format"
  }
  return "VALID";
}