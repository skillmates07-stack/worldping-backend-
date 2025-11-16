const express = require("express");
const router = express.Router();
const clanController = require("../controllers/clanController");
const auth = require("../middleware/auth");

// Create a clan
router.post("/", auth, clanController.createClan);

// Discover/list clans (with optional query param for search)
router.get("/", clanController.listClans);

// Get a user's joined clans (optional, depends on your frontend API)
router.get("/my", auth, clanController.listMyClans);

// Join a clan
router.post("/:clanId/join", auth, clanController.joinClan);

// Leave a clan
router.post("/:clanId/leave", auth, clanController.leaveClan);

// Get all members of a clan
router.get("/:clanId/members", auth, clanController.getClanMembers);

// Get all messages in a clan's chat
router.get("/:clanId/messages", auth, clanController.getClanMessages);

// Send a message to a clan's chat
router.post("/:clanId/messages", auth, clanController.sendClanMessage);

// Optional: Clan invite endpoints for private clans, moderation, etc.
// router.post("/:clanId/invite", auth, clanController.inviteToClan);
// router.post("/:clanId/kick", auth, clanController.kickMember);

module.exports = router;
