#!/bin/sh
set -e
export SUPABASE_URL="${SUPABASE_URL:-}"
export SUPABASE_ANON_KEY="${SUPABASE_ANON_KEY:-}"
envsubst '${SUPABASE_URL} ${SUPABASE_ANON_KEY}' <<'TEMPLATE' >/usr/share/nginx/html/js/supabase-config.js
window.__CATCH_SUPABASE__ = {
    url: '${SUPABASE_URL}',
    anonKey: '${SUPABASE_ANON_KEY}'
};
TEMPLATE
exec nginx -g "daemon off;"
