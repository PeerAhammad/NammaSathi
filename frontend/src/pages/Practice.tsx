import { useState } from 'react'
import { BookOpen, CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import PageHeading from '../components/ui/PageHeading'

const questions = [
  { prompt: 'How do you say “Hello” in Kannada?', options: ['ನಮಸ್ಕಾರ', 'ಧನ್ಯವಾದಗಳು', 'ಕ್ಷಮಿಸಿ', 'ಹೌದು'], answer: 'ನಮಸ್ಕಾರ', latin: 'Namaskara' },
  { prompt: 'What does “ಧನ್ಯವಾದಗಳು” mean?', options: ['Please', 'Thank you', 'No', 'Goodbye'], answer: 'Thank you', latin: 'Dhanyavaadagalu' },
  { prompt: 'How do you ask “How much is this?”', options: ['ಇದು ಎಲ್ಲಿದೆ?', 'ನನಗೆ ಸಹಾಯ ಬೇಕು', 'ಇದು ಎಷ್ಟು?', 'ನೀವು ಹೇಗಿದ್ದೀರಿ?'], answer: 'ಇದು ಎಷ್ಟು?', latin: 'Idu eshtu?' },
  { prompt: 'What does “ಹೌದು” mean?', options: ['Yes', 'No', 'Sorry', 'Welcome'], answer: 'Yes', latin: 'Haudu' },
  { prompt: 'How do you say “I need help”?', options: ['ನನಗೆ ಸಹಾಯ ಬೇಕು', 'ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ', 'ಇದು ಚೆನ್ನಾಗಿದೆ', 'ನಮಸ್ಕಾರ'], answer: 'ನನಗೆ ಸಹಾಯ ಬೇಕು', latin: 'Nanage sahaaya beku' },
  { prompt: 'What does “ಕ್ಷಮಿಸಿ” mean?', options: ['Thank you', 'Excuse me / Sorry', 'Please', 'Yes'], answer: 'Excuse me / Sorry', latin: 'Kshamisi' },
  { prompt: 'How do you ask “Where is the bus stop?”', options: ['ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?', 'ಇದು ಎಷ್ಟು?', 'ನೀರು ಬೇಕು', 'ನಮಸ್ಕಾರ'], answer: 'ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?', latin: 'Bus nildana ellide?' },
  { prompt: 'What does “ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ” mean?', options: ['Come here', 'Speak slowly', 'I understand', 'Thank you'], answer: 'Speak slowly', latin: 'Nidhaanavaagi maatanaadi' },
]

export default function Practice() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const current = questions[index]

  const choose = (option: string) => {
    if (selected) return
    setSelected(option)
    if (option === current.answer) setScore((value) => value + 1)
  }

  const next = () => {
    if (index === questions.length - 1) setFinished(true)
    else { setIndex((value) => value + 1); setSelected(null) }
  }

  const restart = () => { setIndex(0); setSelected(null); setScore(0); setFinished(false) }

  return (
    <>
      <PageHeading eyebrow="Build confidence" title="Kannada practice" description="Try a short set of everyday Kannada questions and check what you have learned." />
      <section className="mx-auto max-w-2xl rounded-2xl border border-[#e6e9df] bg-white p-6 sm:p-8">
        {finished ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#edf3eb] text-[#174c3b]"><CheckCircle2 size={28} /></div>
            <h2 className="text-2xl font-bold text-[#203d30]">Practice complete!</h2>
            <p className="mt-3 text-[#718077]">You scored <strong className="text-[#174c3b]">{score} out of {questions.length}</strong>.</p>
            <button onClick={restart} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#174c3b] px-5 py-3 text-sm font-bold text-white"><RotateCcw size={16} /> Try again</button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between text-xs font-semibold text-[#849187]">
              <span className="inline-flex items-center gap-2"><BookOpen size={15} /> EVERYDAY KANNADA</span>
              <span>Question {index + 1} of {questions.length}</span>
            </div>
            <div className="mb-6 h-2 overflow-hidden rounded-full bg-[#edf1eb]"><div className="h-full rounded-full bg-[#47705a] transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
            <h2 className="text-xl font-bold leading-relaxed text-[#203d30]">{current.prompt}</h2>
            <div className="mt-6 grid gap-3">
              {current.options.map((option) => {
                const correct = option === current.answer
                const chosen = option === selected
                const style = selected && correct ? 'border-[#78a68a] bg-[#edf6ef] text-[#174c3b]' : chosen ? 'border-[#d89a8b] bg-[#fff1ed] text-[#914b3c]' : 'border-[#e6e9df] bg-white text-[#47594e] hover:border-[#8ca995]'
                return <button key={option} onClick={() => choose(option)} disabled={!!selected} className={`flex items-center justify-between rounded-xl border p-4 text-left text-sm font-semibold transition ${style}`}><span className="kannada">{option}</span>{selected && correct && <CheckCircle2 size={18} />}{chosen && !correct && <XCircle size={18} />}</button>
              })}
            </div>
            {selected && <div className="mt-5 rounded-xl bg-[#f7f8f4] p-4 text-sm"><p className="font-bold text-[#174c3b]">{selected === current.answer ? 'Correct!' : 'Not quite — here is the correct answer.'}</p><p className="mt-1 text-[#718077]">Answer: <span className="kannada font-semibold text-[#203d30]">{current.answer}</span> <span className="text-xs">({current.latin})</span></p><button onClick={next} className="mt-4 rounded-xl bg-[#174c3b] px-5 py-2.5 text-xs font-bold text-white">{index === questions.length - 1 ? 'See my score' : 'Next question'}</button></div>}
          </>
        )}
      </section>
    </>
  )
}
