import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

interface IHashtagLinkProps {
  title: string
  className?: string
}

const HashtagLink: React.FC<IHashtagLinkProps> = props => {
  const { title, className } = props

  return (
    <Link href={`/hashtag/${title.replaceAll(' ', '_')}`}>
      <a className={clsx('block text-sm text-gold', className)}>#{title}</a>
    </Link>
  )
}

export default HashtagLink
