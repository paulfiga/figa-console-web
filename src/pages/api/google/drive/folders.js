const {google} = require('googleapis');
import { authOptions } from '@/pages/api/auth/[...nextauth]' 
import { getServerSession } from "next-auth/next"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  
  const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });
  auth.setCredentials({
      access_token: session.accessToken,
      refresh_token: session.refreshToken,
  });

  // const service = google.sheets({ version: 'v4', auth });
  const service = google.drive({
    version: 'v3',
    auth: auth
  });
  const r = await service.files.list({
    q: "mimeType = 'application/vnd.google-apps.folder'",
    pageSize: 100,
    fields: 'nextPageToken, files(id, name, parents)',
  });

  res.status(200).json({
    folders: r.data.files,
  });
}