import { property } from 'lodash';
import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap'

const ShowResultModal = ({isOpen, data, setIsOpen}) => {

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>data:</ModalHeader>
            <ModalBody>
                    <ul>
                    {data.map(item => (
                        Object.entries(item).map(([property, value]) => (
                            <li key={property}>
                                {property} : {value}
                            </li>
                        ))
                    ))}
                    </ul>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => setIsOpen(isOpen)}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ShowResultModal;
