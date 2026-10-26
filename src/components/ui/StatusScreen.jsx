// Shown before content arrives or when the content API is unreachable.
// Must not depend on the site payload (it renders when there is none).
export function StatusScreen({ loading = false }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      {loading ? (
        <div role="status" aria-label="Loading" className="h-0.5 w-32 overflow-hidden bg-line">
          <div className="h-full w-1/3 animate-[pulse_1.2s_ease-in-out_infinite] bg-accent" />
        </div>
      ) : (
        <div className="max-w-md text-center">
          <img src="/images/logo1.png" alt="Srinishtha" width="160" height="34" className="mx-auto h-8 w-auto" />
          <p className="mt-6 text-body">This page could not be loaded. Please refresh, or write to us at</p>
          <a className="mt-1 inline-block font-medium text-accent-strong" href="mailto:info@srinishtha.com">
            info@srinishtha.com
          </a>
        </div>
      )}
    </div>
  )
}
