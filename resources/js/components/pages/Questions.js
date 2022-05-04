import React, {useState, useEffect} from 'react';
import {Button} from 'reactstrap'
import axios from "axios";
import NewQuestionModal from "../modals/NewQuestionModal";
import EditQuestionModal from "../modals/EditQuestionModal";
import ShowResultModal from "../modals/ShowResultModal";
import Header from '../parts/Header';

function Questions() {
  const [dataChange, setDataChange] = useState(true);
  const [data, setData] = useState({
    questionsData: {title: "", solution: ""},
    questions: [],
  });
  const [editQuestionId, setEditQuestionId] = useState();
  const [resultQuestionId, setResultQuestionId] = useState();
  // modals` states
  const [openNewQuestionModal, setOpenNewQuestionModal] = useState(false);
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);

  const [errors, setErrors] = useState({
    serverErrors: [],
  });

  const BASE_URL = 'api/questions';
  const username = JSON.parse(localStorage.getItem('username'));

  //get all questions
  const loadQuestions = () => {
    axios.get(BASE_URL)
      .then(result => {
        setData({...data, questions: result.data.questions})
      })
  }

  useEffect(() => {
    if (dataChange === true) {
      loadQuestions();
      setDataChange(false);
    }
  }, [dataChange]);

  // new ques
  const handleOpenModal = () => {
    setOpenNewQuestionModal(true);
  }

  // edit question functions
  const handleEditModal = (editQuestionId) => {
    setEditQuestionId(editQuestionId);
    setOpenEditModal(true);
  }

  // show result functions
  const handleResultModal = (resultQuestionId) => {
    setResultQuestionId(resultQuestionId);
    setOpenResultModal(true);
  }

  // delete question
  const handleDeleteModal = (id, index) => {
    axios.delete(BASE_URL + '/' + id)
      .then(res => {
        const newQues = data.questions.filter((elem) => data.questions.indexOf(elem) !== index);
        setData({...data, questions: newQues});
      })
      .catch((err) => {
        if (err?.response.status === 403) {
          setErrors({...errors, serverErrors: err.response.data.message});
        }
      })
  }

  return (
    <>
      <Header />
      <h1 className=''>Questions List</h1>
      {!username ? (
        <p>Please, Login or Register to add a new question.</p>
      ) : (
        <>
          <Button
            color="primary"
            onClick={handleOpenModal}>
            Add question
          </Button>
        </>
      )
      }

      <h4 className='text-danger'>
        {errors.serverErrors}
      </h4>

      <table className='table'>
        <thead className='table-dark'>
        <tr>
          <th>#</th>
          <th>Question</th>
          <th>Eloquent Solution</th>
          <th>Edit</th>
          <th>Delete</th>
          <th>Run</th>
        </tr>
        </thead>
        <tbody>
        {data.questions.map((question, index) => (
          <tr key={index}>
            <td>{question.id}</td>
            <td>{question.title}</td>
            <td>{question.solutions[0].solution}</td>
            <td>
              <Button
                color="success"
                onClick={() => handleEditModal(question.id)}>
                Edit
              </Button>
            </td>

            <td>
              <Button
                color="danger"
                onClick={() => handleDeleteModal(question.id, index)}>
                Delete
              </Button>
            </td>

            <td>
              <Button
                color='primary'
                onClick={() => handleResultModal(question.id)}>
                Run
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <NewQuestionModal
        openNewQuestionModal={openNewQuestionModal}
        setOpenNewQuestionModal={setOpenNewQuestionModal}
        setDataChange={setDataChange}
        errors={errors}
      />

      <EditQuestionModal
        questionId={editQuestionId}
        showEditModal={OpenEditModal}
        setShowEditModal={setOpenEditModal}
        setDataChange={setDataChange}
      />

      <ShowResultModal
        showResultModal={openResultModal}
        setShowResultModal={setOpenResultModal}
        questionId={resultQuestionId}
        setQuestionId={setResultQuestionId}
      />
    </>
  )
}

export default Questions;
