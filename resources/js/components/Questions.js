import React, {useState, useEffect} from 'react';
import {Table, Button} from 'reactstrap'
import ReactDOM from 'react-dom';
import axios from "axios";
import NewQuestionModal from "./modals/NewQuestionModal";
import EditQuestionModal from "./modals/EditQuestionModal";
import ShowResultModal from "./modals/showResultModal";

function Questions() {

    const [data, setData] = useState({
        questionsData: {title: "", solution: "", data: ""},
        questions: [],
    });
    const [editQuestion, setEditQuestion] = useState({
        id: "", title: "",
        solution: "", data: "",
    });

    const [result, setResult] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [openResultModal, setOpenResultModal] = useState(false);

    const [errors, setErrors] = useState([]);

    const BASE_URL = 'http://127.0.0.1:8000/api/questions';

    //get all quesitnos
    const loadQuestions = () => {
        axios.get(BASE_URL)
            .then(result => setData({...data, questions: result.data}));
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
            ).catch((err) => {
                setErrors(err.response.data.errors)
        });

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
                console.log(id);
                loadQuestions();
            })
            .catch(err => console.log(err));
        setEditModal(false);
    }

    const handleOpenEditModal = (id) => {
        setEditModal(true);
        axios.get(BASE_URL + '/' + id)
            .then(res => {
                setEditQuestion(res.data);
            })
    }

    const handleCloseEditModal = () => setEditModal(false);

    // show result functions
    const handleResultShow = (id) => {
        axios.get(BASE_URL + '/' + id)
            .then(res => setResult(res.data))
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
            .catch(err => console.log(err));
    }

    return (
        <div className="App container">
            <h1> Question List</h1>
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

            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Solution</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.questions.map((question, index) => (
                    <tr key={index}>
                        <td>{question.id}</td>
                        <td>{question.title}</td>
                        <td>{question.solution}</td>
                        <td>
                            <Button color="success" size="sm" variant="mr-2"
                                    onClick={() => handleOpenEditModal(question.id)}>Edit</Button>

                            <EditQuestionModal open={editModal}
                                               state={editQuestion} setState={setEditQuestion}
                                               handleSubmit={() => handleEdit(editQuestion.id)}
                                               close={handleCloseEditModal}
                            />

                            <Button color="danger" size="sm"
                                    onClick={() => handleDelete(question.id, index)}>Delete</Button>

                            <Button color='primary'
                                    onClick={() => handleResultShow(question.id)}>Run query</Button>

                            <ShowResultModal
                                setIsOpen={handleResultModal}
                                isOpen={openResultModal}
                                data={result}
                            />

                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Questions;

if (document.getElementById('questions')) {
    ReactDOM.render(<Questions/>, document.getElementById('questions'));
}
