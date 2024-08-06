module.exports.isAdmin = (req, res, next) => {
  const { role, name } = req.user;

  if (!req.user) {
    return res.status(500).json({
      msg: "Not is possible verify the role if the token not is valid"
    });
  }
  if (role !== "Admin_role")
   return res.status(401).json({
      msg: `${name} you not have permission to realize this action`
    });
    next()
};
