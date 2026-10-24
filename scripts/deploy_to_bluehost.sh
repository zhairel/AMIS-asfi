#!/usr/bin/env bash
set -e

echo "=== Deploying ASFI Registration to Bluehost Production (asfi.amis.edu.ph) ==="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$ROOT_DIR"

echo "1. Building static export..."
NEXT_PUBLIC_APP_URL="https://asfi.amis.edu.ph" npm run build

echo "2. Assembling production package..."
rm -rf deploy_pkg asfi_production_deploy.tar.gz
mkdir -p deploy_pkg/api deploy_pkg/data deploy_pkg/uploads

cp -rn out/* deploy_pkg/
cp -r php-api/* deploy_pkg/api/

cat << 'EOF' > deploy_pkg/.htaccess
# php -- BEGIN cPanel-generated handler, do not edit
<IfModule mime_module>
  AddHandler application/x-httpd-ea-php82___lsphp .php .php8 .phtml
</IfModule>
# php -- END cPanel-generated handler, do not edit

DirectoryIndex index.html index.php

<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteCond %{HTTP:X-Forwarded-Proto} !https
    RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

    RewriteRule ^data/ - [F,L]

    RewriteRule ^api/register/?$ api/register.php [L,QSA]
    RewriteRule ^api/admin/auth/?$ api/admin_auth.php [L,QSA]
    RewriteRule ^api/admin/applications/([^/]+)/?$ api/admin_application_detail.php?id=$1 [L,QSA]
    RewriteRule ^api/admin/applications/?$ api/admin_applications.php [L,QSA]
    RewriteRule ^api/verify/?$ api/verify.php [L,QSA]

    RewriteRule ^admin/applications/([^/]+)/?$ admin/applications/view/index.html [L,QSA]

    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

    RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
    RewriteRule ^(.*)/?$ $1/index.html [L]

    RewriteCond %{DOCUMENT_ROOT}/$1.html -f
    RewriteRule ^(.*)$ $1.html [L]

    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^.*$ 404.html [L]
</IfModule>
EOF

cat << 'EOF' > deploy_pkg/data/.htaccess
<Files "*">
    Require all denied
    Order deny,allow
    Deny from all
</Files>
EOF

echo "3. Packaging archive..."
tar -czf asfi_production_deploy.tar.gz -C deploy_pkg .

echo "4. Uploading to Bluehost..."
scp -P 2222 asfi_production_deploy.tar.gz amisdavc@50.87.224.105:/home2/amisdavc/asfi_production_deploy.tar.gz

echo "5. Extracting and updating live permissions..."
ssh -p 2222 amisdavc@50.87.224.105 '
tar -xzf /home2/amisdavc/asfi_production_deploy.tar.gz -C /home2/amisdavc/asfi.amis.edu.ph/
chmod -R 755 /home2/amisdavc/asfi.amis.edu.ph/
chmod 777 /home2/amisdavc/asfi.amis.edu.ph/data /home2/amisdavc/asfi.amis.edu.ph/uploads
[ -f /home2/amisdavc/asfi.amis.edu.ph/data/asfi.db ] && chmod 666 /home2/amisdavc/asfi.amis.edu.ph/data/asfi.db
'

echo "=== Deployment Successfully Completed to https://asfi.amis.edu.ph/ ==="
