import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap'

const ShowResultModal = ({isOpen, data, setIsOpen}) => {

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>data:</ModalHeader>
            <ModalBody>
                <Table variant="table">
                    <tbody>
                    <tr>
                        <th>Question:</th>
                        <td>{data.title}</td>
                    </tr>
                    <tr>
                        <th>Solution:</th>
                        <td>{data.solution}</td>
                    </tr>
                    <tr>
                        <th>data:</th>
                        <td>{data.data}</td>
                    </tr>
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setIsOpen(isOpen)}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ShowResultModal;
