import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Table, Button, Modal, ModalHeader, ModalFooter,} from 'reactstrap'
import axios from "axios";
import NewQuestionModal from "./NewQuestionModal";
import EditQuestionModal from "./EditQuestionModal";

function Index1() {
    const [questions, setQuestions] = useState([]);
    const [newQuestionData, setNewQuestionData] = useState( {
        title:"", solution:"", data:""
    });
    const [editQuestionData, setEditQuestionData] = useState({
        id:"", title:"", solution:"", data:""
    });
    const [solutionData, setSolutionData] = useState({});
    const [newQuestionModal, setNewQuestionModal] = useState( false);
    const [editQuestionModal, setEditQuestionModal] = useState( false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/questions').then(result => setQuestions(result.data))
    }, []);

    const handleDelete = (id,index) =>{
        axios.delete(`http://127.0.0.1:8000/api/questions/${id}`)
            .then(res => {
                const newQues = questions.filter((elem)=> questions.indexOf(elem) !== index)
                setQuestions(newQues);
            })
            .catch(err => console.log(err))
    }

    const handleOpenModal = () => {
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    return(
        <div className="App container">
            <h1>Question list </h1>
            <Button color="primary"
                onClick={handleOpenModal}>
                Add question</Button>

            <Modal isOpen={isOpen}>
                <button onClick={handleCloseModal}>x</button>
                <NewQuestionModal/>
            </Modal>

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
                {questions.map((question,index)=>(
                    <tr key={index}>
                        <td>{question.id}</td>
                        <td>{question.title}</td>
                        <td>{question.solution}</td>
                        <td>
                            <Button color="success" size="sm" variant="mr-2">Edit</Button>

                            <Button  color="danger" size="sm"
                                   onClick={()=>handleDelete(question.id,index)}
                            >Delete</Button>

                            <Button  color='primary'>Run query</Button>
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
    ReactDOM.render(<Index1 />, document.getElementById('index1'));
}
