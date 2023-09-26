export const contract = {
  abi: [
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: "uint8", name: "id", type: "uint8" },
        {
          indexed: false,
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "description",
          type: "string",
        },
        { indexed: false, internalType: "uint8", name: "votes", type: "uint8" },
      ],
      name: "CreateEvent",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: "uint8", name: "id", type: "uint8" },
        { indexed: false, internalType: "uint8", name: "votes", type: "uint8" },
      ],
      name: "VoteEvent",
      type: "event",
    },
    {
      inputs: [],
      name: "counter",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "title", type: "string" },
        { internalType: "string", name: "description", type: "string" },
      ],
      name: "createProposals",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getProposals",
      outputs: [
        {
          components: [
            { internalType: "uint8", name: "id", type: "uint8" },
            { internalType: "string", name: "title", type: "string" },
            { internalType: "string", name: "description", type: "string" },
            { internalType: "uint8", name: "votes", type: "uint8" },
          ],
          internalType: "struct ProposalContract.Proposal[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint8", name: "id", type: "uint8" }],
      name: "voteProposal",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
  address: "0x2a69227F56923254aA5E5250d98DA96Dfd6D1DEf",
};
