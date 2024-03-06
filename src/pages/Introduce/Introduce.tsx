import styles from "./Introduce.module.css";
import Button from "@mui/material/Button";
import {
  conceptContent
} from "../../constants/content/conceptContent";
import { useNavigate } from "react-router-dom";

const Introduce = () => {
  const navigate = useNavigate();
  const btnSubHandle = () => {
    navigate("/guide");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.conceptContent}>
          {conceptContent.split("\n").map((value, index) => {
            return <p key={`para-${index}`}>{value}</p>;
          })}
        </div>
        <Button
          className={`${styles.btnSub}`}
          variant="outlined"
          size="large"
          onClick={btnSubHandle}
        >
          <p>Next</p>
        </Button>
      </div>
    </>
  );
};

export default Introduce;
