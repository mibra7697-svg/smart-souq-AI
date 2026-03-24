# Deploy Smart Souq on DigitalOcean Droplet

1. أنشئ Droplet (Ubuntu 22.04).
2. ثبّت Node.js, pnpm, Docker, NGINX:
   - sudo apt update && sudo apt install -y nginx docker.io docker-compose
3. استنسخ المشروع:
   - git clone <repo> && cd smart-souq-project
4. شغّل Docker:
   - docker compose up --build -d
5. اربط NGINX بالـ docker-compose (الفرونت 3000، الباك 4001).
