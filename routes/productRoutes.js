const { Router } = require("express");
const router = Router();
const productController = require("../controllers/productController");
const { requireAuth } = require("../middleware/authMiddleware");

/**
 * Product routes 
 * GET product - get products
 * POST product - create a new product
 
 * To keep logic separate from routes handlers are in a separate file (../controllers/).
 */

// GET product
router.post("/search", requireAuth, productController.getProductKeyword);

// POST login
router.post("/create", requireAuth, productController.createProduct);

module.exports = router;
