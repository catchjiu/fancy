# Static site for Coolify / any container host
# At startup, injects js/supabase-config.js from SUPABASE_URL + SUPABASE_ANON_KEY (Coolify env).
FROM nginx:1.27-alpine

RUN apk add --no-cache gettext

COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY *.html /usr/share/nginx/html/
COPY js /usr/share/nginx/html/js/

RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
