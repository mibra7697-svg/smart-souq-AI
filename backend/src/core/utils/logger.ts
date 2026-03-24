import winston from "winston";
import path from "path";

// Create logs directory if it doesn't exist
const logDir = path.join(process.cwd(), "logs");

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.prettyPrint()
);

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: logFormat,
  defaultMeta: { service: "smart-souq-backend" },
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    
    // File transport for errors
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    
    // File transport for all logs
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    
    // File transport for financial operations
    new winston.transports.File({
      filename: path.join(logDir, "financial.log"),
      level: "info",
      maxsize: 5242880, // 5MB
      maxFiles: 10,
    })
  ],
  
  // Handle uncaught exceptions
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "exceptions.log")
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ],
  
  // Handle unhandled promise rejections
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "rejections.log")
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Development vs Production configuration
if (process.env.NODE_ENV === "production") {
  logger.add(new winston.transports.File({
    filename: path.join(logDir, "production.log"),
    level: "warn"
  }));
}

// Helper functions for different log types
export const logFinancial = (operation: string, data: any) => {
  logger.info(`Financial operation: ${operation}`, {
    type: "FINANCIAL",
    operation,
    data,
    timestamp: new Date().toISOString()
  });
};

export const logAuth = (operation: string, userId?: string, ip?: string) => {
  logger.info(`Auth operation: ${operation}`, {
    type: "AUTH",
    operation,
    userId,
    ip,
    timestamp: new Date().toISOString()
  });
};

export const logError = (error: Error, context?: any) => {
  logger.error(`Application error: ${error.message}`, {
    type: "ERROR",
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString()
  });
};

export const logAPI = (method: string, url: string, userId?: string, responseTime?: number) => {
  logger.info(`API call: ${method} ${url}`, {
    type: "API",
    method,
    url,
    userId,
    responseTime,
    timestamp: new Date().toISOString()
  });
};

export const logSecurity = (event: string, details: any) => {
  logger.warn(`Security event: ${event}`, {
    type: "SECURITY",
    event,
    details,
    timestamp: new Date().toISOString()
  });
};

// Request logging middleware
export const requestLogger = (req: any, res: any, next: any) => {
  const start = Date.now();
  
  res.on("finish", () => {
    const responseTime = Date.now() - start;
    logAPI(req.method, req.originalUrl, req.userId, responseTime);
  });
  
  next();
};

export default logger;
