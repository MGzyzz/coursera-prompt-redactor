function SlotCard({ index, value, onSave, onUse }) {
  const hasValue = value.trim().length > 0

  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--panel-muted)] p-2.5">
      <p className="mb-1 text-xs font-semibold tracking-[0.08em] text-[var(--text-muted)] uppercase">
        Слот {index + 1}
      </p>
      <p className="mb-2 h-9 overflow-hidden text-xs leading-4 text-[var(--text-muted)]">
        {hasValue ? value : 'Пусто'}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSave(index)}
          className="cursor-pointer inline-flex min-w-[96px] flex-1 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--panel-bg)] px-2 py-1 text-xs font-semibold leading-4 whitespace-nowrap transition hover:border-[var(--accent)]"
        >
          Сохранить
        </button>
        <button
          type="button"
          onClick={() => onUse(index)}
          disabled={!hasValue}
          className="cursor-pointer inline-flex min-w-[96px] flex-1 items-center justify-center rounded-lg border border-[var(--accent)] bg-[var(--accent)] px-2 py-1 text-xs font-semibold leading-4 whitespace-nowrap text-[var(--accent-contrast)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Вставить
        </button>
      </div>
    </div>
  )
}

function RemoveTextSlots({ slots, onSaveSlot, onUseSlot }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {slots.map((slotValue, slotIndex) => (
        <SlotCard
          key={`remove-slot-${slotIndex}`}
          index={slotIndex}
          value={slotValue}
          onSave={onSaveSlot}
          onUse={onUseSlot}
        />
      ))}
    </div>
  )
}

export default RemoveTextSlots
