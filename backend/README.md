## AI Suggestions (Optional)

This project can produce AI-generated suggestions for accessibility and SEO issues. By default, it falls back to a simple local rule-based suggester (no key needed).

### Enable AI Suggestions

#### 1. Get an OpenAI API Key

- Visit https://platform.openai.com/account/api-keys
- Sign up or log in and create a new API key
- Choose **Restricted** permissions (allows `responses.create` / `chat.completions`)
- Copy the key immediately (shown only once)

#### 2. Set the API Key in Your Backend

**Option A: Using `.env` file (recommended)**

1. Copy `.env.example` to `.env`:
   ```powershell
   cp .env.example .env
   ```

2. Edit `.env` and add your actual key:
   ```
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

3. Ensure `.env` is in `.gitignore` (so you don't accidentally commit it):
   ```
   .env
   ```

**Option B: Set environment variable for the session**

```powershell
$env:OPENAI_API_KEY = "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

#### 3. Resolve Port Conflicts (if needed)

If port 4000 is already in use, find and stop the process:

```powershell
netstat -a -n -o | findstr :4000
taskkill /PID <pid> /F
```

Or edit `backend/server.js` to use a different port (e.g., 5000).

#### 4. Start the Backend Server

```powershell
cd "c:\Users\ACER\Downloads\accessibility_lightweight_ui_project\backend"
npm install
node server.js
```

### Behavior

- When `OPENAI_API_KEY` is set and valid, the backend calls OpenAI to generate concise suggestions.
- If the API call fails, the backend automatically falls back to local heuristic suggestions.
- Suggestions are returned in the audit response under the `suggestions` array:
  ```json
  {
    "title": "Missing alt text",
    "text": "Add descriptive alt attributes to all images.",
    "source": "ai"
  }
  ```
- The `source` field is either `"ai"` (from OpenAI) or `"local"` (from fallback heuristics).

### Configuration

- Optionally set `AI_MODEL` in `.env` to use a different model (defaults to `gpt-4o-mini`):
  ```
  AI_MODEL=gpt-4o-mini
  ```

### Security & Cost Control

- **Keep your API key secret.** Do not commit `.env` to source control.
- **Set billing alerts** in your OpenAI account dashboard to monitor usage and costs.
- **Restrict the API key** to your server's IP address if running in production.
- **Rotate keys** periodically and delete unused keys from your dashboard.
- **Reduce token usage** by lowering `max_tokens` in `backend/suggestions/suggestionEngine.js` if needed.

### Troubleshooting

- **Permission denied or 403 error:** Ensure the API key has `responses.create` or `chat.completions` permissions (use "Restricted" mode).
- **Invalid API key:** Double-check the key and ensure it starts with `sk-`.
- **Suggestions not showing as "AI"?** Check that the backend is running and the key is set correctly; test with curl or Postman.
- **Want to use a different provider?** Edit `backend/suggestions/suggestionEngine.js` to call a different API.
