const clanService = require('../services/clanService');

exports.createClan = async (req, res) => {
  // Validate, then call clanService.createClan with req.body and req.user/deviceId
};

exports.listClans = async (req, res) => {
  // Query for public clans and/or those user belongs to.
};

exports.joinClan = async (req, res) => {
  // Add user to clan_members
};

exports.leaveClan = async (req, res) => {
  // Remove user from clan_members
};

exports.getClanMembers = async (req, res) => {
  // List members
};

exports.getClanMessages = async (req, res) => {
  // Query messages in clan
};

exports.sendMessage = async (req, res) => {
  // Send a clan message
};
