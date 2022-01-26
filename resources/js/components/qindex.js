import React from 'react';
import ReactDOM from 'react-dom';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'

class Qindex extends React.Component {

    constructor(){
        super()
        this.state = {
            questions:[],
            newQuestionData:{
              title:"",
            },
            editQuestionData:{
              id:"",
              title:"",
            },
            newQuestionModal:false,
            editQuestionModal:false
        }
    }

    loadQuestion() {
        axios.get('http://127.0.0.1:8000/api/questions').then((response) => {
            this.setState({
                questions: response.data
            })
        })
    }

    componentWillMount() {
        this.loadQuestion()
    }

    toggleNewQuestionModal(){
        this.setState({
            newQuestionModal: !this.state.newQuestionModal
        })

    }

    toggleEditQuestionModal(){
        this.setState({
            editQuestionModal: !this.state.editQuestionModal
        })
    }

    addQuestion(){
        axios.post('http://127.0.0.1:8000/api/questions', this.state.newQuestionData).then((response) => {
            let {questions} = this.state
            this.loadQuestion()

            this.setState({questions,newQuestionModal:false,  newQuestionData:{
                title:""
                }})
        })
    }

    updateQuestion(){
        let {id, title} = this.state.editQuestionData

        axios.put('http://127.0.0.1:8000/api/questions/' + id, {
            title,
        }).then((response) => {
            this.loadQuestion()

            this.setState({editQuestionModal:false, editQuestionData:{
                    id:"",
                    title:"",
                }})
        })
    }

    editQuestion(id, title){
        this.setState({
            editQuestionData:{id, title},
            editQuestionModal: !this.state.editQuestionModal
        })
    }

    deleteQuestion(id){
        axios.delete('http://127.0.0.1:8000/api/questions/' + id).then((response) => {
            this.loadQuestion()
        })
    }

    render(){
        let questions = this.state.questions.map((question) => {
            return(
                <tr key={question.id}>
                    <td>{question.id}</td>
                    <td>{question.title}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2"
                                onClick={this.editQuestion.bind(this, question.id, question.title)}
                        >Edit</Button>

                        <Button color="danger" size="sm"
                                onClick={this.deleteQuestion.bind(this, question.id)}
                        >Delete</Button>
                    </td>
                </tr>
            )
        })

        return (
            <div className="App container">
                <h1>Question list</h1>
                <Button color="primary" onClick={this.toggleNewQuestionModal.bind(this)}>Add question</Button>
                <Modal isOpen={this.state.newQuestionModal} toggle={this.toggleNewQuestionModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewQuestionModal.bind(this)}>Add a new question</ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Label for="title">Question</Label>
                            <Input id="title"
                                    value={this.state.newQuestionData.title}
                                    onChange={(e) => {
                                        let {newQuestionData} = this.state
                                        newQuestionData.title = e.target.value
                                        this.setState({newQuestionData} )
                                    }}
                            >sda</Input>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addQuestion.bind(this)}>Add question</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewQuestionModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.editQuestionModal} toggle={this.toggleEditQuestionModal.bind(this)}>
                    <ModalHeader toggle={this.toggleEditQuestionModal.bind(this)}>Edit question</ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Label for="title">Question</Label>
                            <Input id="title"
                                   value={this.state.editQuestionData.title}
                                   onChange={(e) => {
                                       let {editQuestionData} = this.state
                                       editQuestionData.title = e.target.value
                                       this.setState({editQuestionData} )
                                   }}
                            >sda</Input>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateQuestion.bind(this)}>Update question</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditQuestionModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questions}
                    </tbody>
                </Table>
            </div>
        );

    }
}

export default Qindex;

if (document.getElementById('qindex')) {
    ReactDOM.render(<Qindex />, document.getElementById('qindex'));
}