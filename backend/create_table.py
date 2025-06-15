# 0615 생성. db 테이블 생성 위한 파일

from app.database import Base, engine
import app.models

Base.metadata.create_all(bind=engine)
print("테이블 생성 완료")