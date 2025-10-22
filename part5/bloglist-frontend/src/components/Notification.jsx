const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const baseStyle = {
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '1rem',
    fontWeight: 'bold',
  }

  const style = type === 'error'
    ? { ...baseStyle, color: 'red', border: '1px solid red', background: '#ffe5e5' }
    : { ...baseStyle, color: 'green', border: '1px solid green', background: '#e5ffe5' }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
