import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from "axios";
import {useForm} from "react-hook-form";
import TextArea from "../parts/TextArea";

const BASE_URL = 'api/questions';

const EditQuestionModal = ({openNewQuestionModal, setOpenNewQuestionModal, setDataChange}) => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    title: "",
    solution:"",
  })

  const {handleSubmit, control} = useForm();

  const onSubmit = data => {
    axios.post(BASE_URL, data).then((res) => {
      setData(res.data);
      setDataChange(true);
      setOpenNewQuestionModal(false);
    }).catch((err) => {
      if (err?.response.status === 422) {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      }
    });
  }

  return (
    <Modal isOpen={openNewQuestionModal}>
      <ModalHeader>New question</ModalHeader>
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
        <Button type="submit" color="primary" onClick={handleSubmit(onSubmit)}>Add Question</Button>
        <Button color="secondary" onClick={() => setOpenNewQuestionModal(false)}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditQuestionModal;
