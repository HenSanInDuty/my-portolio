import styles from "./ErrorPage.module.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  const btnSubHandle = () => {
    navigate("/");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.conceptContent}>
          <p>SOS you just go wrong way :V</p>
        </div>
        <Button
          className={`${styles.btnSub}`}
          variant="outlined"
          size="large"
          onClick={btnSubHandle}
        >
          <p>Back Home</p>
        </Button>
      </div>
    </>
  );
};

export default ErrorPage;
