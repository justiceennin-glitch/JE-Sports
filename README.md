# JE Sports — Live Match + AI Analysis

## Included
- Live/upcoming football match panel with configurable API URL
- AI-style football analysis based on recent form
- Mobile-first professional design
- Team directory
- Admin page for API settings and football analysis posts

## Important about "AI"
The included analyzer is a transparent local heuristic. It is not a guaranteed AI model. For a real AI prediction service, connect a server-side AI/football-data backend and keep API secrets off the public browser.

## Live matches
A real live-score feed requires a football-data provider/API. Put its permitted endpoint and API key in Admin → Football data settings. The provider must allow browser requests (CORS), or you should proxy requests through your own backend.

## "All football teams"
A static list cannot reliably represent every team worldwide. The package includes major clubs and is designed to connect to a team database/API for a complete directory.

## Safety
This version does NOT create or provide betting/wagering booking codes. Prediction IDs are content IDs only. Do not use predictions as guaranteed betting outcomes.

Demo admin password: JE2026


## AI-style analysis
The Admin page now has a “Generate AI analysis” button. It creates a transparent local draft from the two team names, selected prediction and confidence. It is not a live AI model and does not claim access to real-time form, injuries, or odds. Review the draft before publishing.
