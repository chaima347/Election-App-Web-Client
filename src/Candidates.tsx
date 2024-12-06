import React, { useState, useEffect } from "react";
import { getAllCandidates } from "./service";
import { Candidate } from "./types";
import CandidateDetails from "./CandidateDetails";

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filtredCandidates, setFiltredCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState("");

  // Fetch candidates from backend
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getAllCandidates();
        setCandidates(data);
        setFiltredCandidates(data); // Initialize filtered candidates with full list
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  // Handle search filtering
  useEffect(() => {
    handleFilter(search);
  }, [search, candidates]);

  const handleFilter = (searchValue: string) => {
    const filtered = candidates.filter((candidate) =>
      candidate.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFiltredCandidates(filtered);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Candidates</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search candidates"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="list-group">
        {filtredCandidates.map((candidate) => (
          <li key={candidate._id} className="list-group-item">
            <CandidateDetails candidate={candidate} />
            <strong>{candidate.name}</strong> - {candidate.votes} votes
          </li>
        ))}
      </ul>
      {filtredCandidates.length === 0 && (
        <p className="text-muted text-center mt-3">No candidates found.</p>
      )}
    </div>
  );
};

export default Candidates;
