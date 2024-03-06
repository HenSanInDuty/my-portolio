import styles from "./Guide.module.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import seven from "../../assets/img/guide/servenGuide.png";
import conductances from "../../assets/img/guide/conductancesGuide.png";
import dogUnit47 from "../../assets/img/guide/dogUnit437.png";
import dogGradCam from "../../assets/img/guide/dogGradCam.png";
import dogOrigin from "../../assets/img/guide/dogClass.png";

const Guide = () => {
  enum GuideStep {
    One,
    Two,
  }
  enum Action {
    Back,
    Next,
  }
  const countDownValue = 3;
  const [step, setStep] = useState<GuideStep>(GuideStep.One);
  const [countDown, setCountDown] = useState<number>(countDownValue);
  const navigate = useNavigate();

  const btnSubHandle = (action: Action) => {
    if (action == Action.Next) {
      if (step == GuideStep.Two) {
        navigate("/test");
      } else {
        setStep(() => GuideStep.Two);
        setCountDown(countDownValue);
      }
    } else {
      setStep(() => GuideStep.One);
      setCountDown(0);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((countDown) => {
        if (countDown - 1 <= 0) {
          clearInterval(timer);
        }
        return countDown - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [step]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.conceptContent}>
          <div className={styles.guideContent}>
            {step == GuideStep.One ? (
              <>
                <div className={styles.classExplanation}>
                  <div>
                    <p className={styles.classExplanationText}>
                      Explanation for class: "7"
                    </p>
                    <img src={seven}></img>
                  </div>
                  <div className={styles.conductancesGuideContainer}>
                    <p
                      className={styles.classExplanationText}
                      style={{ color: "#8A0000", borderColor: "#8A0000" }}
                    >
                      More activated pixels
                    </p>
                    <div>
                      <img src={conductances}></img>
                    </div>
                    <p
                      className={styles.classExplanationText}
                      style={{ color: "#040477", borderColor: "#040477" }}
                    >
                      Less activated pixels
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.classExplanation}>
                    <div className={styles.question}>
                      <p>
                        Which should be explanation for class: "Dog"
                      </p>
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
                    </div>
                </div>
              </>
            )}
          </div>
        </div>
          <div className={styles.buttonGroup}>
            {step == GuideStep.Two ? (
              <Button
                className={`${styles.btnSub}`}
                variant="outlined"
                size="large"
                onClick={() => {
                  btnSubHandle(Action.Back);
                }}
              >
                <p>Back</p>
              </Button>
            ) : (
              <></>
            )}
            <Button
              className={`${styles.btnSub}`}
              variant="outlined"
              size="large"
              onClick={() => {
                btnSubHandle(Action.Next);
              }}
              disabled={countDown > 0}
            >
              <p>{countDown > 0 ? countDown : "Next"}</p>
            </Button>
          </div>
      </div>
    </>
  );
};

export default Guide;
