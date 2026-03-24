import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate, registerSchema, loginSchema, updateProfileSchema } from "../../core/validation/schemas";
import { catchAsync } from "../../core/middleware/errorHandler";
import { logAuth, logSecurity } from "../../core/utils/logger";
import { accountLockoutMiddleware } from "../../core/middleware/accountLockout";
import { authGuard } from "../../core/middleware/authGuard";

const router = Router();
const controller = new AuthController();

// Register endpoint with validation
router.post("/register", 
  validate(registerSchema),
  catchAsync(async (req: any, res: any, next: any) => {
    const { email } = req.body;
    const ip = req.ip;
    
    logAuth("REGISTER_ATTEMPT", undefined, ip);
    
    try {
      await controller.register(req, res, next);
      logAuth("REGISTER_SUCCESS", undefined, ip);
    } catch (error: any) {
      logSecurity("REGISTER_FAILED", { email, ip, error: error.message });
      throw error;
    }
  })
);

// Login endpoint with validation, account lockout, and stricter rate limiting
router.post("/login", 
  accountLockoutMiddleware,
  validate(loginSchema),
  catchAsync(async (req: any, res: any, next: any) => {
    const { email } = req.body;
    const ip = req.ip;
    
    logAuth("LOGIN_ATTEMPT", email, ip);
    
    try {
      await controller.login(req, res, next);
      logAuth("LOGIN_SUCCESS", email, ip);
    } catch (error: any) {
      logSecurity("LOGIN_FAILED", { email, ip, error: error.message });
      throw error;
    }
  })
);

// Refresh token endpoint
router.post("/refresh", 
  catchAsync(async (req: any, res: any, next: any) => {
    const ip = req.ip;
    
    try {
      await controller.refresh(req, res, next);
      logAuth("TOKEN_REFRESH_SUCCESS", undefined, ip);
    } catch (error: any) {
      logSecurity("TOKEN_REFRESH_FAILED", { ip, error: error.message });
      throw error;
    }
  })
);

// Logout endpoint
router.post("/logout", 
  catchAsync(async (req: any, res: any, next: any) => {
    const ip = req.ip;
    
    try {
      await controller.logout(req, res, next);
      logAuth("LOGOUT_SUCCESS", undefined, ip);
    } catch (error: any) {
      logSecurity("LOGOUT_FAILED", { ip, error: error.message });
      throw error;
    }
  })
);

// Logout from all devices endpoint
router.post("/logout-all", 
  catchAsync(async (req: any, res: any, next: any) => {
    const ip = req.ip;
    
    try {
      await controller.logoutAll(req, res, next);
      logAuth("LOGOUT_ALL_SUCCESS", undefined, ip);
    } catch (error: any) {
      logSecurity("LOGOUT_ALL_FAILED", { ip, error: error.message });
      throw error;
    }
  })
);

router.get(
  "/me",
  authGuard,
  catchAsync(async (req: any, res: any, next: any) => {
    await controller.me(req, res, next);
  })
);

router.patch(
  "/profile",
  authGuard,
  validate(updateProfileSchema),
  catchAsync(async (req: any, res: any, next: any) => {
    await controller.updateProfile(req, res, next);
  })
);

export default router;
