import React, { useEffect, useState } from "react";
import CandidateDetails from "./CandidateDetails";
import { Candidate } from "./types";

const Candidates: React.FC = () => {
  const [filtredCandidates, setFiltredCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState("");

  const candidates: Candidate[] = [
    {
      _id: "1",
      name: "John Doe",
      biography: "John Doe has been a community leader for over 20 years...",
      electoralProgram:
        "John's program focuses on education, healthcare, and infrastructure...",
      votes: 1200,
      comments: [],
    },
    {
      _id: "2",
      name: "Jane Smith",
      biography:
        "Jane Smith is a former teacher and advocate for educational reform...",
      electoralProgram:
        "Jane's program emphasizes renewable energy, public transportation, and affordable housing...",
      votes: 950,
      comments: [],
    },
    {
      _id: "3",
      name: "Alice Johnson",
      biography:
        "Alice Johnson has a background in law and has worked on various social justice initiatives...",
      electoralProgram:
        "Alice's program includes criminal justice reform, economic equality, and healthcare access...",
      votes: 1100,
      comments: [],
    },
  ];

  useEffect(() => {
    handleFilter(search);
  }, [search]);

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
