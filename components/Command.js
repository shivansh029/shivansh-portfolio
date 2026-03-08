import Input from "./Input";
import Output from "./Output";

export default function Command({ id, command, output, onSubmit }) {
  return (
    <div id={id}>
      <Input command={command} onSubmit={(command) => onSubmit(command)} />
      <Output output={output} />
    </div>
  );
}
