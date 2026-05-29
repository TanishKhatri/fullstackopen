const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const errorStyle = {
    width: '80vw',
    padding: '20px 40px',
    border: '6px solid red',
    borderRadius: '5px',
    color: 'red',
    backgroundColor: 'lightgray',
    fontSize: '1.6rem'
  }

  const successStyle = {
    width: '80vw',
    padding: '20px 40px',
    border: '6px solid green',
    borderRadius: '5px',
    color: 'green',
    backgroundColor: 'lightgray',
    fontSize: '1.6rem'
  }

  return (
    <div style={isError ? errorStyle : successStyle}>{message}</div>
  )
}

export default Notification