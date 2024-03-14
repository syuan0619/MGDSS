const QMG = ({
  setReplaceComponent,
}: {
  setReplaceComponent: (table: string) => void;
}) => {
  return (
    <button onClick={() => setReplaceComponent("right")}>backtoright</button>
  );
};
export default QMG;
