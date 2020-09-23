import React from "react";
import "./ActiveQuiz.scss";
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = (props) => {
  return (
    <div className="active-quiz">
      <p className="question">
        <span>
          <strong>{props.answerNumber}.</strong>&nbsp;{props.question}
        </span>
        <small>
          {props.answerNumber} из {props.quizLength}
        </small>
      </p>
      <AnswersList
        onAnswerClick={props.onAnswerClick}
        answers={props.answers}
        state={props.state}
      />
    </div>
  );
};

export default ActiveQuiz;
