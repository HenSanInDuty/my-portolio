import styles from "./Test.module.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import dogUnit47 from "../../assets/img/guide/dogUnit437.png";
import dogGradCam from "../../assets/img/guide/dogGradCam.png";
import dogOrigin from "../../assets/img/guide/dogClass.png";

const Test = () => {
  const navigate = useNavigate();

  const btnSubHandle = () => {
    navigate("/survey");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.conceptContent}>
          <div className={styles.guideContent}>
            <div className={styles.classExplanation}>
              <div className={styles.question}>
                <p>Which should be explanation for class: "Dog"</p>
                <img src={dogOrigin}></img>
              </div>
              <div className={styles.imgWithRaioGroup}>
                <div className={styles.imgWithRadio}>
                  <img src={dogUnit47}></img>
                  <input name="dog" type="radio"></input>
                </div>
                <div className={styles.imgWithRadio}>
                  <img src={dogGradCam}></img>
                  <input name="dog" type="radio"></input>
                </div>
                <div className={styles.imgWithRadio}>
                  <img src={dogUnit47}></img>
                  <input name="dog" type="radio"></input>
                </div>
                <div className={styles.imgWithRadio}>
                  <img src={dogGradCam}></img>
                  <input name="dog" type="radio"></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button
              className={`${styles.btnSub}`}
              variant="outlined"
              size="large"
            >
              <p>Back</p>
            </Button>
            <Button
              className={`${styles.btnSub}`}
              variant="outlined"
              size="large"
              onClick={() => {
                btnSubHandle();
              }}
            >
              <p>Next</p>
            </Button>
              <Button
                className={`${styles.btnSub}`}
                variant="outlined"
                size="large"
                disabled={true}
              >
                <p>1/12</p>
              </Button>
          </div>
      </div>
    </>
  );
};

export default Test;
