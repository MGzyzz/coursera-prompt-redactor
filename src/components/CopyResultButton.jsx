import { FiCheck, FiCopy, FiX } from 'react-icons/fi'

function CopyResultButton({ copyStatus, onCopy }) {
  const isCopied = copyStatus === 'copied'
  const isError = copyStatus === 'error'
  const buttonTitle = isCopied ? 'Скопировано' : isError ? 'Ошибка копирования' : 'Копировать результат'

  return (
    <button
      type="button"
      onClick={onCopy}
      title={buttonTitle}
      className={`cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-lg border text-sm shadow-sm transition ${
        isCopied
          ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-300'
          : isError
            ? 'border-red-500/60 bg-red-500/15 text-red-300'
            : 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-contrast)] hover:brightness-105'
      }`}
      aria-label={buttonTitle}
    >
      {isCopied ? (
        <FiCheck className="h-4 w-4" aria-hidden="true" />
      ) : isError ? (
        <FiX className="h-4 w-4" aria-hidden="true" />
      ) : (
        <FiCopy className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}

export default CopyResultButton
