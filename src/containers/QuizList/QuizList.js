import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../../components/Ui/Loader/Loader";
import "./QuizList.scss";
import { fetchQuizes } from "../../store/actions/quiz";

class QuizList extends React.Component {
  renderQuizes() {
    return this.props.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"quiz/" + quiz.id}> {quiz.name} </NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    this.props.fetchQuizes();
    // try {
    //   const response = await axios.get("/quizes.json");
    //   const quizes = [];
    //   Object.keys(response.data).forEach((key, index) => {
    //     quizes.push({
    //       id: key,
    //       name: `Тест №${index + 1}`,
    //     });
    //   });
    //   this.setState({
    //     quizes,
    //     loading: false,
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  }

  render() {
    return (
      <div className="quiz-list">
        <div>
          <h1> Список тестов </h1>
          {this.props.loading && this.props.quizes.length !== 0 ? (
            <Loader />
          ) : (
            <ul> {this.renderQuizes()} </ul>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
