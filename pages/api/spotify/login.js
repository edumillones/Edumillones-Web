import { getAuthUrl } from "./pages/api/spotify/spotify-auth.ts";

export default async function handler(req, res) {
  try {
    const authUrl = await getAuthUrl();
    res.redirect(authUrl);
  } catch (error) {
    res.status(500).json({ error: "Authentication configuration error" });
  }
}
