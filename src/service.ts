import { Candidate, User } from "./types";

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface ErrorResponse {
  message: string;
}
/**
 * Helper function to make requests
 */
export async function makeRequest<T>(
  endpoint: string,
  options: RequestOptions
): Promise<T> {
  const BASE_URL = "http://localhost:3000";
  const url = `${BASE_URL}${endpoint}`;
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const response = await fetch(url, {
    ...options,
    headers: { ...defaultHeaders, ...(options.headers || {}) },
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
}

// login
export async function signin(email: string, password: string) {
  return makeRequest<{ token: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// register

export async function signup({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  return makeRequest<{ token: string }>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

// me
export async function getMyUser() {
  return makeRequest<User>("/api/users/me", {
    method: "GET",
  });
}

// Fetch all candidates
export async function getAllCandidates() {
  return makeRequest<Candidate[]>("/api/candidates", {
    method: "GET",
  });
}

// Vote for a candidate
export async function voteCandidate(id: string, userId: string) {
  try {
    const response = await makeRequest<{ message: string; candidate: Candidate }>(
      `/api/candidates/vote/${id}`, 
      {
        method: "POST",
        body: JSON.stringify({ userId }), 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error while voting:", error);
    throw error;  // Rethrow for further handling
  }
}


// Comment on a candidate
export async function commentCandidate(
  idCandidate: string,
  user: string,
  content: string
) {
  return makeRequest<{ message: string; candidate: Candidate }>(
    `/api/candidates/${idCandidate}/comment`,
    {
      method: "POST",
      body: JSON.stringify({ user, content }),
    }
  );
}

// Favorize a candidate
export async function favorizeCandidate(id: string, userId: string) {
  return makeRequest<{ message: string; candidate: Candidate }>(
    `/api/users/favoriser/${id}`,
    {
      method: "POST",
      body: JSON.stringify({ userId }), 
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}


// Search candidates
export async function searchCandidates(query: string) {
  return makeRequest<Candidate[]>(`/api/candidates/search?query=${query}`, {
    method: "GET",
  });
}

// Get election results
export async function getElectionResults() {
  return makeRequest<Candidate[]>("/api/candidates/results", {
    method: "GET",
  });
}
