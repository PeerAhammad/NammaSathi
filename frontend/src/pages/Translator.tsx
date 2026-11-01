import { useState } from 'react'
import axios from 'axios'
import {
  ArrowDownUp,
  Check,
  Copy,
  Languages,
  LoaderCircle,
  Sparkles,
  AlertCircle,
} from 'lucide-react'
import PageHeading from '../components/ui/PageHeading'

type Language = 'English' | 'Kannada'

type Context =
  | 'general'
  | 'hospital'
  | 'shopping'
  | 'transport'
  | 'education'
  | 'workplace'

interface TranslationResponse {
  original_text: string
  translated_text: string
  source_language: string
  target_language: string
  context: string
}

const API_URL = 'http://127.0.0.1:8000/api/translate'

const languages: Language[] = ['English', 'Kannada']

const contexts: { value: Context; label: string }[] = [
  { value: 'general', label: 'General conversation' },
  { value: 'hospital', label: 'Hospital / Healthcare' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'transport', label: 'Transport' },
  { value: 'education', label: 'Education' },
  { value: 'workplace', label: 'Workplace' },
]

export default function Translator() {
  const [source, setSource] = useState<Language>('English')
  const [target, setTarget] = useState<Language>('Kannada')
  const [input, setInput] = useState('')
  const [context, setContext] = useState<Context>('general')
  const [result, setResult] = useState<TranslationResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const swap = () => {
    setSource(target)
    setTarget(source)
    setResult(null)
    setError('')
    setCopied(false)
  }

  const handleTranslate = async () => {
    if (!input.trim()) {
      setError('Please enter some text to translate.')
      return
    }

    if (source === target) {
      setError('Please select two different languages.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)
    setCopied(false)

    try {
      const response = await axios.post<TranslationResponse>(
        API_URL,
        {
          text: input.trim(),
          source_language: source,
          target_language: target,
          context,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 120000,
        },
      )

      setResult(response.data)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 422) {
          setError('Please check your text and selected options.')
        } else if (err.response?.status === 502) {
          setError('The translation service is temporarily unavailable. Please try again.')
        } else if (err.code === 'ECONNABORTED') {
          setError('The request timed out. Please try again.')
        } else if (!err.response) {
          setError('Cannot connect to NammaSathi server. Make sure the backend is running.')
        } else {
          setError('Something went wrong. Please try again.')
        }
      } else {
        setError('An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!result?.translated_text) return

    try {
      await navigator.clipboard.writeText(result.translated_text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Could not copy the translation. Please copy it manually.')
    }
  }

  return (
    <>
      <PageHeading
        eyebrow="Language helper"
        title="Translator"
        description="Translate everyday conversations with AI-powered contextual assistance."
      />

      <div className="mx-auto max-w-4xl rounded-3xl border border-[#e6e9df] bg-white p-5 shadow-sm md:p-7">
        {/* Language selection */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="flex min-w-[130px] flex-1 items-center gap-2 rounded-xl bg-[#f5f7f2] p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a978d]">
              From
            </span>
            <select
              value={source}
              onChange={(e) => {
                setSource(e.target.value as Language)
                setResult(null)
              }}
              className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#244735] outline-none"
            >
              {languages.map((language) => (
                <option key={language}>{language}</option>
              ))}
            </select>
          </div>

          <button
            onClick={swap}
            aria-label="Swap languages"
            title="Swap languages"
            className="rounded-xl border border-[#e6e9df] p-3 text-[#527060] transition hover:bg-[#edf3eb]"
          >
            <ArrowDownUp size={17} />
          </button>

          <div className="flex min-w-[130px] flex-1 items-center gap-2 rounded-xl bg-[#f5f7f2] p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a978d]">
              To
            </span>
            <select
              value={target}
              onChange={(e) => {
                setTarget(e.target.value as Language)
                setResult(null)
              }}
              className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#244735] outline-none"
            >
              {languages.map((language) => (
                <option key={language}>{language}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Context selection */}
        <div className="mb-5">
          <label
            htmlFor="translation-context"
            className="mb-2 block text-xs font-bold text-[#75847a]"
          >
            Conversation context
          </label>
          <select
            id="translation-context"
            value={context}
            onChange={(e) => setContext(e.target.value as Context)}
            className="w-full rounded-xl border border-[#e6e9df] bg-[#f8faf6] px-4 py-3 text-sm text-[#294336] outline-none focus:border-[#78947e]"
          >
            {contexts.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Input and output */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#e8ebe4] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-bold text-[#75847a]">
                Your text
              </span>
              <span className="text-[10px] text-[#a1aaa0]">
                {input.length}/500
              </span>
            </div>

            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value.slice(0, 500))
                setResult(null)
                setError('')
              }}
              placeholder="Type a phrase you want to translate..."
              maxLength={500}
              className="h-48 w-full resize-none bg-transparent text-sm leading-6 text-[#294336] outline-none placeholder:text-[#b0b9b0]"
            />
          </div>

          <div className="rounded-2xl border border-[#dce5d9] bg-[#f8faf6] p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#75847a]">
                <Sparkles size={14} />
                Translation
              </div>

              {result && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-[#527060] transition hover:bg-[#eaf0e7]"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              )}
            </div>

            <div className="h-48 overflow-y-auto">
              {loading ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <LoaderCircle
                      className="mx-auto mb-3 animate-spin text-[#527060]"
                      size={27}
                    />
                    <p className="text-sm font-semibold text-[#728277]">
                      Translating your text...
                    </p>
                    <p className="mt-2 text-xs text-[#9aa69b]">
                      Powered by Gemini AI
                    </p>
                  </div>
                </div>
              ) : result ? (
                <p
                  className={`whitespace-pre-wrap text-base leading-8 text-[#244735] ${
                    target === 'Kannada' ? 'kannada' : ''
                  }`}
                >
                  {result.translated_text}
                </p>
              ) : (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <Languages
                      className="mx-auto mb-3 text-[#a4b5a5]"
                      size={27}
                    />
                    <p className="text-sm font-semibold text-[#728277]">
                      Your translation will appear here
                    </p>
                    <p className="mt-2 text-xs text-[#9aa69b]">
                      Enter text and select Translate.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-xs leading-5 text-red-700"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {/* Translate button */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[#9aa69b]">
            AI-powered translation with real-life context.
          </p>

          <button
            onClick={handleTranslate}
            disabled={!input.trim() || loading || source === target}
            className="flex items-center gap-2 rounded-xl bg-[#174c3b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#23634d] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? (
              <>
                <LoaderCircle size={16} className="animate-spin" />
                Translating...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Translate
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mx-auto mt-5 flex max-w-4xl items-start gap-3 rounded-2xl bg-[#f0e8d8] p-4 text-xs leading-5 text-[#77694f]">
        <Languages size={16} className="mt-0.5 shrink-0" />
        <p>
          <strong>Communication tip:</strong> Short, clear sentences are easier
          to communicate. Select a situation to help the AI produce a more
          context-aware translation.
        </p>
      </div>
    </>
  )
}

