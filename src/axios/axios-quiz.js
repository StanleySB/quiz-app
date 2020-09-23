import axios from 'axios'

export default axios.create({
    baseURL: "https://react-quiz-77b15.firebaseio.com/"
})