// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ProposalContract {
  mapping(uint256 => Proposal) proposals;
  uint8 public counter = 0;

  struct Proposal {
    uint8 id;
    string title;
    string description;
    uint8 votes;
  }

  event CreateEvent(uint8 id, string title, string description, uint8 votes);
  event VoteEvent(uint8 id, uint8 votes);

  /** Get all the proposals */
  function getProposals() public view returns (Proposal[] memory) {
    Proposal[] memory results = new Proposal[](counter);

    for (uint i = 0; i < counter; i++) {
      results[i] = proposals[i];
    }
    
    return results;
  }

  /** Create the new proposal */
  function createProposals(string memory title, string memory description) public {
    proposals[counter] = Proposal(counter, title, description, 0);
    emit CreateEvent(counter, title, description, 0);

    counter +=1;
  }

  /** Vote the proposal */
  function voteProposal(uint8 id) public returns (uint8) {
    uint8 votes = proposals[id].votes + 1;
    proposals[id].votes = votes;

    emit VoteEvent(id, votes);
    return votes;
  }
}