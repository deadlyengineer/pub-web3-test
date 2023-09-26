import axios from "axios";

/**
 * Get the proposals using api
 * @returns proposal data
 */
export const fetchProposals = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await axios.get("http://localhost:8080/api/proposals", {
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    return response;
  } catch (err: any) {
    console.log(err);
    return err.response;
  }
};
