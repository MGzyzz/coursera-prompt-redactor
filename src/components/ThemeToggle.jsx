function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      className="cursor-pointer inline-flex items-center gap-2 rounded-2xl border border-[var(--border-strong)] bg-[var(--panel-muted)] px-3 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--accent)]"
      aria-label="Переключить тему"
    >
      <span className="inline-flex h-7 w-14 items-center rounded-full bg-[var(--switch-track)] p-1">
        <span
          className={`h-5 w-5 rounded-full bg-[var(--switch-thumb)] shadow-sm transition-transform duration-300 ${
            isDark ? 'translate-x-7' : 'translate-x-0'
          }`}
        />
      </span>
      <span>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}

export default ThemeToggle
