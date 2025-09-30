# Degen Oasis

Welcome to Degen Oasis, a Next.js application where users can submit and react to daily quotes, creating a shared space for wisdom and inspiration with a "degen" crypto-like twist. The app features a modern "glassmorphism" design system with animated gradient text effects for a visually appealing experience.

## Features

- **Daily Quote:** A new "Quote of the Day" is featured every 24 hours.
- **Quote Submission:** Users can connect a simulated wallet to submit a quote for the current day. Only one submission is allowed per user per day.
- **Emoji Reactions:** Users can react to the daily quote with a selection of emojis (🔥, 🚀, 💎, 🌕).
- **Quote History:** Browse through a history of quotes from previous days.
- **AI-Powered Moderation:** Submitted quotes are automatically checked for inappropriate content using a Genkit AI flow to ensure a positive environment.
- **Sleek Glassmorphism UI:** The user interface is built with a frosted-glass aesthetic, featuring semi-transparent backgrounds, subtle borders, and backdrop-blur effects.
- **Animated Gradient Text:** Key headers and titles pop with an animated gradient effect, shifting through a spectrum of vibrant colors.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (using the App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit) with Google AI
- **Frontend:** [React](https://react.dev/)

## Getting Started

To get the application up and running on your local machine, follow these steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation & Running the App

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google AI API key:
    ```
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

4.  **Run the development server:**
    The application requires two processes to run concurrently: the Next.js frontend and the Genkit AI server.

    -   **Start the Next.js app:**
        ```bash
        npm run dev
        ```

    -   **In a separate terminal, start the Genkit server:**
        ```bash
        npm run genkit:dev
        ```

5.  **Open your browser:**
    Navigate to [http://localhost:9002](http://localhost:9002) to see the application in action.

## Project Structure

- `src/app/`: Contains the main pages and layout of the application.
- `src/components/`: Reusable React components, including UI elements from ShadCN.
- `src/ai/`: Houses the Genkit flows for AI functionality, like content moderation.
- `src/lib/`: Core application logic, server actions, and data management.
- `src/context/`: React context providers, such as the `WalletProvider`.
- `public/`: Static assets.
