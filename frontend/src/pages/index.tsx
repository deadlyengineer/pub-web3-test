import { useEffect, useState } from "react";
import { fetchProposals } from "../services/proposal.sevice";
import { Proposal } from "../types/proposal.types";
import { ProposalComponent } from "../components/proposal";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { contract } from "../config/contract.config";

declare const window: any;

export const Home = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [updatedProposals, setUpdatedProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchProposals().then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("address");
        } else {
          if (res.status !== 200) {
            alert(res.data.error.message);
          } else {
            setProposals(res.data.data);
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const proposalContract = new ethers.Contract(
      contract.address,
      contract.abi,
      provider
    );
    if (proposals.length > 0) {
  
      proposalContract && proposalContract.on("VoteEvent", eve => {
        console.log("VoteEvent is emmited");
        const id: string = eve.toString();
        const updatedProposals: Proposal[] = proposals;
        updatedProposals[+id] = {
          ...updatedProposals[+id],
          votes: (+updatedProposals[+id].votes + 1).toString()
        }
        setUpdatedProposals(updatedProposals);
      });

      proposalContract && proposalContract.on("CreateEvent", (id, title, description, votes ) => {
        console.log("CreateEvent is emmited");
        const updatedProposals: Proposal[] = proposals;
        updatedProposals.push({
          id: id.toString(),
          title,
          description,
          votes: votes.toString()
        })
        setUpdatedProposals(updatedProposals);
      });
    }

    return () => {
      proposalContract.off('VoteEvent');
      proposalContract.off('CreateEvent');
    }
  }, [proposals]);

  useEffect(() => {
    if (updatedProposals.length > 0) {
      setProposals(updatedProposals);
    }
  }, [updatedProposals]);

  return (
    <div className="container">
      <div className="list">
        {proposals.map((proposal) => (
          <ProposalComponent proposal={proposal} key={proposal.id} />
        ))}
      </div>
      <Link to={"/create-proposal"} className="create-btn">
        + Create Proposal
      </Link>
    </div>
  );
};
