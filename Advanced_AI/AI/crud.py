from typing import Union
from sqlalchemy.orm import Session

from . import models, schema


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_users(db: Session, question_id: Union[int,None] = None, student_id: Union[int,None] = None, model: Union[str,None] = None, technique_id: Union[str,None] = None, skip: int = 0, limit: int = 100):
    result = db.query(models.User)
    if question_id is not None:
        result = result.filter(models.User.question_id == question_id)
    if student_id is not None:
        result = result.filter(models.User.student_id == student_id)
    if model is not None:
        result = result.filter(models.User.model == model)
    if technique_id is not None:
        for model in technique_id.split(","):
            result = result.where(models.User.techniques.contains(model))
    return result.offset(skip).limit(limit).all()


def create_user(db: Session, user: schema.UserBase):
    db_user = models.User(student_id = user.student_id, question_id = user.question_id, student_name = user.student_name, result = user.result)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_user_result(db: Session, userResult: schema.Result):
    print(userResult)
    for key in userResult.result:
        db_user_result = models.User(**userResult.user.__dict__, model = key[0], question_id = key[1], techniques = key[2])
        db.add(db_user_result)
        db.commit()
        db.refresh(db_user_result)
    return db_user_result