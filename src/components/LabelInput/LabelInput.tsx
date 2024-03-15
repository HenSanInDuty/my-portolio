import styles from "./LabelInput.module.css";
type PropType = {
  name: string;
  inputValue: string;
  onChange: (e?:React.ChangeEvent<HTMLInputElement>) => void;
};

const LabelInput = ({ name, inputValue, onChange }: PropType) => {
  return (
    <div className={`${styles.groupInput}`}>
      <p>{name}:</p>
      <input className={styles.input} value={inputValue} onChange={(e) => {onChange(e);}}></input>
    </div>
  );
};

export default LabelInput;
