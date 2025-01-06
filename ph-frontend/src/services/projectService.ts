import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Replace with your backend base URL

export async function toggleUpvote(projectId) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve the token
    if (!token) throw new Error("Authentication token not found.");

    const response = await axios.post(
      `/api/upvote/${projectId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    return response.data; // Return response to the calling component
  } catch (error) {
    console.error("Upvote failed:", error.response?.data?.message || error.message);
    throw error; // Propagate the error for further handling
  }
}
