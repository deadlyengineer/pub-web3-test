import { ethers } from "hardhat";

async function main() {
  const proposalContract = await ethers.deployContract("ProposalContract");

  await proposalContract.waitForDeployment();

  console.log(
    `deployed to ${proposalContract.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
