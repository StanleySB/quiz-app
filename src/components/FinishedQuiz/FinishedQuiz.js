import React from "react";
import "./FinishedQuiz.scss";
import Button from "../Ui/Button/Button";
import { Link } from "react-router-dom";

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((acc, item) => {
    if (props.results[item] === "success") {
      acc++;
    }
    return acc;
  }, 0);
  console.log(props);
  return (
    <div className="finished-quiz">
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            "fa",
            props.results[quizItem.id] === "error" ? "fa-times" : "fa-check",
          ];
          return (
            <li key={index}>
              <strong>{index + 1}.</strong>&nbsp;
              {quizItem.question}
              <i className={cls.join(" ")} />
            </li>
          );
        })}
      </ul>
      <p>
        Правильно {successCount} из {props.quiz.length}
      </p>
      <Button onClick={props.onRetry} type="primary-btn">
        Повторить
      </Button>
      <Link to="/">
        <Button type="success-btn">Перейти в список тестов</Button>
      </Link>
    </div>
  );
};

export default FinishedQuiz;
