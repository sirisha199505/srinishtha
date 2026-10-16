import { Link } from 'react-router-dom'

// One link primitive: router links for internal paths, <a> for external URLs.
export function SmartLink({ to, href, children, ...rest }) {
  const target = to ?? href
  if (!target) return <span {...rest}>{children}</span>
  if (/^(https?:|mailto:|tel:)/.test(target)) {
    const external = target.startsWith('http')
    return (
      <a href={target} {...(external && { target: '_blank', rel: 'noopener noreferrer' })} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link to={target} {...rest}>
      {children}
    </Link>
  )
}
