import React, { useEffect, useState } from "react";

// Define the type for the result data
type ElectionResult = {
  _id: string;
  name: string;
  votes: number;
  totalVotes: number; // Ensure this matches the API response structure
};

const ElectionResults: React.FC = () => {
  const [results, setResults] = useState<ElectionResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/candidates/results");
        if (!response.ok) {
          throw new Error(`Failed to fetch election results: ${response.statusText}`);
        }
        const data: ElectionResult[] = await response.json(); // Explicitly type the API response
        setResults(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Safely access the error message
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    fetchResults();
  }, []);

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Election Results</h2>
      {results.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Candidate</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id}>
                <td>{result.name}</td>
                <td>{result.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-muted">No results available at the moment.</p>
      )}
    </div>
  );
};

export default ElectionResults;
