import { SiClaude, SiGooglegemini, SiOpenai } from 'react-icons/si'

function StatChip({ label, value }) {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--panel-muted)] px-3 py-2">
      <p className="text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase">{label}</p>
      <p className="text-base font-semibold">{value}</p>
    </div>
  )
}

const AI_LINKS = [
  {
    name: 'Claude',
    icon: <SiClaude className="h-4 w-4" aria-hidden="true" />,
    buildUrl: (encodedText) => `https://claude.ai/new?q=${encodedText}`,
  },
  {
    name: 'Gemini',
    icon: <SiGooglegemini className="h-4 w-4" aria-hidden="true" />,
    buildUrl: (encodedText) => `https://gemini.google.com/app?prompt=${encodedText}`,
  },
]

function ActionBar({
  sourceLength,
  resultLength,
  resultText,
  chatGptChatId,
  onChatGptChatIdChange,
  matchesFound,
  matchesRemoved,
  onClear,
}) {
  const encodedResult = encodeURIComponent(resultText.trim())
  const hasResult = encodedResult.length > 0
  const normalizedChatId = chatGptChatId.trim()

  const openLink = (url) => {
    if (!hasResult) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleOpenChatGpt = () => {
    const chatGptUrl = normalizedChatId
      ? `https://chatgpt.com/c/${encodeURIComponent(normalizedChatId)}?q=${encodedResult}`
      : `https://chatgpt.com/?q=${encodedResult}`

    openLink(chatGptUrl)
  }

  return (
    <article className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--panel-bg)]/90 p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-5">
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onClear}
          className="cursor-pointer rounded-2xl border border-[var(--border-strong)] bg-[var(--panel-muted)] px-4 py-2 text-sm font-semibold transition hover:border-[var(--accent)]"
        >
          Очистить всё
        </button>

        <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-strong)] bg-[var(--panel-muted)] px-2 py-1.5">
          <button
            type="button"
            onClick={handleOpenChatGpt}
            disabled={!hasResult}
            title="Открыть в ChatGPT"
            aria-label="Открыть результат в ChatGPT"
            className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--panel-bg)] transition hover:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <SiOpenai className="h-4 w-4" aria-hidden="true" />
          </button>
          <input
            type="text"
            value={chatGptChatId}
            onChange={(event) => onChatGptChatIdChange(event.target.value)}
            placeholder="ChatGPT ID"
            aria-label="ChatGPT Chat ID"
            className="w-32 rounded-lg border border-[var(--border-strong)] bg-[var(--panel-bg)] px-2 py-1 text-xs outline-none transition focus:border-[var(--accent)] sm:w-40 sm:text-sm"
          />
        </div>

        {AI_LINKS.map(({ name, icon, buildUrl }) => (
          <button
            key={name}
            type="button"
            onClick={() => openLink(buildUrl(encodedResult))}
            disabled={!hasResult}
            title={`Открыть в ${name}`}
            aria-label={`Открыть результат в ${name}`}
            className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-[var(--panel-muted)] text-base transition hover:border-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {icon}
          </button>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <StatChip label="Символов в исходнике" value={sourceLength} />
        <StatChip label="Символов в результате" value={resultLength} />
        <StatChip label="Найдено вхождений" value={matchesFound} />
        <StatChip label="Удалено вхождений" value={matchesRemoved} />
      </div>
    </article>
  )
}

export default ActionBar
