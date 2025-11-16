const supabase = require("../lib/supabase"); // Adjust import to your actual setup

// CREATE CLAN Endpoint
exports.createClan = async (req, res) => {
  const { name, description, emoji, color, privacy } = req.body;
  const device_id = req.user.deviceId; // Or however you track current user
  // Validation
  if (!name || name.length < 3) return res.status(400).json({error: "Name too short"});
  // Insert clan
  const { data: clan, error } = await supabase
    .from("clans")
    .insert([{ name, description, emoji, color, privacy, created_by: device_id }])
    .single();
  if (error) return res.status(500).json({ error: error.message });
  // Auto-join creator as admin
  await supabase
    .from("clan_members")
    .insert([{ clan_id: clan.id, device_id, role: "admin" }]);
  return res.json({ clan });
};

// DISCOVER CLANS Endpoint
exports.listClans = async (req, res) => {
  const { query = "" } = req.query;
  // Search and get trending/public clans
  const { data: clans, error } = await supabase
    .from("clans")
    .select("*")
    .ilike("name", `%${query}%`)
    .order("member_count", { ascending: false })
    .limit(20);
  if (error) return res.status(500).json({ error: error.message });
  return res.json({ clans });
};

// JOIN CLAN Endpoint
exports.joinClan = async (req, res) => {
  const clan_id = req.params.clanId;
  const device_id = req.user.deviceId;
  // Check if already member, etc.
  await supabase
    .from("clan_members")
    .insert([{ clan_id, device_id, role: "member" }]);
  return res.json({ status: "joined" });
};

// LEAVE CLAN Endpoint
exports.leaveClan = async (req, res) => {
  const clan_id = req.params.clanId;
  const device_id = req.user.deviceId;
  await supabase
    .from("clan_members")
    .delete()
    .eq("clan_id", clan_id)
    .eq("device_id", device_id);
  return res.json({ status: "left" });
};
