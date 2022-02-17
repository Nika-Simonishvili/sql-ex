import React  from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'

const EditQuestionModal = ({isOpen, close, titleValue, solutionValue, onEditQuestion, onTitleChange, onSolutionChange  }) => {
    return(<Modal isOpen={isOpen} toggle={close}>
        <ModalHeader toggle={close}>Edit question</ModalHeader>
        <ModalBody>

            <FormGroup>
                <Label for="title">Question</Label>
                <Input id="title"
                       value={titleValue}
                       onChange={onTitleChange}
                >sda</Input>
            </FormGroup>

            <FormGroup>
                <Label for="solution">Solution</Label>
                <Input id="solution"
                       value={solutionValue}
                       onChange={onSolutionChange}
                >sda</Input>
            </FormGroup>

        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={onEditQuestion}>Edit question</Button>{' '}
            <Button color="secondary" onClick={close}>Cancel</Button>
        </ModalFooter>
    </Modal>)
}

export default EditQuestionModal;
