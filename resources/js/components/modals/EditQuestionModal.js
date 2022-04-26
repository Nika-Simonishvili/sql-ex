import React  from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'

const EditQuestionModal = ({open, state, setState, close, handleSubmit, errors}) => {

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
                           type="textarea"
                           defaultValue={state?.question?.title}
                           onChange={handleEditOnChange}
                    />
                </FormGroup>

                <p className='text-danger'>
                    {errors.validationErrors.title}
                </p>

                <FormGroup>
                    <Label for="solution">Eloquent Solution</Label>
                    <Input id="solution" name="solution"
                           type="textarea"
                           value={state.solution}
                           onChange={handleEditOnChange}
                    />
                </FormGroup>

                <p className='text-danger'>
                    {errors.validationErrors.solution}
                </p>

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Edit question</Button>
                <Button color="secondary" onClick={close}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default EditQuestionModal;
