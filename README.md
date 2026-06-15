# Shortly - Link Shorter Application

Shortly is a modern, responsive URL shortening web application. It allows users to quickly shorten long URLs, track link clicks, manage their shortened history, and delete unwanted links securely. All links are associated with a persistent, anonymous session, ensuring users see their own history without requiring an account.

## Features

- URL Shortening: Instantly shorten long URLs with a unique, randomized slug.
- Click Tracking: Automatically tracks the number of times each shortened link is visited.
- Session Management: Stores link history per browser session using local storage.
- Delete Links: Allows users to delete individual links from both the interface and the database.
- Modern Responsive Design: Built with elegant hover state styling and modern responsive grids.

## Tech Stack

- Framework: Next.js (App Router with Turbopack)
- Styling: Tailwind CSS
- Database: Supabase (PostgreSQL)
- Languages: TypeScript, JavaScript
- Icons: Lucide React

## Setup and Installation

### 1. Clone the repository and install dependencies

Ensure you have Node.js installed, then run:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root of the project (copying from `.env.example`) and configure the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Running the Application

To start the development server locally, run:

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the application.

## API Endpoints

- GET `/api/links?sessionId=<session-id>`: Retrieves shortened links associated with the provided session ID.
- POST `/api/shorten`: Accepts a JSON body containing `url` and `sessionId` to generate and save a shortened link.
- DELETE `/api/links?id=<link-id>&sessionId=<session-id>`: Deletes the specified shortened link.
- GET `/[code]`: Redirects the short slug to the original destination URL and increments the click count.

---
Made by Guddu Pandit
