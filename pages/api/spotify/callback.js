const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/callback`
  : "http://localhost:3000/api/callback";

export default async function handler(req, res) {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.status(500).json({ error: "Missing Spotify configuration" });
  }

  const code = req.query.code;

  if (typeof code !== "string") {
    return res.status(400).json({ error: "Invalid authorization code" });
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Display the refresh token securely
      res.setHeader("Content-Type", "text/html");
      res.send(`
        <html>
          <body>
            <h1>Authentication Successful</h1>
            <p>Your refresh token (store this securely):</p>
            <code>${data.refresh_token}</code>
          </body>
        </html>
      `);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
}
