import styles from "./Survey.module.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Survey = () => {
  const navigate = useNavigate();
  const btnSubHandle = () => {
    navigate("/");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.conceptContent}>
          <p>Survey</p>
        </div>
        <Button
          className={`${styles.btnSub}`}
          variant="outlined"
          size="large"
          onClick={btnSubHandle}
        >
          <p>Start Survey</p>
        </Button>
      </div>
    </>
  );
};

export default Survey;
