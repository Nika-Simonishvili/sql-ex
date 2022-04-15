import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap'

const ShowResultModal = ({isOpen, data, setIsOpen}) => {

    const headers = data[0] ? Object.keys(data[0]) : [];

    return (
        <Modal isOpen={isOpen}>
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

                        {data.map((item, index) => (
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
                <Button color="secondary" onClick={() => setIsOpen(isOpen)}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ShowResultModal;
