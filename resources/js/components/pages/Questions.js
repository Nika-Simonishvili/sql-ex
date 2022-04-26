import React, {useState, useEffect} from 'react';
import { Button } from 'reactstrap'
import axios from "axios";
import NewQuestionModal from "../modals/NewQuestionModal";
import EditQuestionModal from "../modals/EditQuestionModal";
import ShowResultModal from "../modals/showResultModal";
import Header from '../parts/Header';

function Questions() {

    const [data, setData] = useState({
        questionsData: {title: "", solution: ""},
        questions: [],
    });
    const [editQuestion, setEditQuestion] = useState([{
        id: "", question: "",
        solution: "",
    }]);

    const [result, setResult] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [openResultModal, setOpenResultModal] = useState(false);

    const [errors, setErrors] = useState({
        validationErrors: [],
        serverErrors: [],
    });

    const BASE_URL = 'api/questions';
    const username = JSON.parse(localStorage.getItem('username'));

    //get all questions
    const loadQuestions = () => {
        axios.get(BASE_URL)
            .then(result => {
                console.log(result.data);
                setData( {...data, questions: result.data.questions})
            } )
    }

    useEffect(() => {
        loadQuestions();
    }, []);

    // new question functions
    const handleNewQuestion = () => {
        axios.post(BASE_URL, data.questionsData)
            .then(response => {
                    setData({...data, questionsData: response.data});
                    loadQuestions();
                    handleCloseModal();
                }
            ).catch((err) => setErrors( {...errors, validationErrors: err.response.data.errors} ));
    }

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const prevdata = data.questionsData;
        prevdata[name] = value;
        setData({...data, questionsData: prevdata});
    }

    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    // edit question functions
    const handleEdit = (id) => {
        axios.put(BASE_URL + '/' + id, editQuestion)
            .then((res) => {
                setEditQuestion(res.data);
                loadQuestions();
                setEditModal(false);
            })
            .catch((err) => {
                setErrors({...errors, validationErrors: err.response.data.errors})
                if (err?.response.status === 403) {
                    setErrors({...errors, serverErrors: err.response.data.message});
                }
            });
    }

    const handleOpenEditModal = (id) => {
        setEditModal(true);
        axios.get(BASE_URL + '/' + id)
            .then( res =>{
                setEditQuestion(res.data)}
            )
        }

    const handleCloseEditModal = () => setEditModal(false);

    // show result functions
    const handleResultShow = (id) => {
        axios.get(BASE_URL + '/' + id)
            .then(res => {
                setResult(res.data.data)
            })
            .catch(err => console.log(err));
        handleResultModal();
    }

    const handleResultModal = () => {
        setOpenResultModal(!openResultModal);
    }

    // delete question
    const handleDelete = (id, index) => {
        axios.delete(BASE_URL + '/' + id)
            .then(res => {
                const newQues = data.questions.filter((elem) => data.questions.indexOf(elem) !== index);
                setData({...data, questions: newQues});
            })
            .catch( (err) => {
                if (err?.response.status === 403) {
                    setErrors({...errors, serverErrors: err.response.data.message});
                  }
            } )
    }

    return (
        <>
            <Header/>
            <h1 className=''>Questions List</h1>
                {!username ?(
                        <p>Please, Login or Register to add a new question.</p>
                        ):(
                            <>
                            <Button color="primary"
                                    onClick={handleOpenModal}>
                                    Add question</Button>

                            <NewQuestionModal
                                isOpen={isOpen}
                                close={handleCloseModal}
                                onAddQuestion={handleNewQuestion}
                                onTitleChange={(e) => handleOnChange(e)}
                                errors={errors}
                            />
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
                        <td>{question.solutions.solution}</td>
                        <td>
                            <Button color="success"
                                    onClick={() => handleOpenEditModal(question.id)}>Edit</Button>

                            <EditQuestionModal open={editModal}
                                            state={editQuestion} setState={setEditQuestion}
                                            handleSubmit={() => handleEdit(question.id)}
                                            errors={errors}
                                            close={handleCloseEditModal}
                            />
                        </td>
                        <td>
                            <Button color="danger"
                                    onClick={() => handleDelete(question.id, index)}>Delete</Button>
                        </td>

                        <td>
                            <Button color='primary'
                                    onClick={() => handleResultShow(question.id)}>Run</Button>
                            <ShowResultModal
                                setIsOpen={handleResultModal}
                                isOpen={openResultModal}
                                data={result}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default Questions;
