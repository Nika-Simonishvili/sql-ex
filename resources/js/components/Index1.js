import React, {useState, useEffect} from 'react';
import {Table, Button} from 'reactstrap'
import ReactDOM from 'react-dom';
import axios from "axios";
import NewQuestionModal from "./modals/NewQuestionModal";
import ShowResultModal from "./modals/showResultModal";

function Index1() {

    const [data, setData] = useState({
        questionsData: {title: '', solution: '', data: ''},
        questions: [],
    });

    const [editQuestionData, setEditQuestionData] = useState({
        id: '', title: '',
        solution: '', data: '',
    });
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState([]);
    const [openResultModal, setOpenResultModal] = useState(false);

    const BASE_URL = 'http://127.0.0.1:8000/api/questions';

    const loadQuestions = () => {
        axios.get(BASE_URL)
            .then(result => setData({...data, questions: result.data}));
    }

    useEffect(() => {
        loadQuestions();
    }, []);

    const handleNewQuestion = () => {
        axios.post(BASE_URL, data.questionsData)
            .then(response => {
                    setData({...data, questionsData: response.data});
                    loadQuestions();
                }
            );
        setIsOpen(false);
    }

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const prevdata = data.questionsData;
        prevdata[name] = value;
        setData({...data, questionsData: prevdata});
    }

    const handleResultShow = (id) => {
        axios.get(BASE_URL + '/' + id)
            .then(res => setResult(res.data))
            .catch(err => console.log(err));
        handleResultModal();
    }

    const handleDelete = (id, index) => {
        axios.delete(BASE_URL + '/' + id)
            .then(res => {
                const newQues = data.questions.filter((elem) => data.questions.indexOf(elem) !== index);
                setData({...data, questions: newQues});
            })
            .catch(err => console.log(err));
    }

    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const handleResultModal = () => {
        setOpenResultModal(!openResultModal);
    }

    return (
        <div className="App container">
            <h1>Question list </h1>
            <Button color="primary"
                    onClick={handleOpenModal}>
                Add question</Button>

            <NewQuestionModal
                isOpen={isOpen}
                close={handleCloseModal}
                onAddQuestion={handleNewQuestion}
                onTitleChange={(e) => handleOnChange(e)}
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
                            <Button color="success" size="sm" variant="mr-2">Edit</Button>

                            <Button color="danger" size="sm"
                                    onClick={() => handleDelete(question.id, index)}
                            >Delete</Button>

                            <Button color='primary' onClick={() => handleResultShow(question.id)}>Run query</Button>

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

export default Index1;

if (document.getElementById('index1')) {
    ReactDOM.render(<Index1/>, document.getElementById('index1'));
}
