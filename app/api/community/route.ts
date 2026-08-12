import { getChatGPTUser } from '@/app/chatgpt-auth'
import { challenge, follow, searchProfiles } from '@/lib/community-db'

export const dynamic='force-dynamic'
export async function GET(request:Request){const user=await getChatGPTUser();if(!user)return Response.json({error:'unauthorized'},{status:401});const term=new URL(request.url).searchParams.get('q')||'';return Response.json({people:term?await searchProfiles(user.userId,term):[]})}
export async function POST(request:Request){const user=await getChatGPTUser();if(!user)return Response.json({error:'unauthorized'},{status:401});const body=await request.json() as {action?:string;targetId?:string};if(!body.targetId)return Response.json({error:'missing target'},{status:400});if(body.action==='follow')await follow(user.userId,body.targetId);else if(body.action==='challenge')await challenge(user.userId,body.targetId);else return Response.json({error:'invalid action'},{status:400});return Response.json({ok:true})}
