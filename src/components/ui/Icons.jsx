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
export const Home = (p) => (
  <Icon {...p}>
    <path d="m3 10.5 9-7 9 7V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z" />
  </Icon>
)
export const Grid = (p) => (
  <Icon {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </Icon>
)
export const Layers = (p) => (
  <Icon {...p}>
    <path d="m12 3 9 5-9 5-9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </Icon>
)
export const Briefcase = (p) => (
  <Icon {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" />
  </Icon>
)
export const Dots = (p) => (
  <Icon {...p}>
    <circle cx="5" cy="12" r="1.25" />
    <circle cx="12" cy="12" r="1.25" />
    <circle cx="19" cy="12" r="1.25" />
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
export const Code = (p) => (
  <Icon {...p}>
    <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
  </Icon>
)
export const Devices = (p) => (
  <Icon {...p}>
    <rect x="2.5" y="4" width="14" height="10" rx="1.5" />
    <path d="M6 18h7" />
    <rect x="17" y="8" width="4.5" height="11" rx="1" />
  </Icon>
)
export const Transform = (p) => (
  <Icon {...p}>
    <path d="M4 7h11l-3-3M20 17H9l3 3" />
    <circle cx="19" cy="7" r="1.5" />
    <circle cx="5" cy="17" r="1.5" />
  </Icon>
)
export const Cloud = (p) => (
  <Icon {...p}>
    <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5Z" />
  </Icon>
)
export const Spark = (p) => (
  <Icon {...p}>
    <path d="M4 19V9M9 19V5M14 19v-7M19 19v-4" />
    <path d="m17 4 .6 1.4L19 6l-1.4.6L17 8l-.6-1.4L15 6l1.4-.6Z" />
  </Icon>
)
export const Shield = (p) => (
  <Icon {...p}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
)
export const Compass = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5Z" />
  </Icon>
)
export const Refresh = (p) => (
  <Icon {...p}>
    <path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5" />
  </Icon>
)
export const Quote = (p) => (
  <Icon {...p}>
    <path d="M9.5 7C6.5 7.8 5 10 5 13v4h5v-5H7.2c.2-1.8 1.1-2.9 2.8-3.5ZM18.5 7c-3 .8-4.5 3-4.5 6v4h5v-5h-2.8c.2-1.8 1.1-2.9 2.8-3.5Z" />
  </Icon>
)
export const Linkedin = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
  </Icon>
)

export const Database = (p) => (
  <Icon {...p}>
    <ellipse cx="12" cy="6" rx="7" ry="2.5" />
    <path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
  </Icon>
)
export const Building = (p) => (
  <Icon {...p}>
    <path d="M4 21V5l8-2v18M12 8l8 2v11M3 21h18M7.5 8h1M7.5 12h1M7.5 16h1M15.5 13h1M15.5 17h1" />
  </Icon>
)
export const Network = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="5" r="2" />
    <circle cx="5" cy="18" r="2" />
    <circle cx="19" cy="18" r="2" />
    <path d="M11 6.8 6 16.2M13 6.8l5 9.4M7 18h10" />
  </Icon>
)

const NAMED = { code: Code, devices: Devices, transform: Transform, cloud: Cloud, spark: Spark, shield: Shield, compass: Compass, refresh: Refresh, database: Database, building: Building, network: Network }

// Icon by content key, so copy files can name icons as strings.
export function NamedIcon({ name, ...rest }) {
  const Component = NAMED[name] || Grid
  return <Component {...rest} />
}

export const Play = (p) => (
  <Icon {...p}>
    <path d="M7 4.5v15l12-7.5-12-7.5Z" />
  </Icon>
)

export const Pause = (p) => (
  <Icon {...p}>
    <path d="M8 5v14M16 5v14" />
  </Icon>
)
