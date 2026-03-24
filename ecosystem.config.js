module.exports = {
  apps: [
    {
      name: "smart-souq-backend",
      script: "backend/dist/index.js",
      watch: false
    },
    {
      name: "smart-souq-frontend",
      script: "frontend/.next/standalone/server.js",
      watch: false
    }
  ]
};
