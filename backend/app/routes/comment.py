from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.schemas.comment import CommentCreate, CommentResponse
from app.crud import comment as crud_comment
from app.core.security import get_current_user
from app.models.user import User
from fastapi import Query

router = APIRouter()


@router.post("/comments", response_model=CommentResponse)
def create_comment(comment: CommentCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return crud_comment.create_comment(db, comment, comment.post_id, current_user.id)


@router.get("/comments", response_model=List[CommentResponse])
def read_comments(post_id: int = Query(...), db: Session = Depends(get_db)):
    return crud_comment.get_comments_by_post(db, post_id)
