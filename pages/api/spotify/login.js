import { NextApiRequest, NextApiResponse } from 'next'
import { getAuthUrl } from '../../../lib/spotify-auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const authUrl = await getAuthUrl()
    res.redirect(authUrl)
  } catch (error) {
    res.status(500).json({ error: 'Authentication configuration error' })
  }
}

