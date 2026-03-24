#!/bin/bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx docker.io docker-compose
git clone <REPO_URL>
cd smart-souq-project
docker compose up --build -d
sudo systemctl restart nginx
