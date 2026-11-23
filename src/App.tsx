import { env } from '@/lib/env'

/**
 * Phase 0 placeholder screen. It only proves that the toolchain works.
 * It is replaced by the application shell and router in Phase 2.
 */
export default function App() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">AlertTree</h1>
      <p>Never Miss. Never Forget. Stay Ahead.</p>
      <p className="text-sm opacity-80">
        Project scaffold is running. No backend is connected and no product features exist yet.
      </p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
        <dt className="font-medium">API base path</dt>
        <dd>{env.apiBaseUrl}</dd>
        <dt className="font-medium">Demo mode</dt>
        <dd>{env.demoMode ? 'on (demo data will be labeled)' : 'off'}</dd>
      </dl>
    </main>
  )
}
