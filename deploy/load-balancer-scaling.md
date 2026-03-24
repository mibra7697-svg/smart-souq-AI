# Load Balancer + Horizontal Scaling

## الفكرة العامة:
- تشغيل عدة نسخ من الباك إند (مثلاً 3 حاويات).
- وضع NGINX أو AWS ALB أمامها.

## مثال NGINX Upstream:
upstream smart_souq_backend {
    server localhost:4001;
    server localhost:4002;
    server localhost:4003;
}

server {
    listen 80;
    location /api {
        proxy_pass http://smart_souq_backend;
    }
}
