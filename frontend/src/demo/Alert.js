function Alert(props) {
  return (
    <div class={"alert alert-dismissible alert-danger" + (props.disabled ? " d-none" : "")}>
      <strong>Something went wrong:</strong> {props.errorCode} {props.errorMessage}
    </div>
  );
}

export default Alert;