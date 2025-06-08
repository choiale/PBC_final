import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/adoption.css';
import { Container } from 'react-bootstrap';
import { adoptionData } from "../data/adoptionData";

function Adoption() {

    // 카드
    function Cards({image, type, animal, description, contact}) {
        return (
            <div className=" a-card col-md-4 mb-4">
                <div className="card h-100">
                    <img src={image} className="card-img" alt="동물 사진" />
                    <div className="card-content">
                        <p className="card-type">{type}</p>
                        <p className="card-animal">{animal}</p>
                        <p className="card-description">{description}</p>
                        <p className="card-contact">{contact}</p>
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
                        description={item.description}
                        contact={item.contact}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Adoption;