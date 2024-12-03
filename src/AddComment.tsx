import React, { useState } from "react";
import { commentCandidate } from "./service";
import { useAuth } from "./AuthContext";

interface AddCommentProps {
  candidateId: string;
}

const AddComment: React.FC<AddCommentProps> = ({ candidateId }) => {
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await commentCandidate(candidateId, user!.email, comment);
    } catch (error) {
      console.error(error);
    }
    setComment(""); // Clear input after submission
  };

  return (
    <form onSubmit={handleCommentSubmit} className="border p-3 rounded">
      <div className="mb-3">
        <label htmlFor="comment" className="form-label">
          Your Comment
        </label>
        <textarea
          id="comment"
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={3}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Submit Comment
      </button>
    </form>
  );
};

export default AddComment;
