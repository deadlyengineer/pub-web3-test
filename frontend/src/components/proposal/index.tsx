import { FC, useState } from "react";
import "./index.scss";
import { Proposal } from "../../types/proposal.types";
import { ReactComponent as Icon } from "../../assets/thumbs-up-solid.svg";
import { ethers } from "ethers";
import { contract } from "../../config/contract.config";

declare const window: any;

type TProps = {
  proposal: Proposal;
};

export const ProposalComponent: FC<TProps> = (props: TProps) => {
  const { proposal } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const voteProposal = async () => {
    if (!isLoading) {
      try {
        setIsLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const propsalContract = new ethers.Contract(
          contract.address,
          contract.abi,
          signer
        );

        let tx = await propsalContract.voteProposal(proposal.id);
        await tx.wait(1);

        setIsLoading(false);
      } catch (err: any) {
        alert(err.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div key={proposal.id} className="item">
      <div className="title">{proposal.title}</div>
      <div className="desc">{proposal.description}</div>
      <div className="vote">Votes: {proposal.votes}</div>
      <div
        className={isLoading ? "vote-btn disabled" : "vote-btn"}
        onClick={voteProposal}
      >
        <Icon />
      </div>
    </div>
  );
};
