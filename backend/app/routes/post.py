from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.post import PostCreate, PostResponse
from app.crud import post as crud_post
from app.core.security import get_current_user
from app.models.user import User
from typing import List

router = APIRouter()

@router.post("/posts", response_model=PostResponse)
def create_post(post: PostCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return crud_post.create_post(db, post, current_user.id)

@router.get("/posts", response_model=List[PostResponse])
def read_posts(db: Session = Depends(get_db)):
    return crud_post.get_posts(db)

@router.get("/posts/{post_id}", response_model=PostResponse)
def read_post(post_id: int, db: Session = Depends(get_db)):
    post = crud_post.get_post_by_id(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.put("/posts/{post_id}", response_model=PostResponse)
def update_post(post_id: int, post: PostCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    updated = crud_post.update_post(db, post_id, post.title, post.content, current_user.id)
    if not updated:
        raise HTTPException(status_code=404, detail="Post not found or not authorized")
    return updated

@router.delete("/posts/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    deleted = crud_post.delete_post(db, post_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Post not found or not authorized")
    return {"message": "Post deleted successfully"}

@router.get("/me/posts", response_model=List[PostResponse])
def read_my_posts(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return crud_post.get_posts_by_user(db, user_id=current_user.id)
