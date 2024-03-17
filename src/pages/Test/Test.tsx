/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./Test.module.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getListQuestion,
  getQuestion,
  getCAMImg,
  getOriginImg,
  createResult,
} from "../../constants/api/apiUrl";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";

// Declare Type
type ChosenResult = {
  model: string;
  question_id: number;
  techniques: string[];
};

const Test = () => {
  //Declare consts
  const numberOfQuestion = 15;

  // Declare states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(1);
  const [listQuestions, setListQuestions] = useState<any>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>([]);
  const [openRemind, setOpenRemind] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [chosenValue, setChosenValue] = useState<ChosenResult>({
    model: "",
    question_id: -1,
    techniques: [],
  });
  const [resultOfQuestion, setResultOfQuestion] = useState<ChosenResult[]>([]);

  // Declare hooks
  const navigate = useNavigate();

  // Declare event handle function
  const clearStateForNextBtn = () => {
    // Clear the condition for next button
    setChecked(false);

    // Clear the variable chosenValue
    setChosenValue({
      model: "",
      question_id: -1,
      techniques: [],
    });
  }

  const btnSubHandle = () => {
    if (checked) {
      if (currentQuestionNumber == numberOfQuestion) {
        // Add answer for the result 
        const result = [...resultOfQuestion, chosenValue].map((value) => {
          return [value.model, value.question_id, value.techniques.join(",")];
        });

        // Store the result to database
        axios.post(
          createResult,
          JSON.stringify({
            user: {
              student_id: localStorage.getItem("studentId"),
              student_name: localStorage.getItem("name"),
            },
            result: result,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        navigate("/survey");
      } else {
        // Add the answer of learner to result
        setResultOfQuestion((currentState) => {
          return [...currentState, chosenValue];
        });

        clearStateForNextBtn();
      }

      setCurrentQuestionNumber((value) => value + 1);
    } else {
      setOpenRemind(true);
      setTimeout(() => {
        setOpenRemind(false);
      }, 1000);
    }
  };

  // Declare evalute function
  const fetchImages = async (value: any) => {
    const promises = value.data.imgs_info.map(async (imgInfo: any) => {
      const imgCamData = await (
        await axios.get(
          getCAMImg +
            "/" +
            imgInfo.model_name +
            "/" +
            imgInfo.technique +
            "/" +
            imgInfo.image_id
        )
      ).data;
      return imgCamData;
    });

    const results = await Promise.all(promises);
    return results;
  };

  const onCheckChangHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueOfTarget = e.target.value;
    if (e.target.checked) {
      const currentChosenValueTechiques = chosenValue.techniques;
      currentChosenValueTechiques.push(valueOfTarget);

      // Update state
      setChosenValue((currentState) => {
        return {
          ...currentState,
          techniques: currentChosenValueTechiques,
        };
      });

      setChecked(true);
    } else {
      // If last checkbox is unchecked
      if (chosenValue.techniques.length == 1) {
        setChecked(false);
      }

      // Remove the value of unchecked
      let currentValueOfCheckedTechniques = chosenValue.techniques;
      currentValueOfCheckedTechniques = currentValueOfCheckedTechniques.filter(
        (value) => {
          return value !== valueOfTarget;
        }
      );

      // Update state
      setChosenValue((currentState) => {
        return {
          ...currentState,
          techniques: currentValueOfCheckedTechniques,
        };
      });
    }
  };

  // Declare useEffect
  useEffect(() => {
    axios.get(getListQuestion + "/" + numberOfQuestion).then((value) => {
      setListQuestions(value.data.questions);
      setCurrentQuestionNumber(1);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (listQuestions.length > 0) {
      axios
        .get(
          getQuestion +
            "/" +
            listQuestions[currentQuestionNumber - 1][0] +
            "/" +
            listQuestions[currentQuestionNumber - 1][1]
        )
        .then(async (value) => {
          const originImg = await (
            await axios.get(
              getOriginImg + "/" + listQuestions[currentQuestionNumber - 1][1]
            )
          ).data;
          let camData: string[] = [];
          camData = await fetchImages(value);

          // Store current question infomation
          setCurrentQuestion({
            labe_name: value.data.labe_name,
            imgs_info: value.data.imgs_info,
            cam_data: camData,
            origin_img: originImg,
            model: listQuestions[currentQuestionNumber - 1][0],
            imgId: listQuestions[currentQuestionNumber - 1][1],
          });

          // Set chosen value for create a instance on database
          setChosenValue({
            model: listQuestions[currentQuestionNumber - 1][0],
            question_id: listQuestions[currentQuestionNumber - 1][1],
            techniques: [],
          });
          setIsLoading(false);
        });
    }
  }, [currentQuestionNumber, listQuestions]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.conceptContent}>
          <div className={styles.guideContent}>
            {isLoading ? (
              <div>Skeleton</div>
            ) : (
              <div className={styles.classExplanation}>
                <div className={styles.question}>
                  <p>
                    Which should be explanation for class:{" "}
                    {currentQuestion.labe_name
                      ? currentQuestion.labe_name.split(",")[0]
                      : ""}
                  </p>
                  <img
                    src={`data:image/jpeg;base64,${currentQuestion.origin_img}`}
                  ></img>
                </div>
                <div className={styles.imgWithRadioGroup}>
                  {currentQuestion.cam_data.map(
                    (value: string, index: number) => {
                      return (
                        <div
                          className={styles.imgWithRadio}
                          key={`checkbox-model-${index}`}
                        >
                          <img src={`data:image/jpeg;base64,${value}`}></img>
                          <input
                            name={currentQuestion.labe_name.split(",")[0]}
                            type="checkbox"
                            value={`${currentQuestion.imgs_info[index].technique}`}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onCheckChangHandle(e);
                            }}
                          ></input>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={`${styles.buttonGroup}`}>
          <Button
            className={`${styles.btnSub}`}
            variant="outlined"
            size="large"
            disabled={isLoading}
            onClick={() => {
              btnSubHandle();
            }}
          >
            <p>
              {currentQuestionNumber == numberOfQuestion ? "Finish" : "Next"}
            </p>
          </Button>
          <Button
            className={`${styles.btnSub}`}
            variant="outlined"
            size="large"
            disabled={true}
          >
            <p>{`${currentQuestionNumber}/${numberOfQuestion}`}</p>
          </Button>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openRemind}
      >
        <div className={styles.remindContainer}>
          <p>Please check 1 image before (bow)</p>
        </div>
      </Backdrop>
    </>
  );
};

export default Test;
