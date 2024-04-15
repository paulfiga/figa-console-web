const {Auth, google} = require('googleapis');
// const {auth} = require('google-auth-library');

const service_account_info = process.env['GOOGLE_SERVICE_ACCOUNT']

export function googleDrive() {
  const auth = new Auth.GoogleAuth({
    credentials: JSON.parse(service_account_info),
    scopes: "https://www.googleapis.com/auth/drive.readonly" 
  });

  const service = google.drive({
    version: 'v3',
    auth: auth
  });

  return service;
}