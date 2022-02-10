import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'
import axios from "axios";
import NewQuestionModal from "./NewQuestionModal";

class Index extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            questions:[],
            newQuestionData:{
              title:"",
              solution:"",
              data:""
            },
            editQuestionData:{
              id:"",
              title:"",
              solution:"",
              data:""
            },
            solutionData: {},
            newQuestionModal:false,
            editQuestionModal:false,
            isOpen:false,
            error: null,
        }
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/api/questions').then(response => response.data).then(
            (result)=>{
                this.setState({
                    questions:result
                });
            },
            (error)=>{
                this.setState({error});
            }
        )
    }

    toggleModal(questionId) {

        axios.get('http://127.0.0.1:8000/api/questions' + '/' + questionId).then((response )=> {
                this.setState({
                    solutionData: response.data
                });
            },
            (error) => {
                this.setState({ error });
            }
        )
        this.setState({
            isOpen: !this.state.isOpen
        });
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
                title:"",
                solution:"",
                data:""
                }})
        })
    }

    updateQuestion(){
        let {id, title, solution} = this.state.editQuestionData

        axios.put('http://127.0.0.1:8000/api/questions/' + id, {
            title,
            solution
        }).then((response) => {
            this.loadQuestion()

            this.setState({editQuestionModal:false, editQuestionData:{
                    id:"",
                    title:"",
                    solution:""
                }})
        })
    }

    editQuestion(id, title, solution){
        this.setState({
            editQuestionData:{id, title, solution},
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
                    <td>{question.solution}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2"
                                onClick={this.editQuestion.bind(this, question.id, question.title, question.solution)}
                        >Edit</Button>

                        <Button  color="danger" size="sm"
                                onClick={this.deleteQuestion.bind(this, question.id)}
                        >Delete</Button>

                        <Button  color='primary'
                                onClick={()=>this.toggleModal(question.id)} >Run query</Button>
                    </td>
                </tr>
            )
        })

        return (
            <div className="App container">
                <h1>Question list </h1>
                <Button color="primary" onClick={this.toggleNewQuestionModal.bind(this)}>Add question</Button>

                <NewQuestionModal
                    isOpen={this.state.newQuestionModal}
                    close={this.toggleNewQuestionModal.bind(this)}
                    titleValue={this.state.newQuestionData.title}
                    onTitleChange={(e) => {
                        let {newQuestionData} = this.state
                        newQuestionData.title = e.target.value
                        this.setState({newQuestionData} )
                    }}
                    solutionValue={this.state.newQuestionData.solution}
                    onSolutionChange={(e) => {
                        let {newQuestionData} = this.state
                        newQuestionData.solution = e.target.value
                        this.setState({newQuestionData} )
                    }}
                    onAddQuestion={this.addQuestion.bind(this)}
                />

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
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="solution">Solution</Label>
                            <Input id="solution"
                                   value={this.state.editQuestionData.solution}
                                   onChange={(e) => {
                                       let {editQuestionData} = this.state
                                       editQuestionData.solution = e.target.value
                                       this.setState({editQuestionData} )
                                   }}
                            />
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateQuestion.bind(this)}>Update question</Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditQuestionModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal.bind(this.id)}>
                    <ModalHeader toggle={this.toggleModal.bind(this)}  className="btn-primary">Query result</ModalHeader>
                    <Table className="table">
                        <tbody>
                            <tr>
                                <th>Question:</th><td>{this.state.solutionData.title}</td>
                            </tr>
                            <tr>
                                <th>Solution:</th><td>{this.state.solutionData.solution}</td>
                            </tr>
                            <tr>
                                <th>data:</th><td>{this.state.solutionData.data}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
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
                    {questions}
                    </tbody>
                </Table>
            </div>
        );

    }
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
