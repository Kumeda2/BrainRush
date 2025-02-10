const Router = require("express").Router;
const userAuthController = require("../controllers/userAuthController");
const router = new Router();
const userActionsController = require("../controllers/userActionsController");
const authMiddleware = require("../middlewares/auth_middleware");

router.post('/games/:username', authMiddleware, userActionsController.create);
router.delete('/games/:gameId', authMiddleware, userActionsController.delete);
router.put('/games/:gameId', authMiddleware, userActionsController.changeGame);
router.put('/games/:gameId/:host/:mark', authMiddleware, userActionsController.changeMark);
router.get('/games/:gameId', authMiddleware, userActionsController.getGame);
router.get('/users/:username/games', authMiddleware, userActionsController.getUserGames);
router.get('/popular/', authMiddleware, userActionsController.getPopular);
router.post("/registration", userAuthController.registration);
router.post("/login", userAuthController.login);
router.post("/logout", userAuthController.logout);
router.get("/refresh", userAuthController.refresh);

module.exports = router;