import axios from "axios";

/**
 * Sign in the user
 * @returns JWT
 */
export const singin = async (address: string) => {
  const response = await axios.post("http://localhost:8080/api/auth/signin", {
    address,
  });
  return response;
};
