import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/map.css';
import { Container, Button, Form } from 'react-bootstrap';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useState, useEffect, useCallback } from 'react';

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
    const [selectedPlace, setSelectedPlace] = useState(null);

    const token = localStorage.getItem('token');

    const handleMapClick = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setClickedLocation({ lat, lng });
    };

    
    const fetchPlaces = useCallback(async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/places', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // lat -> latitude, lng -> longitude로 변환
            const data = await res.json();
            if (res.ok) {
                const converted_data = data.map(place => ({
                    ...place,
                    lat: place.latitude,
                    lng: place.longitude,
                }));
                setPlaces(converted_data);
            }
        } catch (err) {
            alert('장소 로딩에 실패했습니다.');
        }
    }, [token]);

    useEffect(() => {
        fetchPlaces();
    }, [fetchPlaces]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!placeName.trim()) return;

        try {
            const res = await fetch('http://127.0.0.1:8000/places', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: placeName,
                    address: "dummy address", 
                    latitude: clickedLocation.lat,
                    longitude: clickedLocation.lng,
                    description: description
                })
            });

            if (res.ok) {
                const newPlace = await res.json();
                setPlaces([...places, newPlace]);
                setPlaceName('');
                setDescription('');
                setClickedLocation(null);

                alert('장소가 성공적으로 등록되었습니다.');
                window.location.reload();
            } else {
                alert('장소 등록에 실패했습니다.');
            }
        } catch (err) {
            alert('장소 등록 에러 발생: ' + err.message);
        }
    };

    return (
        <div className="my-5">
            <Container>
                <p className="map-title">동물 동반 지도</p>

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
                                    position={{ lat: place.lat, lng: place.lng }}
                                    onClick={() => setSelectedPlace(place)}
                                    icon="/images/pin-50.png"
                                />
                            ))}

                            {clickedLocation && (
                                <Marker position={clickedLocation} />
                            )}

                            {selectedPlace && (
                                <InfoWindow
                                    position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
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
                    <p className="map-set-text">장소를 등록하려면 지도에서 위치를 선택하세요.</p>
                </div>

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

                    <div className="map-container-2 d-flex justify-content-center">
                        <Button className="map-button" type="submit">장소 등록</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default Map;
