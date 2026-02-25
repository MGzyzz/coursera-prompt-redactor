function StatChip({ label, value }) {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--panel-muted)] px-3 py-2">
      <p className="text-xs tracking-[0.08em] text-[var(--text-muted)] uppercase">{label}</p>
      <p className="text-base font-semibold">{value}</p>
    </div>
  )
}

function ActionBar({
  sourceLength,
  resultLength,
  matchesFound,
  matchesRemoved,
  onClear,
}) {
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
