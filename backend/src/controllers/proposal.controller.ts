import { Router, type Request, type Response } from 'express'
import BaseController from '../classes/BaseController'
import Web3 from 'web3'
import { ABI } from '../config/abi'
import type Proposal from '../types/proposal'
import authMiddleware from '../middlewares/auth.middleware'

class ProposalController extends BaseController {
  public path = '/api/proposals'
  public router = Router()

  constructor() {
    super()
    this.initializeRoutes()
  }

  private readonly initializeRoutes = (): void => {
    this.router.get(`${this.path}`, authMiddleware, this.getAllProposals)
    // this.router.post(`${this.path}`, authMiddleware, this.createProposal)
  }

  public getAllProposals = async (req: Request, res: Response) => {
    try {
      const web3 = new Web3(process.env.GOERLI_RPC_URL)
      const contract = new web3.eth.Contract(ABI, process.env.CONTRACT_ADDRESS)
      const proposals: any[] = await contract.methods.getProposals().call()
      const data: Proposal[] = []

      proposals.forEach(proposal => {
        data.push({
          id: proposal.id.toString(),
          title: proposal.title,
          description: proposal.description,
          votes: proposal.votes.toString()
        })
      })
      return res.send({
        data
      })
    } catch (err: any) {
      return res.status(500).send({ error: { message: err.message } })
    }
  }

  // public createProposal = async (
  //   req: Request & { address: string },
  //   res: Response
  // ) => {
  //   try {
  //     const address: string = req.address
  //     const { title, description } = req.body

  //     const web3 = new Web3(process.env.GOERLI_RPC_URL)
  //     const contract = new web3.eth.Contract(ABI, process.env.CONTRACT_ADDRESS)
  //     const result = await contract.methods
  //       .createProposals(title, description)
  //       .send({ from: address })

  //     console.log(result)
  //     return res.send({ success: true })
  //   } catch (err) {
  //     console.log(err)
  //     return res
  //       .status(500)
  //       .send({ success: false, error: { message: err.message } })
  //   }
  // }
}

export default ProposalController
