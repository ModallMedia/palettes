import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'inline-flex justify-center rounded-md py-1 px-4 text-base font-semibold tracking-tight shadow-sm focus:outline-none',
  outline:
    'inline-flex justify-center rounded-md border py-[calc(theme(spacing.1)-1px)] px-[calc(theme(spacing.4)-1px)] text-base font-semibold tracking-tight focus:outline-none',
}

const variantStyles = {
  solid: {
    slate:
      'bg-zinc-900 text-white hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 active:bg-zinc-700 active:text-white/80 disabled:opacity-30 disabled:hover:bg-zinc-900',
    blue: 'bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 active:bg-emerald-700 active:text-white/80 disabled:opacity-30 disabled:hover:bg-emerald-600',
    white:
      'bg-white text-emerald-600 hover:text-emerald-700 focus-visible:text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-emerald-50 active:text-emerald-900/80 disabled:opacity-40 disabled:hover:text-emerald-600',
  },
  outline: {
    slate:
      'border-zinc-200 text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 active:border-zinc-200 active:bg-zinc-50 active:text-zinc-900/70 disabled:opacity-40 disabled:hover:border-zinc-200 disabled:hover:bg-transparent',
    blue: 'border-emerald-300 text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 active:text-emerald-600/70 disabled:opacity-40 disabled:hover:border-emerald-300 disabled:hover:bg-transparent',
  },
}

type ButtonProps = (
  | {
      variant?: 'solid'
      color?: keyof typeof variantStyles.solid
    }
  | {
      variant: 'outline'
      color?: keyof typeof variantStyles.outline
    }
) &
  (
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'color'>
    | (Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> & {
        href?: undefined
      })
  )

export function Button({ className, ...props }: ButtonProps) {
  props.variant ??= 'solid'
  props.color ??= 'slate'

  className = clsx(
    baseStyles[props.variant],
    props.variant === 'outline'
      ? variantStyles.outline[props.color]
      : props.variant === 'solid'
        ? variantStyles.solid[props.color]
        : undefined,
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
