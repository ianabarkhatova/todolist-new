export const Button = (props: Props) => {
  const { title, onClick, className } = props
  return (
    <button onClick={onClick} className={className}>
      {title}
    </button>
  )
}

type Props = {
  title: string
  onClick?: () => void
  className?: string
}
