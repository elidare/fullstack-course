import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, success } = useSelector((store) => store.notification)
  const type = success ? 'success' : 'error'

  const baseStyle = {
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "1rem",
    fontWeight: "bold",
  };

  const style =
    type === "error"
      ? {
          ...baseStyle,
          color: "red",
          border: "1px solid red",
          background: "#ffe5e5",
        }
      : {
          ...baseStyle,
          color: "green",
          border: "1px solid green",
          background: "#e5ffe5",
        };

  return (
    <div>
      {message && (
        <div style={style} className={type}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Notification;
