import React  from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'

const EditQuestionModal = ({open, state, setState, close, handleSubmit}) => {

    const handleEditOnChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    }

    return(
        <Modal isOpen={open}>
            <ModalHeader>Edit question</ModalHeader>
            <ModalBody>

                <FormGroup>
                    <Label for="title">Question</Label>
                    <Input id="title" name="title"
                           value={state.title}
                           onChange={handleEditOnChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="solution">Solution</Label>
                    <Input id="solution" name="solution"
                           value={state.solution}
                           onChange={handleEditOnChange}
                    />
                </FormGroup>

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Edit
                    question</Button>
                <Button color="secondary" onClick={close}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default EditQuestionModal;
