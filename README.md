# Split - Easily split expenses with friends and groups

Built with Next.js 14 App Router, Clerk for Authentication, React, NeonDb for database management, ShadCN UI library for components, TypeScript, and TailwindCSS. Utilizing Cursor AI, Claude AI and Galileo AI.

![Project Image](https://your-project-image-url.com)

## Features

- 🌐 Next.js 14 App Router & Server Actions
- 🔐 Authentication with Clerk (Passkeys, Github, and Google Sign-in)
- 👥 Create and manage groups for expense sharing
- 💰 Add and track expenses within groups
- 🧮 Automatic expense splitting and balance calculation
- 📊 View balances and settle up with group members
- 📝 AI-powered blog post generation based on audio transcription
- 💳 Stripe integration for payments and subscription management
- 💾 NeonDb for database management
- 📤 UploadThing for file uploads
- 🎙️ Audio and video file processing (up to 25MB)
- 📜 TypeScript for type safety
- 💅 TailwindCSS for styling
- 🎨 ShadCN UI library for beautiful components
- 🔒 Secure file handling and processing
- 🪝 Webhook implementation for Stripe events
- 💰 Stripe integration for custom pricing table, payment links, and subscriptions
- 📊 User dashboard for managing blog posts
- 🖋️ Markdown editor for blog post editing
- 📱 Responsive design for mobile and desktop
- 🎨 Beautiful UI components with ShadCN UI library
- 💾 NeonDb for efficient database management
- 📜 TypeScript for enhanced type safety
- 💅 TailwindCSS for flexible and responsive styling
- 🔔 Toast notifications for user feedback
- 🔒 Protected routes and API endpoints
- 🚀 Deployment-ready

## Getting started

To get started with this project, follow these steps:

1. Fork the repository
2. Clone your forked repository
3. Copy the `.env.example` variables into a new `.env.local` file
4. Install the required dependencies
5. Run the development server

## How to fork and clone

1. Click the "Fork" button in the top right corner of this GitHub repository to create a copy in your account.
2. Clone your forked repository to your local machine using:
   ```
   git clone https://github.com/your-username/split-app.git
   ```
3. Navigate to the project directory:
   ```
   cd split-app
   ```

## Setting up the environment

1. Copy the `.env.example` file to `.env.local`:
   ```
   cp .env.example .env.local
   ```
2. Open `.env.local` and fill in the required credentials for Clerk, NeonDb, and any other services used in the project.

## Running the application

1. Install the dependencies:
   ```
   npm install
   ```
2. Run the development server:
   ```
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Acknowledgements

- [Clerk](https://go.clerk.com/5qOWrFA) for making this project possible

## License

[MIT](https://choosealicense.com/licenses/mit/)
