import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/map.css';
import { Container, Button, Form } from 'react-bootstrap';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 36.625611,
  lng: 127.454489
};

function Map() {
    const [clickedLocation, setClickedLocation] = useState(null);
    const [placeName, setPlaceName] = useState('');
    const [description, setDescription] = useState('');
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 마커 정보

    const handleMapClick = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setClickedLocation({ lat, lng });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!placeName.trim()) return;

        const newPlace = {
            name: placeName,
            description,
            position: clickedLocation
        };

        setPlaces([...places, newPlace]);
        setPlaceName('');
        setDescription('');
        setClickedLocation(null); // 등록 후 지도 클릭 위치 초기화
    };

    return (
    <div className="my-5">
        <Container>
            <p className="map-title">동물 동반 지도</p>

            {/* 지도 */}
            <div className="py-5">
                <LoadScript googleMapsApiKey="AIzaSyC80ncJFGXiB56rYOFG2YWELW8vwnD5li8">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                        onClick={handleMapClick}
                    >

                        {places.map((place, index) => (
                            <Marker
                            key={index}
                            position={place.position}
                            icon="/images/pin-50.png"
                            onClick={() => setSelectedPlace(place)}/>
                        ))}

                        {clickedLocation && (
                            <Marker position={clickedLocation} />
                        )}

                        {selectedPlace && (
                            <InfoWindow
                                position={selectedPlace.position}
                                onCloseClick={() => setSelectedPlace(null)}
                            >
                                <div>
                                    <h6>{selectedPlace.name}</h6>
                                    <p>{selectedPlace.description}</p>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>

            <div className="map-container-1 d-flex justify-content-center">
                <p className="map-set-text">장소를 추가하려면 지도에서 위치를 선택하세요.</p>
            </div>

            {/* 장소 등록 form */}
            <Form onSubmit={handleSubmit} className="mb-5">
                <div className="d-flex justify-content-center">
                    <Form.Group className="mb-3">
                        <Form.Label className="map-label">장소 이름</Form.Label>
                        <Form.Control
                        className="map-input"
                        type="text"
                        value={placeName}
                        onChange={(e) => setPlaceName(e.target.value)}
                        />
                    </Form.Group>
                </div>

                <div className="d-flex justify-content-center">
                    <Form.Group className="mb-3">
                        <Form.Label className="map-label">장소 설명</Form.Label>
                        <Form.Control
                        className="map-input"
                        as="textarea"
                        rows={2}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                </div>

            {/* 장소 등록 버튼 */}
                <div className="map-container-2 d-flex justify-content-center">
                    <Button className="map-button" type="submit">장소 등록</Button>
                </div>
                </Form>
        </Container>
    </div>
    );
}

export default Map;