import React  from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'

const EditQuestionModal = ({isOpen, close, onEdit}) => {
    return(
        <Modal isOpen={isOpen}>
            <ModalHeader>Edit question</ModalHeader>
            <ModalBody>

                <FormGroup>
                    <Label for="title">Question</Label>
                    <Input id="title"
                        // value={titleValue}
                        // onChange={onTitleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="solution">Solution</Label>
                    <Input id="solution"
                        // value={solutionValue}
                        // onChange={onSolutionChange}
                    />
                </FormGroup>

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onEdit}>Edit question</Button>{' '}
                <Button color="secondary" onClick={close}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default EditQuestionModal;
