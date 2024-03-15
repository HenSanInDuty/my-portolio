from pydantic import BaseModel

class UserBase(BaseModel):
    student_id: str
    student_name: str
    
    class Config:
        orm_mode = True

class Result(BaseModel):
    user: UserBase
    result: list[list[str]]