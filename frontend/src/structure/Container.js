function Container(props) {
  return (
    <div class="container align-items-center d-flex flex-column h-100">
      {props.children}
    </div>
  );
}

export default Container;