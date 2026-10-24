import { useState } from 'react'
import type { FormEvent } from 'react'
import { footerLinkGroups } from '../../data/navigation'
import { subscribeToDispatches } from '../../utils/subscribe'
import { cn } from '../../utils/cn'
import { Container } from '../common/Container'
import { MaterialIcon } from '../common/MaterialIcon'

interface FormStatus {
  kind: 'idle' | 'error' | 'info'
  message: string
}

/**
 * Complete footer: brand statement, dispatch subscription interface,
 * three link groups and the legal line.
 */
export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormStatus>({ kind: 'idle', message: '' })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void subscribeToDispatches(email).then((result) => {
      setStatus({ kind: result.ok ? 'info' : 'error', message: result.message })
      if (result.ok) setEmail('')
    })
  }

  return (
    <footer
      id="footer"
      className="w-full bg-surface-container-low text-on-surface pt-margin-lg pb-margin-md shadow-[0_-1px_8px_rgba(24,27,32,0.02)]"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter-lg pb-margin-lg">
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container shadow-[0_0_8px_#ff5733]" />
              <span className="font-headline-md text-headline-md tracking-tight text-on-surface">
                Studytainment
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              An integrated learning and human-development ecosystem spanning ages 3 to 30. Designed
              with tactile warmth, academic rigor, and radiant optimism so growth never feels like a
              burden.
            </p>
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-xs mt-space-sm max-w-md"
            >
              <label htmlFor="dispatch-email" className="sr-only">
                Email address
              </label>
              <input
                id="dispatch-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-describedby="dispatch-status"
                placeholder="Enter your email for dispatches"
                className="flex-1 min-w-0 px-space-md py-space-sm bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-container transition-all placeholder:text-on-surface-variant/60"
              />
              <button
                type="submit"
                className="px-space-lg py-space-sm bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-lg transition-all"
              >
                Subscribe
              </button>
            </form>
            <p
              id="dispatch-status"
              role="status"
              aria-live="polite"
              className={cn(
                'font-body-sm text-body-sm min-h-5 max-w-md',
                status.kind === 'error' ? 'text-error' : 'text-on-surface-variant',
              )}
            >
              {status.message}
            </p>
          </div>

          {footerLinkGroups.map((group) => (
            <div
              key={group.title}
              className={cn(
                'flex flex-col gap-space-sm',
                group.title === 'Lifelong Pathways' && 'lg:col-span-3',
                (group.title === 'Documentation' || group.title === 'Channels') && 'lg:col-span-2',
              )}
            >
              <span className="font-title text-title text-on-surface">{group.title}</span>
              <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={`#${link.sectionId}`}
                      className={cn(
                        'hover:text-primary transition-colors',
                        link.icon && 'flex items-center gap-space-xs',
                      )}
                    >
                      {link.icon ? <MaterialIcon name={link.icon} className="text-[18px]" /> : null}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md text-on-surface-variant font-body-sm text-body-sm">
          <p>© 2025 Studytainment Ecosystem. All rights reserved.</p>
          <div className="flex items-center gap-space-lg font-label-sm text-label-sm">
            <span>Warm Editorial Modernism</span>
            <span>Crafted for Ages 3–30</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
