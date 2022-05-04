import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap'
import axios from "axios";

const BASE_URL = 'api/questions';

const ShowResultModal = ({showResultModal, setShowResultModal, questionId, setQuestionId}) => {
  const [result, setResult] = useState([]);
  const headers = result[0] ? Object.keys(result[0]) : [];

  useEffect(() => {
    if (questionId) {
      axios.get(`${BASE_URL}/${questionId}`)
        .then((res) => {
          setResult(res.data.data);
          setShowResultModal(true);
        })
        .catch(err => console.log(err));
      setShowResultModal(false);
    }
  }, [questionId]);

  const closeResultModal = () => {
    setQuestionId(null);
    setShowResultModal(false);
  }

  return (
    <Modal isOpen={showResultModal}>
      <ModalHeader>Data:</ModalHeader>
      <ModalBody>
        <table className="table table-striped">
          <thead className='table-dark'>
          <tr>
            {headers.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
          </thead>

          {result.map((item, index) => (
            <tbody key={index}>
            <tr key={index}>
              {Object.entries(item).map(([property, value]) => (
                <td key={property}>{value}</td>
              ))}
            </tr>
            </tbody>
          ))}
        </table>

      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => closeResultModal()}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ShowResultModal;
