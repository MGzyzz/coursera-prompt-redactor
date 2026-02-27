import { useEffect, useMemo, useState } from 'react'
import ActionBar from './components/ActionBar'
import CopyResultButton from './components/CopyResultButton'
import OptionsPanel from './components/OptionsPanel'
import RemovalSuggestions from './components/RemovalSuggestions'
import RemoveTextSlots from './components/RemoveTextSlots'
import TextAreaCard from './components/TextAreaCard'
import ThemeToggle from './components/ThemeToggle'
import { STORAGE_KEYS } from './constants/storageKeys'
import { useTheme } from './hooks/useTheme'
import { buildRemovalSuggestions } from './utils/removalSuggestions'
import { removeRequestedText } from './utils/textProcessor'

const EMPTY_REMOVE_TEXT_SLOTS = ['', '']

const getInitialRemoveTextSlots = () => {
  if (typeof window === 'undefined') return EMPTY_REMOVE_TEXT_SLOTS

  const storedValue = window.localStorage.getItem(STORAGE_KEYS.removeTextSlots)

  if (!storedValue) return EMPTY_REMOVE_TEXT_SLOTS

  try {
    const parsed = JSON.parse(storedValue)

    if (!Array.isArray(parsed)) {
      return EMPTY_REMOVE_TEXT_SLOTS
    }

    return [String(parsed[0] ?? ''), String(parsed[1] ?? '')]
  } catch {
    return EMPTY_REMOVE_TEXT_SLOTS
  }
}

function App() {
  const [sourceText, setSourceText] = useState(
    'You are bot and you need to attended every message with calm tone.',
  )
  const [textToRemove, setTextToRemove] = useState('and you need to ')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [removeAllOccurrences, setRemoveAllOccurrences] = useState(true)
  const [copyStatus, setCopyStatus] = useState('idle')
  const [removeTextSlots, setRemoveTextSlots] = useState(getInitialRemoveTextSlots)
  const [chatGptChatId, setChatGptChatId] = useState(() => {
    if (typeof window === 'undefined') return ''
    return window.localStorage.getItem(STORAGE_KEYS.chatGptChatId) ?? ''
  })
  const { theme, toggleTheme } = useTheme()

  const suggestions = useMemo(() => buildRemovalSuggestions(sourceText), [sourceText])

  const { resultText, matchesFound, matchesRemoved } = useMemo(
    () =>
      removeRequestedText({
        sourceText,
        textToRemove,
        caseSensitive,
        removeAllOccurrences,
      }),
    [sourceText, textToRemove, caseSensitive, removeAllOccurrences],
  )

  useEffect(() => {
    if (copyStatus === 'idle') return undefined

    const timeoutId = window.setTimeout(() => setCopyStatus('idle'), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [copyStatus])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.chatGptChatId, chatGptChatId)
  }, [chatGptChatId])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.removeTextSlots, JSON.stringify(removeTextSlots))
  }, [removeTextSlots])

  const handleClear = () => {
    setSourceText('')
    setTextToRemove('')
    setCopyStatus('idle')
  }

  const handleSaveRemoveSlot = (slotIndex) => {
    setRemoveTextSlots((previousSlots) =>
      previousSlots.map((slotValue, index) => (index === slotIndex ? textToRemove : slotValue)),
    )
  }

  const handleUseRemoveSlot = (slotIndex) => {
    setTextToRemove(removeTextSlots[slotIndex] ?? '')
  }

  const handleCopyResult = async () => {
    if (!navigator.clipboard) {
      setCopyStatus('error')
      return
    }

    try {
      await navigator.clipboard.writeText(resultText)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('error')
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-12 top-20 h-64 w-64 rounded-full bg-[var(--glow-primary)] blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[var(--glow-secondary)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[var(--glow-tertiary)] blur-3xl" />
      </div>

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-10">
        <header className="flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-[var(--border-subtle)] bg-[var(--panel-bg)]/80 p-5 shadow-[var(--shadow-soft)] backdrop-blur-xl">
          <div className="space-y-2">
            <p className="inline-flex rounded-full border border-[var(--border-subtle)] px-3 py-1 text-xs font-semibold tracking-[0.2em] text-[var(--text-muted)] uppercase">
              Prompt Redactor
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Редактор текста для точечного удаления фрагментов
            </h1>
            <p className="max-w-3xl text-sm text-[var(--text-muted)] sm:text-base">
              Вставьте исходный текст, задайте удаляемый фрагмент и сразу получите результат.
              Интерфейс работает в светлой и тёмной теме.
            </p>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          <TextAreaCard
            id="source-text"
            title="Основной текст"
            subtitle="Текст, который нужно обработать."
            value={sourceText}
            placeholder="Вставьте исходный текст..."
            onChange={setSourceText}
          />
          <TextAreaCard
            id="remove-text"
            title="Фрагмент для удаления"
            subtitle="Укажите текст, который нужно убрать."
            value={textToRemove}
            placeholder="Введите часть текста для удаления..."
            rows={6}
            onChange={setTextToRemove}
            footerAction={
              <RemoveTextSlots
                slots={removeTextSlots}
                onSaveSlot={handleSaveRemoveSlot}
                onUseSlot={handleUseRemoveSlot}
              />
            }
          />
          <TextAreaCard
            id="result-text"
            title="Результат"
            subtitle="Финальный текст после удаления фрагментов."
            value={resultText}
            placeholder="Здесь появится результат..."
            readOnly
            textareaAction={<CopyResultButton copyStatus={copyStatus} onCopy={handleCopyResult} />}
          />
        </section>

        <RemovalSuggestions
          suggestions={suggestions}
          activeValue={textToRemove}
          onSelect={setTextToRemove}
        />

        <section className="grid gap-4 xl:grid-cols-[1.4fr,1fr]">
          <ActionBar
            sourceLength={sourceText.length}
            resultLength={resultText.length}
            resultText={resultText}
            chatGptChatId={chatGptChatId}
            onChatGptChatIdChange={setChatGptChatId}
            matchesFound={matchesFound}
            matchesRemoved={matchesRemoved}
            onClear={handleClear}
          />
          <OptionsPanel
            caseSensitive={caseSensitive}
            removeAllOccurrences={removeAllOccurrences}
            onCaseSensitiveChange={setCaseSensitive}
            onRemoveAllChange={setRemoveAllOccurrences}
          />
        </section>
      </main>
    </div>
  )
}

export default App
