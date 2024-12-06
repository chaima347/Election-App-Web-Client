import React, { useState } from "react";
import { useAuth } from "./AuthContext";  // Import AuthContext
import { Candidate } from "./types";
import AddComment from "./AddComment";
import { favorizeCandidate, voteCandidate } from "./service";

interface CandidateDetailsProps {
  candidate: Candidate;
}

const CandidateDetails: React.FC<CandidateDetailsProps> = ({ candidate }) => {
  const { user } = useAuth();  // Use the AuthContext to get the current user
  const [addCommentVisible, setAddCommentVisible] = useState<boolean>(false);
  const toggleAddComment = () => setAddCommentVisible(!addCommentVisible);

  const handleOnFavorite = async () => {
    if (!user) {
      alert("You must be logged in to favorize.");
      return;
    }
    try {
      const response = await favorizeCandidate(candidate._id, user._id);
      if (response.message === "Candidat favorisé") {
        alert("Candidate favorized successfully!");
      } else if (response.message === "Candidat déjà favorisé") {
        alert("You have already favorized this candidate.");
      }
    } catch (error) {
      console.error("Error favorizing candidate:", error);
      alert("you already favorized this candidate");
    }
  };

  const handleOnVote = async () => {
    if (!user) {
      alert("You must be logged in to vote.");
      return;
    }
    try {
      const response = await voteCandidate(candidate._id, user._id);  
      candidate.votes = response.candidate.votes;
      alert(response.message);
    } catch (error) {
      console.error("Failed to vote:", error);
      alert("You already Voted !");
    }
  };

  return (
    <div className="container mt-5" id={candidate._id}>
      <div className="card shadow-lg">
        <div className="card-body">
          {/* Display Candidate Image */}
          {candidate.img && (
            <img 
              src={candidate.img} 
              alt={candidate.name} 
              className="img-fluid rounded mb-3" 
              style={{ maxHeight: "300px", objectFit: "cover" }} 
            />
          )}

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
                <strong>{comment.user}:</strong> {comment.content}
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
