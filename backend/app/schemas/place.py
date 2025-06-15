from pydantic import BaseModel
from typing import Optional

class PlaceCreate(BaseModel):
    name: str
    address: str
    latitude: float
    longitude: float
    description: Optional[str] = None

class PlaceResponse(BaseModel):
    id: int
    name: str
    address: str
    latitude: float
    longitude: float
    description: Optional[str]
    user_id: int

    class Config:
        from_attributes = True
