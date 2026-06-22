import API from "./api.js"; 

export const signup = async (userData) => {
  try {
    const response = await API.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong";
    throw new Error(errorMessage, { cause: error }); 
  }
};

export const login = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Login failed. Please check your details.";
    throw new Error(errorMessage, { cause: error });
  }
};
