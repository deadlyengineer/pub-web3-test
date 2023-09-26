import * as jwt from 'jsonwebtoken'

/**
 * Generate JWT token
 * @param user User info
 * @param address Wallet address
 * @returns JWT token
 */
export const generateJwtToken = (address: string): string => {
  const secretOrPrivateKey: jwt.Secret = process.env
    .JWT_SECRET_KEY as jwt.Secret
  const token: string = jwt.sign(
    {
      address
    },
    secretOrPrivateKey,
    { expiresIn: process.env.DEFAULT_JWT_EXPIRATION ?? '1h' }
  )

  return token
}
