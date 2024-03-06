import styles from "./LabelInput.module.css";
type PropType = {
    name:string
} 

const LabelInput = ({name}:PropType) => {
    return (
        <div className={`${styles.groupInput}`}>
            <p>{name}:</p>
            <input className={styles.input}></input>
        </div>
    )
}

export default LabelInput;