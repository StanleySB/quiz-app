import React from "react";
import "./QuizCreator.scss";
import Button from "../../components/Ui/Button/Button";
import {
  createControl,
  validate,
  validateForm,
} from "../../form/fromFramework";
import Input from "../../components/Ui/Input/Input";
import Select from "../../components/Ui/Select/Select";
import axios from "../../axios/axios-quiz";

// Functions
function createOptionControl(number) {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: "Значение не может быть пустым",
      id: number,
    },
    { required: true }
  );
}

function createFromControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

export default class QuizCreator extends React.Component {
  //state
  state = {
    isFormValid: false,
    quiz: [],
    formControls: createFromControls(),
    rightAnswerId: 1,
  };

  // Handlers
  submitHandler = (e) => {
    e.preventDefault();
  };

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    });
  };

  addQuestionHandler = (e) => {
    e.preventDefault();
    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;
    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {
          text: option1.value,
          id: option1.id,
        },
        {
          text: option2.value,
          id: option2.id,
        },
        {
          text: option3.value,
          id: option3.id,
        },
        {
          text: option4.value,
          id: option4.id,
        },
      ],
    };
    quiz.push(questionItem);
    this.setState({
      quiz,
      isFormValid: false,
      formControls: createFromControls(),
      rightAnswerId: 1,
    });
  };

  createQuizHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/quizes.json", this.state.quiz);
      this.setState({
        quiz: [],
        isFormValid: false,
        formControls: createFromControls(),
        rightAnswerId: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //renderInput function
  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <React.Fragment key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(e) => this.onChangeHandler(e.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      );
    });
  }
  // Render
  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );
    return (
      <div className="quizcreator">
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderInputs()}
            {select}
            <hr />
            <Button
              type="primary-btn"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type="success-btn"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >
              Добавить вопрос
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
