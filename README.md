# QR Code Generator

A simple QR code generator that uses Netlify Functions with Python to generate QR codes from URLs.

## Deployment Instructions

### Prerequisites

-  A [Netlify](https://www.netlify.com/) account
-  [Git](https://git-scm.com/) installed on your computer
-  [Node.js](https://nodejs.org/) installed on your computer (optional, for local development)

### Deploy to Netlify

1. Push this repository to GitHub, GitLab, or Bitbucket.

2. Log in to your Netlify account.

3. Click "New site from Git" and select your repository.

4. Configure the build settings:

   -  Build command: Leave empty (or use `#` for no command)
   -  Publish directory: `frontend`

5. Click "Deploy site".

6. Wait for the deployment to complete. Netlify will automatically detect and deploy the Python function.

### Local Development (Optional)

1. Install the Netlify CLI:
