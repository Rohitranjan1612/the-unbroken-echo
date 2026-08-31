# Public site deployment

Repo: **[the-unbroken-echo](https://github.com/Rohitranjan1612/the-unbroken-echo)**

Backend: **[the-unbroken-echo-backend](https://github.com/Rohitranjan1612/the-unbroken-echo-backend)** → Railway  
Portal: **[the-unbroken-echo-self-serve](https://github.com/Rohitranjan1612/the-unbroken-echo-self-serve)** → Vercel

Full stack guide: [backend docs/DEPLOYMENT.md](https://github.com/Rohitranjan1612/the-unbroken-echo-backend/blob/main/docs/DEPLOYMENT.md)

## Vercel

1. Import the GitHub repo on [vercel.com](https://vercel.com).
2. Framework: Next.js (auto-detected).

### Environment variables

| Variable | Required | Production example |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Yes | `/api/v1` |
| `API_PROXY_TARGET` | Yes | `https://your-api.up.railway.app` |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://theunbrokenecho.com` |

### Local

```bash
cp .env.example .env.local
pnpm install && pnpm dev
```

Start the backend on port 4000 separately.
