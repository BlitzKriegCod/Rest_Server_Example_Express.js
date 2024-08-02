const { Router } = require("express");
const {
  getUsers,
  postUsers,
  putUser,
  deleteUser
} = require("../controllers/user.controller");
const {
  validateUserFields,
  validateFields,
  verifyIdUser,
  verifyRole,
  paramsNoString
} = require("../middlewares/validators");
const { check } = require("express-validator");

const router = Router();

router.get("/", getUsers);

router.delete(
  "/:id",
  [
    check("id", `This Id not is a valid mongo Id`).isMongoId(),
    check("id").custom(verifyIdUser), validateFields
  ],
  deleteUser
);

router.post(
  "/",
  [validateUserFields("name", "email", "password", "role"), validateFields],
  postUsers
);
router.put(
  "/:id",
  [
    check("id", `This Id not is a valid mongo Id`).isMongoId(),
    check("id").custom(verifyIdUser),
    check("role").custom(verifyRole),
    validateFields
  ],
  putUser
);
module.exports = router;
