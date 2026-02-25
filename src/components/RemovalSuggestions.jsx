function SuggestionChip({ value, isActive, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      title={value}
      className={`cursor-pointer max-w-full truncate rounded-xl border px-3 py-1.5 text-xs transition sm:text-sm ${
        isActive
          ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)]'
          : 'border-[var(--border-strong)] bg-[var(--panel-muted)] hover:border-[var(--accent)]'
      }`}
    >
      {value}
    </button>
  )
}

function SuggestionGroup({ title, items, activeValue, onSelect }) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold tracking-[0.08em] text-[var(--text-muted)] uppercase">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <SuggestionChip
            key={`${title}-${item}`}
            value={item}
            isActive={item === activeValue}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}

function RemovalSuggestions({ suggestions, activeValue, onSelect }) {
  const hasSuggestions = suggestions.words.length > 0 || suggestions.phrases.length > 0

  return (
    <article className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--panel-bg)]/90 p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-5">
      <div className="mb-3 space-y-1">
        <h2 className="text-sm font-semibold tracking-[0.08em] text-[var(--text-muted)] uppercase">
          Варианты для удаления
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Нажмите на слово или предложение, чтобы подставить его в поле удаления.
        </p>
      </div>

      {hasSuggestions ? (
        <div className="space-y-3">
          <SuggestionGroup
            title="Частые слова"
            items={suggestions.words}
            activeValue={activeValue}
            onSelect={onSelect}
          />
          <SuggestionGroup
            title="Предложения"
            items={suggestions.phrases}
            activeValue={activeValue}
            onSelect={onSelect}
          />
        </div>
      ) : (
        <p className="text-sm text-[var(--text-muted)]">
          Добавьте больше текста в исходное поле, и здесь появятся рекомендации.
        </p>
      )}
    </article>
  )
}

export default RemovalSuggestions
