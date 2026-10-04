# Purple Octopus — Digital Marketing Agency

React/Vite website and Express/MongoDB API for a digital marketing agency.

## Stack
- React
- Vite
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Lucide icons
- CSS responsive layout

## Project structure

- `frontend/` — React, Vite, styles, and static assets
- `backend/` — Express API, MongoDB models, and database configuration

Frontend and backend are separate npm services. Each has its own `package.json` and `package-lock.json`. The root `package.json` contains convenience scripts for local development only.

## Run

Install each service's dependencies from its own directory:

```bash
cd frontend && npm ci
cd ../backend && npm ci
cd ..
npm run dev
```

The frontend runs at the local Vite URL. In a second terminal, start the API:

```bash
npm run server
```

## Backend

The Express and MongoDB API lives in `backend/`.

1. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` to a local MongoDB or MongoDB Atlas connection string.
2. Run `npm run server` to start the API at `http://localhost:5000`.

Available endpoints:

- `GET /api/health` — API and database connection status
- `GET /api/projects` — portfolio projects stored in MongoDB
- `POST /api/inquiries` — create a contact enquiry

`POST /api/inquiries` accepts `name`, `email`, and `message`, with optional `company` and `service` fields.

## Deploying the services separately

- **Frontend service root:** `frontend`. Install with `npm ci`, build with `npm run build`, and publish the `dist` directory. Set `VITE_API_URL` to the deployed backend URL.
- **Backend service root:** `backend`. Install with `npm ci` and start with `npm start`. Set `MONGODB_URI`, `CLIENT_ORIGIN` to the deployed frontend URL, and `PORT` if required by the hosting provider.

## Media
The demo uses Pexels-hosted stock imagery/video. Pexels states that its photos/videos can be used for free, including commercial websites, without required attribution, subject to its license and terms. See:
https://www.pexels.com/license/

For production, download approved assets and self-host them in `/public/media` rather than relying on third-party hotlinks. Check each asset for visible trademarks/brands and avoid implying endorsement.
