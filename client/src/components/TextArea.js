function TextArea(props) {
  return (
    <div id="text-area">
      <h3>{props.description}</h3>
      <div>{props.details}</div>
    </div>
  );
}
export default TextArea;
