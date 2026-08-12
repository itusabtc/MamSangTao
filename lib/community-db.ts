import { env } from 'cloudflare:workers'
import type { ChatGPTUser } from '@/app/chatgpt-auth'

type Profile={user_id:string;email:string;display_name:string;username:string;avatar:string;bio:string;xp:number;seeds:number;streak:number;joined_at:string}
const statements=[
  `CREATE TABLE IF NOT EXISTS profiles (user_id TEXT PRIMARY KEY,email TEXT NOT NULL,display_name TEXT NOT NULL,username TEXT NOT NULL UNIQUE,avatar TEXT NOT NULL DEFAULT '🌱',bio TEXT NOT NULL DEFAULT 'Mỗi ngày một ý tưởng mới!',xp INTEGER NOT NULL DEFAULT 0,seeds INTEGER NOT NULL DEFAULT 300,streak INTEGER NOT NULL DEFAULT 1,joined_at TEXT NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS follows (follower_id TEXT NOT NULL,following_id TEXT NOT NULL,created_at TEXT NOT NULL,PRIMARY KEY (follower_id,following_id))`,
  `CREATE TABLE IF NOT EXISTS challenges (id INTEGER PRIMARY KEY AUTOINCREMENT,sender_id TEXT NOT NULL,receiver_id TEXT NOT NULL,course_slug TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'pending',created_at TEXT NOT NULL)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username)`,
  `CREATE INDEX IF NOT EXISTS idx_profiles_name ON profiles(display_name)`,
  `CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id)`,
  `CREATE INDEX IF NOT EXISTS idx_challenges_receiver_status ON challenges(receiver_id,status)`,
]
async function ready(){if(!env.DB)throw new Error('D1 DB unavailable');await env.DB.batch(statements.map(sql=>env.DB.prepare(sql)))}
function username(user:ChatGPTUser){return (user.email.split('@')[0]||'mam').toLowerCase().replace(/[^a-z0-9_]/g,'').slice(0,20)+user.userId.slice(-4).toLowerCase()}
export async function ensureProfile(user:ChatGPTUser){await ready();await env.DB.prepare(`INSERT OR IGNORE INTO profiles(user_id,email,display_name,username,joined_at) VALUES(?,?,?,?,?)`).bind(user.userId,user.email,user.displayName,username(user),new Date().toISOString()).run();return env.DB.prepare(`SELECT * FROM profiles WHERE user_id=?`).bind(user.userId).first() as Promise<Profile|null>}
export async function profileData(user:ChatGPTUser){const profile=await ensureProfile(user);const following=await env.DB.prepare(`SELECT p.* FROM follows f JOIN profiles p ON p.user_id=f.following_id WHERE f.follower_id=? ORDER BY f.created_at DESC`).bind(user.userId).all() as {results:Profile[]};const followers=await env.DB.prepare(`SELECT COUNT(*) count FROM follows WHERE following_id=?`).bind(user.userId).first() as {count:number}|null;const challenges=await env.DB.prepare(`SELECT c.id,c.course_slug,c.status,p.display_name,p.avatar FROM challenges c JOIN profiles p ON p.user_id=c.sender_id WHERE c.receiver_id=? ORDER BY c.id DESC LIMIT 8`).bind(user.userId).all() as {results:Array<{id:number;course_slug:string;status:string;display_name:string;avatar:string}>};return {profile,following:following.results,followers:Number(followers?.count||0),challenges:challenges.results}}
export async function searchProfiles(userId:string,term:string){await ready();const q=`%${term.trim().slice(0,40)}%`;return (await env.DB.prepare(`SELECT user_id,display_name,username,avatar,xp,streak FROM profiles WHERE user_id<>? AND (display_name LIKE ? OR username LIKE ?) ORDER BY xp DESC LIMIT 12`).bind(userId,q,q).all()).results}
export async function follow(userId:string,targetId:string){await ready();if(userId===targetId)return;await env.DB.prepare(`INSERT OR IGNORE INTO follows(follower_id,following_id,created_at) VALUES(?,?,?)`).bind(userId,targetId,new Date().toISOString()).run()}
export async function challenge(userId:string,targetId:string){await ready();if(userId===targetId)return;await env.DB.prepare(`INSERT INTO challenges(sender_id,receiver_id,course_slug,created_at) VALUES(?,?,?,?)`).bind(userId,targetId,'co-vua-cho-be',new Date().toISOString()).run()}
