from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.place import PlaceCreate, PlaceResponse
from app.core.security import get_current_user
from app.models.user import User
from app.crud import place as crud_place

router = APIRouter()

@router.post("/places", response_model=PlaceResponse)
def create_place(place: PlaceCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return crud_place.create_place(db, place, current_user.id)

@router.get("/places", response_model=List[PlaceResponse])
def read_places(db: Session = Depends(get_db)):
    return crud_place.get_all_places(db)
