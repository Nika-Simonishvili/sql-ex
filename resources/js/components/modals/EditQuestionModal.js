import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from "axios";
import {useForm} from "react-hook-form";
import TextArea from "../parts/TextArea";

const BASE_URL = 'api/questions';

const EditQuestionModal = ({questionId, showEditModal, setShowEditModal, setDataChange}) => {
  const [errors, setErrors] = useState({});

  const {handleSubmit, reset, control} = useForm();

  useEffect(() => {
    if (questionId && showEditModal) {
      axios.get(`${BASE_URL}/${questionId}/edit`).then((response) => {
        reset(response.data.question);
      });
    }
  }, [questionId]);

  const onSubmit = data => {
    axios.put(`${BASE_URL}/${questionId}`, data)
      .then((res) => {
        setDataChange(true);
        setShowEditModal(false);
      }).catch((err) => {
        if (err?.response.status === 422) {
          setErrors(err.response.data.errors);
        }
    })
  }

  return (
    <Modal isOpen={showEditModal}>
      <ModalHeader>Edit question</ModalHeader>
      <ModalBody>
        <form>
          <TextArea
            control={control}
            label="Question:"
            name="title"
          />
          <p className='text-danger'> {errors.title} </p>

          <TextArea
            control={control}
            name="solution"
            label="Solution:"
          />
          <p className='text-danger'> {errors.solution} </p>

        </form>
      </ModalBody>
      <ModalFooter>
        <Button type="submit" color="primary" onClick={handleSubmit(onSubmit)}>Edit question</Button>
        <Button color="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditQuestionModal;
