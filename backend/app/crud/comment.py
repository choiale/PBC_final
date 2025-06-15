from sqlalchemy.orm import Session
from app.models.comment import Comment
from app.schemas.comment import CommentCreate, CommentResponse

def create_comment(db: Session, comment: CommentCreate, post_id: int, user_id: int):
    db_comment = Comment(content=comment.content, post_id=post_id, user_id=user_id)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return CommentResponse(
        id=db_comment.id,
        content=db_comment.content,
        author_email=db_comment.user.email  
    )

def get_comments_by_post(db: Session, post_id: int):
    comments = db.query(Comment).filter(Comment.post_id == post_id).all()
    return [
        CommentResponse(
            id=comment.id,
            content=comment.content,
            author_email=comment.user.email  
        ) for comment in comments
    ]
