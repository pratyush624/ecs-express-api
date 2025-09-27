// simple Express API ready for ECS + ALB health checks
const express = require('express');
const app = express();

// recommended: use PORT from env (ECS task defines it)
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'ecs-express-api';

// simple JSON middleware and logging
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} [${APP_NAME}] ${req.method} ${req.path}`);
  next();
});

// health/readiness endpoint (ALB health checks should use /health)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: APP_NAME });
});

// simple root endpoint
app.get('/', (req, res) => {
  res.json({ message: `Hello from ${APP_NAME}` });
});

// example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello API', timestamp: Date.now() });
});

// start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`${APP_NAME} listening on port ${PORT}`);
});
