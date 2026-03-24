#!/bin/bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d smart-souq.com -d www.smart-souq.com
