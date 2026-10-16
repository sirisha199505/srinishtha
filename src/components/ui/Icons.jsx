// One line-icon family (1.5px stroke, 24px grid) used across the site.
function Icon({ children, className = 'size-5', ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  )
}

export const ArrowRight = (p) => (
  <Icon {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
)
export const ArrowUpRight = (p) => (
  <Icon {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Icon>
)
export const ChevronDown = (p) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
)
export const Menu = (p) => (
  <Icon {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
)
export const Close = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
)
export const Check = (p) => (
  <Icon {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Icon>
)
export const Eye = (p) => (
  <Icon {...p}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
)
export const EyeOff = (p) => (
  <Icon {...p}>
    <path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.2M6.6 6.6C3.7 8.5 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18" />
  </Icon>
)
export const Mail = (p) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </Icon>
)
export const Phone = (p) => (
  <Icon {...p}>
    <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
  </Icon>
)
export const Pin = (p) => (
  <Icon {...p}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Icon>
)
