function TextArea(props) {
  return (
    <div id="text-area">
      <h3 id="description">{props.description}</h3>
      <div id="details">{props.details}</div>
    </div>
  );
}
export default TextArea;
