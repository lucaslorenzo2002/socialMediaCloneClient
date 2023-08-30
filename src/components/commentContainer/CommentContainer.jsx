import React from "react";

const CommentContainer = ({ comments }) => {
    console.log(comments);
  return (
    <>
      {comments.map((comment, index) => (
        <div key={`${comment.id}${index}`} className="p-4 border-b">
          <div className="flex space-x-3">
            <img
              src={comment.User.profile_photo || "/defaultProfileImg.png"}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-bold">{comment.User.full_name}</span>
                <span className="text-gray-500">{comment.User.username}</span>
              </div>
              <p>{comment.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentContainer;
