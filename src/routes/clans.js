const express = require('express');
const router = express.Router();
const clanController = require('../controllers/clanController');
const auth = require('../middleware/auth');

router.post('/', auth, clanController.createClan);                  // Create a clan
router.get('/', clanController.listClans);                          // List/discover clans
router.post('/:clanId/join', auth, clanController.joinClan);        // Join a clan
router.post('/:clanId/leave', auth, clanController.leaveClan);      // Leave a clan
router.get('/:clanId/members', auth, clanController.getClanMembers);// List clan members

router.get('/:clanId/messages', auth, clanController.getClanMessages);// Get messages
router.post('/:clanId/messages', auth, clanController.sendMessage);  // Post message

// (Optionally) Add routes for clan invites and moderation...

module.exports = router;
