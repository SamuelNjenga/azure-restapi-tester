const Router = require("express");

const RoleRoutes = require("./RoleRoutes");
const UserRoutes = require("./UserRoutes");

const router = Router();

router.use("/roles", RoleRoutes);
router.use("/users", UserRoutes);


module.exports = router;
