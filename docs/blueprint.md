# **App Name**: Degen Oasis

## Core Features:

- Wallet Connection: Integrate WalletConnect to allow users to connect their wallets and authenticate.
- Daily Quote Submission: Enable one user per day to submit a quote with optional author attribution and category selection. Use tool to detect which users should be allowed to post or react, given the rate limiting and available information.
- Reaction System: Allow users to react to the daily quote with a limited set of emojis, one reaction per wallet per day. Use tool to determine which reaction options should be enabled for each user, or none.
- Quote History Display: Show a scrollable feed of previous quotes, including the date, quote text, author, and reaction counts.
- Wallet-Based Rate Limiting: Implement rate limiting to ensure users can only submit a quote or react once per day, based on their wallet address.
- Countdown Timer: Display a countdown timer until the next allowed action (quote submission or reaction).

## Style Guidelines:

- Background color: Dark desaturated orange (#332200) to evoke a degen/crypto feel.
- Primary color: Vibrant orange (#FFA500) for a neon accent and modern aesthetic.
- Accent color: Light Orange (#FFB347) to complement the primary orange and provide contrast.
- Body and headline font: 'Space Grotesk' sans-serif for headlines, and 'Inter' sans-serif for longer form body content.
- Use Lucide-react icons for a consistent and clean UI.
- Responsive design with a clean, minimal interface. Large, readable quote display with a prominent wallet connect button.
- Smooth transitions, hover effects, and reaction pop animations to enhance user experience.