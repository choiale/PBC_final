from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from passlib.context import CryptContext
from typing import Optional

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed_pw = pwd_context.hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
def update_user(db: Session, db_user: User, email: Optional[str], password: Optional[str]):
    if email:
        db_user.email = email
    if password:
        db_user.hashed_password = pwd_context.hash(password)
    db.commit()
    db.refresh(db_user)
    return db_user
def delete_user(db: Session, db_user: User):
    db.delete(db_user)
    db.commit()
