from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import shutil, os
from app.database import get_db
from app.core.security import get_current_user
from app.models.post import Post
from app.models.user import User

router = APIRouter()

@router.post("/posts/{post_id}/upload-image")
def upload_post_image(
    post_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    post = db.query(Post).filter(Post.id == post_id, Post.owner_id == current_user.id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found or not authorized")

    filename = f"post_{post_id}_{file.filename}"
    file_path = f"static/images/{filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    post.image_url = f"/static/images/{filename}"
    db.commit()
    db.refresh(post)

    return {"message": "Image uploaded successfully", "image_url": post.image_url}
