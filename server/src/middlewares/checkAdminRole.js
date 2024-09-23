const checkAdminRole = (req, res, next) => {
  if (req.user.role === "admin") return next();
  res.status(403).json({ msg: "Forbidden" });
};

export default checkAdminRole;
