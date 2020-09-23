import React from "react";
import "./AnswerItem.scss";

const AnswerItem = (props) => {
  const cls = ["answer-item"];
  if (props.state) {
    cls.push(props.state.toString());
  }
  return (
    <li
      className={cls.join(" ")}
      onClick={() => props.onAnswerClick(props.answer.id)}
    >
      {props.answer.text}
    </li>
  );
};

export default AnswerItem;
