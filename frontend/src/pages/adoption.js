import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/adoption.css';
import { Container, Modal, Button } from 'react-bootstrap';
import { adoptionData } from "../data/adoptionData";
import { useState } from "react";

function Adoption() {
    const [selectedCard, setSelectedCard] = useState(null); // 사용자가 선택한 카드
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = (animalData) => {
        setSelectedCard(animalData);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedCard(null);
    }

    // 카드
    function Cards({image, type, animal, address, info, health, detail, contact}) {
        return (
            <div className=" a-card col-md-4 mb-4"
            onClick={() => handleCardClick({ image, type, animal, address, info, health, detail, contact })} style={{ cursor: "pointer" }}>
                <div className="card h-100">
                    <img src={image} className="card-img" alt="animal pic" />

                    <div className="card-content">

                        <div className="adoption-type d-flex">
                            <p className="card-type">{type}</p>
                            <img src="/images/purple-paw.png" alt="paw pic" className="a-paw-img" />
                        </div>

                        <p className="card-animal">{animal}</p>
                        <p className="card-address">{address}</p>

                        <div className="card-more d-flex justify-content-end">
                            <p>상세정보</p>
                            <img src="/images/cursor-icon.png" alt="cursor pic" className="card-cursor" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="my-5">
            <Container>
                <p className="adoption-title">분양 정보</p>

                <div className="a-card-container row">
                    {adoptionData.map((item) => (
                        <Cards
                        image={item.image}
                        type={item.type}
                        animal={item.animal}
                        address={item.address}
                        info={item.info}
                        health={item.health}
                        detail={item.detail}
                        contact={item.contact}
                        />
                    ))}
                </div>

                {/* 모달 */}
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>상세정보</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div>
                        <img src={selectedCard?.image} alt="animal pic" className="img-fluid mb-3" />
                        <hr />
                        <div>
                        <p className="modal-text">정보</p>
                        <p>{selectedCard?.type}</p>
                        <p>{selectedCard?.address}</p>
                        <p>{selectedCard?.info}</p>
                        <p>{selectedCard?.health}</p>
                        <hr />
                        <p className="modal-text">설명</p>
                        <p>{selectedCard?.detail}</p>
                        <hr />
                        <p className="modal-text">연락처</p>
                        <p>{selectedCard?.contact}</p>
                        </div>
                    </div>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
}

export default Adoption;