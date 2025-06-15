from pydantic import BaseModel
from typing import Optional

class PostCreate(BaseModel):
    title: str
    content: str

class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    owner_id: int
    image_url: Optional[str] = None
    author_email: str

    class Config:
        from_attributes = True
