import LabelInput from "../../components/LabelInput/LabelInput";
import styles from "./Home.module.css";
import Button from "@mui/material/Button";
import {
  conceptContent,
  agreeContent,
} from "../../constants/content/conceptContent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Declare Type
type InfomationInput = {
  name: string;
  studentId: string;
};

type KeyInfomationInput = "name" | "studentId";

const Home = () => {
  // Declare const
  const inputValueProp: KeyInfomationInput[] = ["name", "studentId"];
  const inputLabel = ["Name", "StudentId"];

  // Declare state
  const [checkOk, setCheckOk] = useState<boolean>(false);
  const [checkInput, setCheckInput] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<InfomationInput>({
    name: "",
    studentId: "",
  });

  // Declare hooks
  const navigate = useNavigate();

  // Declare event handle
  const btnSubHandle = () => {
    inputValueProp.forEach((inputValueProp) => {
      localStorage.setItem(inputValueProp, inputValues[inputValueProp]);
    });
    navigate("/introduce");
  };

  // Declare useEffect
  useEffect(() => {
    // Check all input have filled ?
    setCheckInput(() => {
      const checkInputOk = inputValueProp.every((keyInputValues) => {
        return inputValues[keyInputValues].trim() != "";
      });
      return checkInputOk;
    });
  }, [inputValues]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.groupInput}>
          {inputLabel.map((value, index) => {
            const keyInputValues: KeyInfomationInput = inputValueProp[index];
            return (
              <LabelInput
                key={`il-${index}`}
                name={value}
                inputValue={inputValues[keyInputValues]}
                onChange={(e?: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = e?.target.value ? e?.target.value : "";
                  setInputValues((oldState) => {
                    return {
                      ...oldState,
                      [keyInputValues]: newValue,
                    };
                  });
                }}
              ></LabelInput>
            );
          })}
        </div>
        <div className={styles.conceptContent}>
          {conceptContent.split("\n").map((value, index) => {
            return <p key={`para-${index}`}>{value}</p>;
          })}
        </div>
        <div className={`${styles.groupInput} ${styles.checkInput}`}>
          <input
            type="checkbox"
            checked={checkOk}
            onChange={() => {
              setCheckOk((value) => !value);
            }}
          ></input>
          <p>{agreeContent}</p>
        </div>
        <Button
          className={`${styles.btnSub}`}
          variant="outlined"
          size="large"
          disabled={!checkOk || !checkInput}
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
