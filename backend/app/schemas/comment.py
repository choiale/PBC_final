from pydantic import BaseModel

class CommentCreate(BaseModel):
    post_id: int
    content: str

class CommentResponse(BaseModel):
    id: int
    content: str
    author_email: str  

    class Config:
        from_attributes = True
