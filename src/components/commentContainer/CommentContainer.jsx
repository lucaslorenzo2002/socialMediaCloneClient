import { useSelector } from "react-redux";
import Comment from "./Comment";

const CommentContainer = ({ comments }) => {
  const user = useSelector(state => state.user)
  return (
    <>
      {comments.map((comment, index) => (
        <Comment comment={comment} key={index+comment.id} />
      ))}
    </>
  );
};

export default CommentContainer;
