import React  from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'

const NewQuestionModal = ({ isOpen, close, onAddQuestion, onTitleChange, errors}) => {

    return(
        <Modal isOpen={isOpen}>
            <ModalHeader toggle={close}>Add a new question</ModalHeader>
            <ModalBody>

                <FormGroup>
                    <Label for="title">Question</Label>
                    <Input id="title" name="title"
                           onChange={onTitleChange}
                    />
                </FormGroup>

                <p className='text-danger'>
                    {errors.title}
                </p>

                <FormGroup>
                    <Label for="solution">Solution</Label>
                    <Input id="solution" name="solution"
                           onChange={onTitleChange}
                    />
                </FormGroup>

                <p className='text-danger'>
                    {errors.solution}
                </p>

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onAddQuestion}>Add question</Button>
                <Button color="secondary" onClick={close}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default NewQuestionModal;
