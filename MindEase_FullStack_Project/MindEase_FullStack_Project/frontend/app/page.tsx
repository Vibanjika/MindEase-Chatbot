'use client';
import { FormEvent, useEffect, useRef, useState } from 'react';
type Message = { text: string; who: 'bot' | 'user' };
const suggestions = ["I've been feeling stressed lately", "I can't sleep because I overthink", "I just want someone to listen"];
function localReply(raw: string): string {
 const s = raw.toLowerCase();
 if (/suicid|kill myself|end my life|want to die|hurt myself|self.harm/.test(s)) return "I'm really sorry you're going through this. Your safety matters. If you may act on these thoughts, move near someone you trust and contact emergency help now (India: 112). You can also contact Tele-MANAS at 14416. Are you in immediate danger right now?";
 if (/anxious|anxiety|panic|nervous|scared|overwhelm/.test(s)) return "That sounds really uncomfortable. Try breathing in gently for 4 counts and out for 6, a few times. What is the main thing making you feel anxious right now?";
 if (/stress|pressure|workload|exam|deadline/.test(s)) return "It sounds like a lot is sitting on your shoulders. You don't have to solve everything at once. What feels most urgent, and what is one small step you could take in the next 10 minutes?";
 if (/sad|depress|low|cry|upset|heartbroken/.test(s)) return "I'm sorry things feel heavy right now. You deserve care, not pressure to feel better immediately. Would you like to tell me what happened?";
 if (/lonely|alone|no friends|nobody/.test(s)) return "Feeling alone can be painful. Is there someone you feel comfortable messaging today? What has been making you feel disconnected?";
 if (/sleep|insomnia|overthink/.test(s)) return "A busy mind can make rest difficult. Try dimming your screen, relaxing your shoulders, and writing down your thoughts. What usually keeps your mind active at night?";
 if (/thank/.test(s)) return "You're welcome. Thank you for sharing with me. Be gentle with yourself today. 💙";
 if (/hello|hi|hey/.test(s)) return "Hello! I'm glad you stopped by. How are you feeling today—physically and emotionally?";
 return "Thank you for telling me. I want to understand rather than assume. Could you share a little more about what happened and how it has been affecting you?";
}
export default function Home() {
 const [messages,setMessages] = useState<Message[]>([{text:"Hi, I'm MindEase. 💙 This is a safe, non-judgmental space to share what's on your mind. How are you feeling today?",who:'bot'}]);
 const [value,setValue] = useState(''); const list = useRef<HTMLElement>(null);
 useEffect(()=>{ try { const saved = localStorage.getItem('mindease-chat'); if(saved){ const parsed = JSON.parse(saved) as Message[]; if(parsed.length) setMessages([{text:"Welcome back. 💙 What would you like to talk about today?",who:'bot'},...parsed.slice(-40)]); } } catch {} },[]);
 useEffect(()=>{list.current?.scrollTo({top:list.current.scrollHeight,behavior:'smooth'});},[messages]);
 function send(text=value){const msg=text.trim();if(!msg)return;const next:Message[]=[...messages,{text:msg,who:'user'}];setMessages(next);setValue('');try{localStorage.setItem('mindease-chat',JSON.stringify(next.slice(-80)));}catch{};window.setTimeout(()=>{const answer=localReply(msg);setMessages(prev=>{const updated=[...prev,{text:answer,who:'bot' as const}];try{localStorage.setItem('mindease-chat',JSON.stringify(updated.slice(-80)));}catch{}return updated;});},250);}
 function submit(e:FormEvent){e.preventDefault();send();}
 return <div className="app"><aside><div className="brand"><span className="logo">☁</span> MindEase</div><p className="tag">A gentle space to pause, reflect, and talk things through.</p><div className="side-title">You can talk about</div><div className="topic">🌿 Stress &amp; everyday worries</div><div className="topic">🌙 Sleep &amp; overthinking</div><div className="topic">💙 Feeling low or lonely</div><div className="topic">✨ Small wins &amp; good moments</div><div className="privacy">Messages are stored in this browser. MindEase is a supportive chatbot, not a therapist or emergency service.</div></aside><main><header className="top"><h1>Your mindful conversation</h1><span className="online">Here to listen</span></header><div className="intro">There is no perfect way to explain how you feel. Start wherever you are.</div><section className="messages" ref={list} aria-live="polite">{messages.map((m,i)=><div key={i} className={'bubble '+m.who}>{m.text}</div>)}</section><div className="suggestions">{suggestions.map(s=><button key={s} onClick={()=>send(s)}>{s===suggestions[0]?'I\'ve been stressed':s===suggestions[1]?'I can\'t sleep':'I need to talk'}</button>)}</div><form className="composer" onSubmit={submit}><input value={value} onChange={e=>setValue(e.target.value)} autoComplete="off" placeholder="Type what's on your mind…" aria-label="Your message"/><button type="submit">Send ↗</button></form><div className="foot">MindEase offers general emotional support, not medical advice.</div></main></div>;
}
