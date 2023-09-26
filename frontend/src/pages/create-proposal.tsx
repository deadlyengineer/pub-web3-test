import { useState } from "react";
import { ethers } from "ethers";
import { contract } from "../config/contract.config";

declare const window: any;

export const CreateProposal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescrtion] = useState("");

  const createProposal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const proposalContract = new ethers.Contract(
      contract.address,
      contract.abi,
      signer
    );

    let tx = await proposalContract.createProposals(title, description);
    await tx.wait(1);

    window.location.replace("/");
    return;
  };
  return (
    <form onSubmit={(e) => createProposal(e)}>
      <h3>Create Proposal</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        type="text"
        name="title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescrtion(e.target.value)}
        placeholder="Description"
        name="description"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};
