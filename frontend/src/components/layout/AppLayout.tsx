import { NavLink, Outlet } from 'react-router-dom'
import { BookOpen, Languages, LayoutDashboard, MessageCircle, Settings, Sparkles, Menu } from 'lucide-react'
import { useState } from 'react'

const nav = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/translate', label: 'Translator', icon: Languages },
  { to: '/practice', label: 'Conversation practice', icon: MessageCircle },
  { to: '/phrasebook', label: 'Phrasebook', icon: BookOpen },
]
export default function AppLayout() {
  const [open, setOpen] = useState(false)
  return <div className="min-h-screen bg-[#f6f7f2] text-[#17251f]">
    <aside className={`fixed inset-y-0 left-0 z-30 flex w-[260px] flex-col border-r border-[#e6e9df] bg-[#fbfcf8] px-5 py-6 transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#174c3b] text-white"><span className="kannada text-xl">ನಂ</span></div>
        <div><div className="text-lg font-bold tracking-tight">NammaSathi</div><div className="text-xs text-[#829087]">Your Kannada companion</div></div>
      </div>
      <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#9aa59b]">Workspace</div>
      <nav className="space-y-1">
        {nav.map(({to,label,icon:Icon,end}) => <NavLink key={to} to={to} end={end} onClick={()=>setOpen(false)} className={({isActive})=>`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive?'bg-[#eaf1e9] text-[#174c3b]':'text-[#68776e] hover:bg-[#f0f3ed] hover:text-[#174c3b]'}`}><Icon size={18}/>{label}</NavLink>)}
      </nav>
      <div className="mt-auto">
        <div className="mb-4 rounded-2xl bg-[#edf3eb] p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#174c3b]"><Sparkles size={16}/> Learning tip</div>
          <p className="text-xs leading-5 text-[#62766a]">A little Kannada every day makes a big difference. Start with one useful phrase.</p>
          <p className="kannada mt-3 text-sm font-semibold text-[#174c3b]">ನಮಸ್ಕಾರ — Hello</p>
        </div>
        <NavLink to="/settings" className={({isActive})=>`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${isActive?'bg-[#eaf1e9] text-[#174c3b]':'text-[#68776e] hover:bg-[#f0f3ed]'}`}><Settings size={18}/>Settings</NavLink>
        <div className="mt-5 border-t border-[#e6e9df] pt-4 text-[11px] text-[#9aa59b]">NAMMASATHI · EARLY ACCESS</div>
      </div>
    </aside>
    {open && <button aria-label="Close menu" className="fixed inset-0 z-20 bg-black/20 lg:hidden" onClick={()=>setOpen(false)}/>}
    <main className="min-h-screen lg:pl-[260px]">
      <header className="sticky top-0 z-10 flex h-[76px] items-center justify-between border-b border-[#e6e9df] bg-[#f6f7f2]/90 px-5 backdrop-blur md:px-9">
        <div className="flex items-center gap-3"><button onClick={()=>setOpen(true)} className="rounded-lg p-2 text-[#52665a] hover:bg-white lg:hidden"><Menu size={20}/></button><div className="text-sm text-[#829087]">Kannada made approachable</div></div>
        <div className="flex items-center gap-3"><div className="hidden text-right sm:block"><div className="text-xs font-bold">ನಮಸ್ಕಾರ!</div><div className="text-[11px] text-[#829087]">Let’s learn together</div></div><div className="grid h-9 w-9 place-items-center rounded-full bg-[#f1dfbd] text-sm font-bold text-[#805b24]">ನ</div></div>
      </header>
      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-9 md:py-10"><Outlet/></div>
    </main>
  </div>
}
