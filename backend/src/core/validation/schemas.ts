import Joi from "joi";

// User registration schema
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required"
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required"
  }),
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.alphanum": "Username must only contain alphanumeric characters",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username must not exceed 30 characters",
    "any.required": "Username is required"
  })
});

// User login schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required"
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required"
  })
});

// Order creation schema
export const createOrderSchema = Joi.object({
  productId: Joi.string().required().messages({
    "any.required": "Product ID is required"
  }),
  quantity: Joi.number().integer().min(1).max(10).default(1).messages({
    "number.min": "Quantity must be at least 1",
    "number.max": "Quantity cannot exceed 10"
  })
});

// Product creation schema
export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(200).required().messages({
    "string.min": "Product name must be at least 3 characters",
    "string.max": "Product name cannot exceed 200 characters",
    "any.required": "Product name is required"
  }),
  description: Joi.string().max(1000).optional(),
  price: Joi.number().positive().required().messages({
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required"
  }),
  commission: Joi.number().min(0).max(50).default(5).messages({
    "number.min": "Commission cannot be negative",
    "number.max": "Commission cannot exceed 50%"
  }),
  category: Joi.string().max(100).optional(),
  imageUrl: Joi.string().uri().optional()
});

// Payout request schema
export const createPayoutSchema = Joi.object({
  amount: Joi.number().positive().required().messages({
    "number.positive": "Amount must be positive",
    "any.required": "Amount is required"
  }),
  method: Joi.string().valid("BANK_TRANSFER", "PAYPAL", "VODAFONE_CASH", "INSTAPAY", "USDC_SOLANA").required().messages({
    "any.only": "Invalid payout method",
    "any.required": "Payout method is required"
  }),
  details: Joi.object({
    destination: Joi.string().optional(),
    token: Joi.string().optional(),
    network: Joi.string().optional()
  }).optional()
});

// Commission release schema
export const releaseCommissionSchema = Joi.object({
  commissionId: Joi.string().required().messages({
    "any.required": "Commission ID is required"
  })
});

// Update user profile schema
export const updateProfileSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).optional(),
  lastName: Joi.string().min(2).max(50).optional(),
  name: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  solanaAddress: Joi.string().allow(null, "").optional(),
  payoutPreference: Joi.string().valid("BANK", "SOLANA").optional()
});

// Password change schema
export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "any.required": "Current password is required"
  }),
  newPassword: Joi.string().min(6).required().messages({
    "string.min": "New password must be at least 6 characters",
    "any.required": "New password is required"
  })
});

// Pagination schema
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.min": "Page must be at least 1"
  }),
  limit: Joi.number().integer().min(1).max(100).default(20).messages({
    "number.min": "Limit must be at least 1",
    "number.max": "Limit cannot exceed 100"
  })
});

// Date range schema for monthly revenue
export const dateRangeSchema = Joi.object({
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  month: Joi.number().integer().min(1).max(12).optional(),
  year: Joi.number().integer().min(2000).max(2100).optional()
});

// Validation middleware factory
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        field: error.details[0].path[0]
      });
    }
    next();
  };
};

// Query validation middleware
export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.query);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        field: error.details[0].path[0]
      });
    }
    next();
  };
};
