import React from "react";
import "./AnswersList.scss";
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = (props) => {
  return (
    <ul className="answers-list">
      {props.answers.map((answer, index) => {
        return (
          <AnswerItem
            onAnswerClick={props.onAnswerClick}
            key={index}
            answer={answer}
            state={props.state ? props.state[answer.id] : null}
          />
        );
      })}
    </ul>
  );
};
export default AnswersList;
