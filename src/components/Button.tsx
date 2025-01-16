export const Button = (props: Props) => {
  const { title, onClick } = props
  return <button onClick={onClick}>{title}</button>
}

type Props = {
  title: string
  onClick?: () => void
}
