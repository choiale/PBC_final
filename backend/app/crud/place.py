from sqlalchemy.orm import Session
from app.models.place import Place
from app.schemas.place import PlaceCreate

def create_place(db: Session, place: PlaceCreate, user_id: int):
    db_place = Place(**place.dict(), user_id=user_id)
    db.add(db_place)
    db.commit()
    db.refresh(db_place)
    return db_place

def get_all_places(db: Session):
    return db.query(Place).all()
