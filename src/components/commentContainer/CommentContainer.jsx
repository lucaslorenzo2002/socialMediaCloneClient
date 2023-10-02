import Comment from "./Comment";

const CommentContainer = ({ comments }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <Comment comment={comment} key={index+comment.id} />
      ))}
    </>
  );
};

export default CommentContainer;
