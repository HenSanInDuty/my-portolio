import styles from "./Guide.module.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import seven from "../../assets/img/guide/servenGuide.png";
import conductances from "../../assets/img/guide/conductancesGuide.png";
import dogUnit47 from "../../assets/img/guide/dogUnit437.png";
import dogGradCam from "../../assets/img/guide/dogGradCam.png";
import dogOrigin from "../../assets/img/guide/dogClass.png";
import Backdrop from '@mui/material/Backdrop';

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
  const [checked, setChecked] = useState<boolean>(false);
  const [openRemind, setOpenRemind] = useState<boolean>(false);
  const navigate = useNavigate();

  const btnSubHandle = (action: Action) => {
    if (action == Action.Next) {
      if (step == GuideStep.Two) {
        if (checked) {
          navigate("/test");
        } else {
          setOpenRemind(true);
          setTimeout(() => {
            setOpenRemind(false);
          },(1000));
        }
      } else {
        setStep(() => GuideStep.Two);
        setCountDown(countDownValue);
      }
    } else {
      setStep(() => GuideStep.One);
      setCountDown(0);
    }
  };

  const radioOnChange = (e:BaseSyntheticEvent) => {
    if (e.target.value == "correct") {
      setChecked(true);
    } else {
      setChecked(false);
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
      <div className="container">
        <div className={styles.conceptContent}>
          <div className={styles.guideContent}>
            {step == GuideStep.One ? (
              <>
                <div className={styles.classExplanation}>
                  <div className={styles.sevenGuideContainer}>
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
                    <p>Which should be explanation for class: "Dog"</p>
                    <img src={dogOrigin}></img>
                  </div>
                  <div className={styles.imgWithRadioGroup}>
                    <div className={styles.imgWithRadio}>
                      <img src={dogUnit47}></img>
                      <input
                        name="dog"
                        type="radio"
                        value="correct"
                        onChange={radioOnChange}
                      ></input>
                    </div>
                    <div className={styles.imgWithRadio}>
                      <img src={dogGradCam}></img>
                      <input
                        name="dog"
                        type="radio"
                        value="wrong"
                        onChange={radioOnChange}
                      ></input>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={`${styles.buttonGroup} ${step == GuideStep.One ? styles.end : ''}`}>
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openRemind}
      >
        <div className={styles.remindContainer}>
          <p>
            Have you checked the radio or correct radio ? Please check again
          </p>
        </div>
      </Backdrop>
    </>
  );
};

export default Guide;
