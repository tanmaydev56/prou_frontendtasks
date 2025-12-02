// Simple RBAC middleware — demo-only version
module.exports = function requireAdmin(req, res, next) {
  const role = req.header("x-user-role");

  if (role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admins only."
    });
  }

  next();
};
