// Local dev: fill url and anonKey (Dashboard → Settings → API).
// Production (Docker/Coolify): this file is overwritten at container start from
// SUPABASE_URL and SUPABASE_ANON_KEY — set those in Coolify, redeploy.
window.__CATCH_SUPABASE__ = {
    url: '',
    anonKey: ''
};
