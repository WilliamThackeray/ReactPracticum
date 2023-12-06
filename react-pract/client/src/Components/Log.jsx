

export default function Log({props}) {
  const date = props.date
  const text = props.text

  function minMax() {
    console.log('minMax()')
    let li = document.querySelector('li')
    if (li.classList.contains('min')) {
      li.classList.remove('min')
    } else {
      li.classList.add('min')
    }
  }

  return (
    <div>
      <li onClick={minMax}>
        <small>{date}</small>
        <p>{text}</p>
      </li>
    </div>
  )

}