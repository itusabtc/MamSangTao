CREATE TABLE IF NOT EXISTS profiles (
  user_id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  display_name TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  avatar TEXT NOT NULL DEFAULT '🌱',
  bio TEXT NOT NULL DEFAULT 'Mỗi ngày một ý tưởng mới!',
  xp INTEGER NOT NULL DEFAULT 0,
  seeds INTEGER NOT NULL DEFAULT 300,
  streak INTEGER NOT NULL DEFAULT 1,
  joined_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS follows (
  follower_id TEXT NOT NULL,
  following_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (follower_id, following_id)
);
CREATE TABLE IF NOT EXISTS challenges (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  course_slug TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_name ON profiles(display_name);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_challenges_receiver_status ON challenges(receiver_id, status);
