import axios from "axios";
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
  withCredentials: true,
});

const getUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?._id || null;
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
    return null;
  }
};

// CRUD functions
export const getNotes = async () => {
  const userId = getUserId();
  if (!userId) throw new Error("User not logged in");
  return API.get("/notes", { params: { userId } });
};

export const createNote = async (note) => {
  const userId = getUserId();
  if (!userId) throw new Error("User not logged in");
  return API.post("/notes", { ...note, userId });
};

export const updateNote = async (id, note) => {
  const userId = getUserId();
  if (!userId) throw new Error("User not logged in");
  return API.put(`/notes/${id}`, { ...note, userId });
};

export const deleteNote = async (id) => {
  const userId = getUserId();
  if (!userId) throw new Error("User not logged in");
  return API.delete(`/notes/${id}`, { data: { userId } });
};

// Auth
export const registerUser = (form) => API.post("/auth/register", form);
export const loginUser = (form) => API.post("/auth/login", form);
export const logoutUser = () => API.post("/auth/logout");
