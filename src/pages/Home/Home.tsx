import LabelInput from "../../components/LabelInput/LabelInput";
import styles from "./Home.module.css";
import Button from "@mui/material/Button";
import {
  conceptContent,
  agreeContent,
} from "../../constants/content/conceptContent";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const inputLabel = ["Name", "StudentId"];
  const navigate = useNavigate();
  const btnSubHandle = () => {
    navigate("/introduce");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.groupInput}>
          {inputLabel.map((value, index) => {
            return <LabelInput key={`il-${index}`} name={value}></LabelInput>;
          })}
        </div>
        <div className={styles.conceptContent}>
          {conceptContent.split("\n").map((value, index) => {
            return <p key={`para-${index}`}>{value}</p>;
          })}
        </div>
        <div className={`${styles.groupInput} ${styles.checkInput}`}>
          <input type="checkbox"></input>
          <p>{agreeContent}</p>
        </div>
        <Button
          className={`${styles.btnSub}`}
          variant="outlined"
          size="large"
          onClick={() => {
            btnSubHandle();
          }}
        >
          <p>Submit</p>
        </Button>
      </div>
    </>
  );
};

export default Home;
