from sqlalchemy.orm import Session
from app.models.post import Post  # ✅ Post model-ийг шууд импорт
from app.schemas.post import PostCreate, PostResponse

def create_post(db: Session, post: PostCreate, user_id: int):
    db_post = Post(title=post.title, content=post.content, owner_id=user_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return PostResponse(
        id=db_post.id,
        title=db_post.title,
        content=db_post.content,
        owner_id=db_post.owner_id,
        image_url=db_post.image_url,
        author_email=db_post.user.email
    )

def get_posts(db: Session):
    posts = db.query(Post).all()
    return [
        PostResponse(
            id=post.id,
            title=post.title,
            content=post.content,
            owner_id=post.owner_id,
            image_url=post.image_url,
            author_email=post.user.email
        ) for post in posts
    ]

def get_post_by_id(db: Session, post_id: int):
    post = db.query(Post).filter(Post.id == post_id).first()
    if post:
        return PostResponse(
            id=post.id,
            title=post.title,
            content=post.content,
            owner_id=post.owner_id,
            image_url=post.image_url,
            author_email=post.user.email
        )
    return None

def update_post(db: Session, post_id: int, title: str, content: str, user_id: int):
    post = db.query(Post).filter(Post.id == post_id, Post.owner_id == user_id).first()
    if post:
        post.title = title
        post.content = content
        db.commit()
        db.refresh(post)
        return PostResponse(
            id=post.id,
            title=post.title,
            content=post.content,
            owner_id=post.owner_id,
            image_url=post.image_url,
            author_email=post.user.email
        )
    return None

def delete_post(db: Session, post_id: int, user_id: int):
    post = db.query(Post).filter(Post.id == post_id, Post.owner_id == user_id).first()
    if post:
        db.delete(post)
        db.commit()
    return post

def get_posts_by_user(db: Session, user_id: int):
    posts = db.query(Post).filter(Post.owner_id == user_id).all()
    return [
        PostResponse(
            id=post.id,
            title=post.title,
            content=post.content,
            owner_id=post.owner_id,
            image_url=post.image_url,
            author_email=post.user.email
        ) for post in posts
    ]
