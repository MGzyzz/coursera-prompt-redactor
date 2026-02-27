import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

const projectRoot = fileURLToPath(new URL('.', import.meta.url))

const normalizeHost = (value) => {
  const trimmed = value.trim()

  if (!trimmed) return ''

  if (trimmed.includes('://')) {
    try {
      return new URL(trimmed).hostname
    } catch {
      return ''
    }
  }

  return trimmed.replace(/^https?:\/\//, '').split('/')[0].split(':')[0]
}

const parseAllowedHosts = (rawHosts) =>
  rawHosts
    .split(',')
    .map(normalizeHost)
    .filter(Boolean)

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, projectRoot, '')
  const allowedHosts = parseAllowedHosts(env.VITE_ALLOWED_HOSTS ?? '')

  return {
    plugins: [react(), tailwindcss()],
    server: allowedHosts.length > 0 ? { allowedHosts } : undefined,
  }
})
