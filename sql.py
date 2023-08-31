from sqlalchemy.orm import Session
from sqlalchemy import create_engine, delete, select, update
from product import Base, Product
from sqlalchemy.ext.declarative import DeclarativeMeta
import json

# 'postgresql+psycopg2://user:password@localhost:5432/dbname'
# PostgreSql Ubuntu
# Create User : $ sudo -u postgres createuser <username>
# Create Database : $ sudo -u postgres createdb <dbname>
# Give the user a password : $ sudo -u postgres psql
# psql=# alter user <username> with encrypted password '<password>';
# Grant priviles on database :  psql=# grant all privileges on database <dbname> to <username> ;
# psql -h localhost -d product -U root -p 5432


engine = create_engine('postgresql+psycopg2://root:root@db_postgres:5432/product')
Base.metadata.create_all(engine)
session =Session(engine)

class SQL:
    def __init__(self):
        super().__init__()
    
    def commit(self,name,price):
        p= Product()
        p.name = name
        p.price = price
        session.add(p)
        session.commit()
        product = get_products()
        return product
        
    def update_product(self,id,name,price):
        with engine.begin() as conn:
            res = update(Product).where(Product.id == id)
            conn.execute(res,{"name":f"{name}","price":f"{price}"})
        return get_products()


    def delete_product(self,id):
        with engine.begin() as conn:
            stmt=(delete(Product).where(Product.id == id).returning(Product.id))
            conn.execute(stmt)
        return get_products()
    

def get_products():
    res = (
        select(Product).order_by(Product.id.asc())
        )
    result = session.scalars(res).all()
    products_json_ready = []
    for product in result:
        product_data = {
            "id": product.id,
            "name": product.name,
            "price": product.price
        }
        products_json_ready.append(product_data)
    products_json = json.dumps(products_json_ready, indent=4)
    return products_json