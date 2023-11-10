from sqlalchemy.orm import Session
from sqlalchemy import create_engine, delete, update
from classes import Base, Product,User,UserOut
import uuid

def sqlalchemy_to_json(obj):
    list_result = []
    if (isinstance(obj,list)):
        for item in obj:
            obj=item
            result = {}
            for key in obj.__annotations__.keys():
                result[key] = getattr(obj, key)
                if (isinstance(result[key], list)|isinstance(result[key], uuid.UUID)):
                    result[key] = sqlalchemy_to_json(result[key])
            list_result.append(result)
        return list_result
    if((isinstance(obj,UserOut))):
        result = {}
        for key in obj.__annotations__.keys():
            result[key] = getattr(obj, key)
            if (isinstance(result[key], list)| isinstance(result[key], uuid.UUID)):
                result[key] = sqlalchemy_to_json(result[key])
        list_result.append(result)
        return list_result
    return str(obj)

# 'postgresql+psycopg2://user:password@localhost:5432/dbname'
# PostgreSql Ubuntu
# Create User : $ sudo -u postgres createuser <username>
# Create Database : $ sudo -u postgres createdb <dbname>
# Give the user a password : $ sudo -u postgres psql
# psql=# alter user <username> with encrypted password '<password>';
# Grant priviles on database :  psql=# grant all privileges on database <dbname> to <username> ;
# psql -h localhost -d product -U root -p 5432

# 'postgresql+psycopg2://root:root@db_postgres:5432/product' 
# 'postgresql+psycopg2://root:root@localhost:5432/product'
engine = create_engine('postgresql+psycopg2://root:root@db_postgres:5432/product') 
Base.metadata.create_all(engine)
session =Session(engine)

class SQL:
    def __init__(self):
        super().__init__()
    
    def commit_product(self,user_id,name,price):
        p= Product()
        p.id = uuid.uuid4().hex
        p.name = name
        p.price = price
        p.user_id = user_id
        session.add(p)
        session.commit()
        userout = session.query(User).where(User.id == user_id).first()
        return sqlalchemy_to_json(UserOut(
                    id=userout.id, username=userout.username, products=userout.products,email=userout.email,address=userout.address,description=userout.description
                    ,firstname=userout.firstname,lastname=userout.lastname))
    
    def commit_user(self,username,password,address,descrption,email,firstname,lastname):
        user = User()
        user.id = uuid.uuid4()
        user.username = username
        user.firstname = firstname
        user.lastname = lastname
        user.password = password
        user.address = address
        user.description = descrption
        user.email = email
        session.add(user)
        session.commit()
        userout = session.query(User).where(User.id == user.id).first()
        return sqlalchemy_to_json(UserOut(id=userout.id, username=userout.username, products=userout.products,email=userout.email,address=userout.address,description=userout.description
                                          ,firstname=userout.firstname,lastname=userout.lastname))
        
    def update_product(self,product_id,user_id,name,price):
        with engine.begin() as conn:
            res = update(Product).where(Product.id == product_id)
            conn.execute(res,{"name":f"{name}","price":f"{price}"})
            conn.commit()
        userout = session.query(User).where(User.id == user_id).first()
        return sqlalchemy_to_json(UserOut(
                    id=userout.id, username=userout.username, products=userout.products,email=userout.email,address=userout.address,description=userout.description
                    ,firstname=userout.firstname,lastname=userout.lastname))

    def update_user(self,user_id,description,username,firstname
                           ,lastname,email,address):
        with engine.begin() as conn:
            res = update(User).where(User.id == user_id)
            conn.execute(res,{"username":f"{username}","firstname":f"{firstname}","lastname":f"{lastname}"
                              ,"email":f"{email}","address":f"{address}","description":f"{description}"})
            conn.commit()
        userout = session.query(User).where(User.id == user_id).first()
        return sqlalchemy_to_json(UserOut(id=userout.id, username=userout.username, products=userout.products,email=userout.email,address=userout.address
                                          ,description=userout.description,firstname=userout.firstname,lastname=userout.lastname))
    
    def delete_product(self,product_id,user_id):
        with engine.begin() as conn:
            stmt=(delete(Product).where(Product.id == product_id).returning(Product.id))
            conn.execute(stmt)
            conn.commit()
        userout = session.query(User).where(User.id == user_id).first()
        return sqlalchemy_to_json(UserOut(
                    id=userout.id, username=userout.username, products=userout.products,email=userout.email,address=userout.address,description=userout.description,firstname=userout.firstname,lastname=userout.lastname))
    
    def find_users(self,username):
        userout = session.query(User).filter(User.username.like(f"%{username}%")).limit(5).all()
        list_userout = []
        for user in userout:
            list_userout.append(UserOut(id=user.id,username=user.username,products=user.products,email=user.email,address=user.address,description=user.description,firstname=user.firstname,lastname=user.lastname))
        return sqlalchemy_to_json(list_userout)
    
    def get_user(self,id):
        userout = session.query(User).where(User.id == id).first()
        return sqlalchemy_to_json(UserOut(
                    id=userout.id, username=userout.username, products=userout.products,email=userout.email,address=userout.address,description=userout.description,firstname=userout.firstname,lastname=userout.lastname)) 
    
    def get_product_user(self,user_id,product_id):
        return sqlalchemy_to_json(session.query(Product).where(Product.user_id == user_id).where(Product.id == product_id).first())
    
    def get_user_by_username(self,username:str):
        try:
            user = session.query(User).filter_by(username=username).first()
            if user:
                return sqlalchemy_to_json(UserOut(
                    id=user.id, username=user.username, products=user.products,email=user.email,address=user.address,description=user.description,firstname=user.firstname,lastname=user.lastname))
            else:
                return UserOut(id=None, username="", products=[])
        except Exception as e:
            print(e,"Error get_user_by_username")
    
    def username_duplicate(self,username:str):
        stmt = session.query(User).filter_by(username=username).first()
        if(type(stmt) == None):
            return False
        else:
            return True


    def get_user_password(self,username:str):
        try:
            user = session.query(User).filter_by(username=username).first()
            if user:
                return user
            else:
                return User()
        except Exception as e:
            print(e,"find_user_password")

