import { useMemo, useState } from 'react'
import { Check, Copy, Search } from 'lucide-react'
import PageHeading from '../components/ui/PageHeading'

const entries = [
  ['ನಮಸ್ಕಾರ', 'Namaskara', 'Hello / Greetings', 'Basics'],
  ['ಧನ್ಯವಾದಗಳು', 'Dhanyavaadagalu', 'Thank you', 'Basics'],
  ['ದಯವಿಟ್ಟು', 'Dayavittu', 'Please', 'Basics'],
  ['ಹೌದು', 'Haudu', 'Yes', 'Basics'],
  ['ಇಲ್ಲ', 'Illa', 'No', 'Basics'],
  ['ಕ್ಷಮಿಸಿ', 'Kshamisi', 'Excuse me / Sorry', 'Basics'],
  ['ನೀವು ಹೇಗಿದ್ದೀರಿ?', 'Neevu hegiddೀರಿ?', 'How are you?', 'Basics'],
  ['ಇದು ಎಷ್ಟು?', 'Idu eshtu?', 'How much is this?', 'Shopping'],
  ['ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ', 'Svalpa kadime maadi', 'Please reduce the price', 'Shopping'],
  ['ಇದು ನನಗೆ ಬೇಕು', 'Idu nanage beku', 'I want this', 'Shopping'],
  ['ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?', 'Bus nildana ellide?', 'Where is the bus stop?', 'Transport'],
  ['ಬೆಂಗಳೂರುಗೆ ಬಸ್ ಇದೆಯೇ?', 'Bengaluruge bus ideye?', 'Is there a bus to Bengaluru?', 'Transport'],
  ['ನನಗೆ ಸಹಾಯ ಬೇಕು', 'Nanage sahaaya beku', 'I need help', 'Essentials'],
  ['ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ', 'Nanage arthavaagalilla', 'I did not understand', 'Essentials'],
  ['ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ', 'Nidhaanavaagi maatanaadi', 'Please speak slowly', 'Essentials'],
  ['ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?', 'Aaspatre ellide?', 'Where is the hospital?', 'Essentials'],
  ['ನೀರು ಬೇಕು', 'Neeru beku', 'I need water', 'Essentials'],
  ['ನಿಮ್ಮ ಹೆಸರು ಏನು?', 'Nimma hesaru enu?', 'What is your name?', 'Basics'],
]
const categories = ['All', 'Basics', 'Shopping', 'Transport', 'Essentials']

export default function Phrasebook() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [copied, setCopied] = useState<string | null>(null)
  const filtered = useMemo(() => entries.filter((entry) => (category === 'All' || entry[3] === category) && entry.join(' ').toLowerCase().includes(query.toLowerCase())), [query, category])

  const copyPhrase = async (phrase: string) => {
    try { await navigator.clipboard.writeText(phrase); setCopied(phrase); window.setTimeout(() => setCopied(null), 1500) }
    catch { setCopied(null) }
  }

  return (
    <>
      <PageHeading eyebrow="Quick reference" title="Everyday phrasebook" description="Useful Kannada expressions for common everyday situations. Search or browse by category." />
      <div className="mb-5 flex flex-col gap-3">
        <div className="relative"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa69b]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Kannada, pronunciation or English..." className="w-full rounded-xl border border-[#e6e9df] bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-[#8ca995]" /></div>
        <div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`rounded-xl px-4 py-2 text-xs font-bold ${category === item ? 'bg-[#174c3b] text-white' : 'border border-[#e6e9df] bg-white text-[#718077]'}`}>{item}</button>)}</div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map(([kannada, latin, english, cat]) => <article key={kannada} className="rounded-2xl border border-[#e6e9df] bg-white p-5">
          <div className="mb-3 flex items-center justify-between"><span className="rounded-full bg-[#edf3eb] px-2.5 py-1 text-[10px] font-bold text-[#47705a]">{cat}</span><button onClick={() => copyPhrase(kannada)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#718077] hover:text-[#174c3b]" aria-label={`Copy ${kannada}`}>{copied === kannada ? <Check size={14} /> : <Copy size={14} />}{copied === kannada ? 'Copied' : 'Copy'}</button></div>
          <div className="kannada text-xl font-semibold text-[#174c3b]">{kannada}</div><div className="mt-1 text-xs text-[#9aa69b]">{latin}</div><div className="mt-3 border-t border-[#f0f1ec] pt-3 text-sm font-medium text-[#47594e]">{english}</div>
        </article>)}
      </div>
      {filtered.length === 0 && <div className="rounded-2xl bg-white p-10 text-center text-sm text-[#8a978d]">No matching phrases found.</div>}
      <p className="mt-6 text-xs text-[#a1aaa0]">Pronunciation is approximate. For important or sensitive communication, confirm wording with a fluent Kannada speaker.</p>
    </>
  )
}
