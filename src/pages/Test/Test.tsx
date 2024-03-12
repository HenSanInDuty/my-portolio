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
} from "../../constants/api/apiUrl";
import { useEffect, useState } from "react";

const Test = () => {
  const numberOfQuestion = 15;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(1);
  const [listQuestions, setListQuestions] = useState<any>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>([]);
  const navigate = useNavigate();

  const btnSubHandle = () => {
    if (currentQuestionNumber == numberOfQuestion) {
      navigate("/survey");
    } else {
      setCurrentQuestionNumber((value) => value + 1);
    }
  };

  const btnBackHandle = () => {
    if (currentQuestionNumber > 1) {
      setCurrentQuestionNumber((value) => value - 1);
    }
  };

  async function fetchImages(value: any) {
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
  }

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
          setCurrentQuestion({
            labe_name: value.data.labe_name,
            imgs_info: value.data.imgs_info,
            cam_data: camData,
            origin_img: originImg,
            model: listQuestions[currentQuestionNumber - 1][0],
            imgId: listQuestions[currentQuestionNumber - 1][1],
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
                <div className={styles.imgWithRaioGroup}>
                  {currentQuestion.cam_data.map((value: string, index: number) => {
                    return (
                      <div className={styles.imgWithRadio}>
                        <img src={`data:image/jpeg;base64,${value}`}></img>
                        <input
                          name={currentQuestion.labe_name.split(",")[0]}
                          type="radio"
                          value={`${currentQuestion.imgs_info[index].model_name},${currentQuestion.imgs_info[index].technique},${currentQuestion.imgs_info[index].image_id}`}
                        ></input>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <Button
            className={`${styles.btnSub}`}
            variant="outlined"
            size="large"
            disabled={isLoading || currentQuestionNumber == 1}
            onClick={() => {
              btnBackHandle();
            }}
          >
            <p>Back</p>
          </Button>
          <Button
            className={`${styles.btnSub}`}
            variant="outlined"
            size="large"
            disabled={isLoading}
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
            <p>{`${currentQuestionNumber}/${numberOfQuestion}`}</p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Test;
