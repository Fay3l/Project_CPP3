from datetime import datetime,timedelta
import logging
import sql
from pydantic import BaseModel
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm ,HTTPBearer
from fastapi.encoders import jsonable_encoder
import uuid
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

logger = logging.getLogger()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
SECRET_KEY ="833905f80b1e2d0b51f7e14a37b82b604961e7b168318070a1f906f77329d909"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE = 30
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")
httpbearer = HTTPBearer()

class UserCreate(BaseModel):
    username:str
    firstname:str
    lastname:str
    password:str
    email:str
    address:str

class UserUpdate(BaseModel):
    username:str
    firstname:str
    lastname:str
    email:str
    address:str
    description:str

class Product(BaseModel):
    id:uuid.UUID
    name:str
    price:float
    
class User(BaseModel):
    name:str
    products :list[Product]

class Token(BaseModel):
    access_token: str
    token_type: str


class CreateProduct(BaseModel):
    name:str
    price:float

# add CORS so our web page can connect to our api

class ConnectionSql:
    def __init__(self) -> None:
        self.sql = sql.SQL()

connectionsql = ConnectionSql()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError :
        raise credentials_exception
    user = connectionsql.sql.get_user_by_username(username)
    if not user:
        raise credentials_exception
    return user

@app.post("/api/login")
async def authenticate_user(user: OAuth2PasswordRequestForm = Depends()):
    data = jsonable_encoder(user)
    hashed_password = connectionsql.sql.get_user_password(data["username"])
    if not hashed_password.password:
        raise HTTPException(status_code=401, detail="Sign Up")
    if (verify_password(data["password"],hashed_password.password)):
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE)
        access_token = create_access_token(
            data={"sub": data["username"]}, expires_delta=access_token_expires
        )
        return {"access_token": access_token , "token_type": "bearer"}
    else:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    
@app.post("/api/signup")
async def create_login(user:UserCreate):
    data = jsonable_encoder(user)
    if(data["username"] != "" and data["password"] !="" and data["email"]!=""):
        if(connectionsql.sql.username_duplicate(data["username"])):
            connectionsql.sql.commit_user(
                data["username"],pwd_context.hash(data["password"]),data["address"],"",data["email"],data["firstname"],data["lastname"])
            return True
        else:
            raise HTTPException(status_code=401,detail="Username already uses")
    else:
        raise HTTPException(status_code=400, detail="Empty username,email or password")
    

@app.post("/api/user/update")
async def update_description_user(userupdate:UserUpdate,current_user: UserCreate = Depends(get_current_user)):
    return JSONResponse(content=connectionsql.sql.update_user(current_user[0].get("id"),userupdate.description,userupdate.username
                                                                    ,userupdate.firstname,userupdate.lastname,userupdate.email,userupdate.address)) 
    
@app.post("/api/user/product/create")
async def create_product_user(product:CreateProduct,current_user: UserCreate = Depends(get_current_user)):
    return JSONResponse(content=connectionsql.sql.commit_product(current_user[0].get("id"),product.name,product.price))


@app.get("/api/")
async def root():
    return {"message": "Hello World"}

@app.get("/api/user/me")
async def read_users_me(current_user:UserCreate = Depends(get_current_user)):
    return JSONResponse(content=current_user)

@app.get("/api/users/")
async def get_users(username:str):
    return JSONResponse(content=connectionsql.sql.find_users(username)) 

@app.get("/api/user/{user_id}") 
async def get_user(user_id:uuid.UUID):
    return JSONResponse(content=connectionsql.sql.get_user(user_id))

@app.get("/api/user/{user_id}/product/{product_id}")
async def get_product_user(user_id:uuid.UUID,product_id:uuid.UUID):
    return JSONResponse(content=connectionsql.sql.get_product_user(user_id,product_id))

@app.put("/api/user/product/update", response_model=Product)
async def update_product_user(product:Product,current_user: UserCreate = Depends(get_current_user)):
    return JSONResponse(content=connectionsql.sql.update_product(product.id,current_user[0].get("id"),product.name,product.price))

@app.delete("/api/user/product/delete/")
async def delete_product_user(product_id:uuid.UUID,current_user: UserCreate = Depends(get_current_user)):
    return JSONResponse(content=connectionsql.sql.delete_product(product_id,current_user[0].get("id")))

