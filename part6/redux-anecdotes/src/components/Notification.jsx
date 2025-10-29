import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const notification = useSelector((store) => store.notification)

  return (
    <>
      {notification && (
        <div style={style}>
          {notification}
        </div>
        )
      }
    </>
  )
}

export default Notification
