from sqlalchemy import Column, Integer, String

from .database import Base


class User(Base):
    __tablename__ = "users"

    student_id = Column(String, primary_key=True, index=True)
    question_id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String, primary_key=True, index=True)
    model = Column(String, primary_key=True, index=True)
    techniques = Column(String, primary_key=True, index=True)