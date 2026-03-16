import Input from "./Input";
import Output from "./Output";

export default function Command({ id, command, output, onSubmit, history }) {
  return (
    <div id={id}>
      <Input command={command} onSubmit={(command) => onSubmit(command)} history={history} />
      <Output output={output} />
    </div>
  );
}
