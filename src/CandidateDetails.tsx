import React, { useState } from "react";
import { Candidate } from "./types";

import AddComment from "./AddComment";
import { favorizeCandidate, voteCandidate } from "./service";

interface CandidateDetailsProps {
  candidate: Candidate;
}

const CandidateDetails: React.FC<CandidateDetailsProps> = ({ candidate }) => {
  const [addCommentVisible, setAddCommentVisible] = useState<boolean>(false);
  const toggleAddComment = () => setAddCommentVisible(!addCommentVisible);

  const handleOnFavorite = async () => {
    try {
      await favorizeCandidate(candidate._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnVote = async () => {
    try {
      await voteCandidate(candidate._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5" id={candidate._id}>
      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="card-title text-primary">{candidate.name}</h1>
          <p className="card-text">{candidate.biography}</p>

          <h2 className="h5 text-secondary mt-4">Electoral Program</h2>
          <p>{candidate.electoralProgram}</p>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h3 className="h6 text-info">Votes: {candidate.votes}</h3>
            <button onClick={handleOnVote} className="btn btn-outline-success">
              Vote
            </button>
          </div>

          <ul className="list-group mb-3">
            {candidate.comments.map((comment, index) => (
              <li key={index} className="list-group-item">
                {comment.message}
              </li>
            ))}
          </ul>

          <div className="d-flex gap-2">
            <button className="btn btn-warning" onClick={handleOnFavorite}>
              Favorise
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={toggleAddComment}
            >
              {addCommentVisible ? "Hide Comment Form" : "Add Comment"}
            </button>
          </div>

          {addCommentVisible && (
            <div className="mt-3">
              <AddComment candidateId={candidate._id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
