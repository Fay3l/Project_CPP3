from sqlalchemy import create_engine, update
from sqlalchemy.orm import Session
from classes  import Product,Base,User
#Test Production

# n = uuid.uuid4()
# print(n)

#Test Database
engine = create_engine('sqlite:///back-end/SQLDATA.db')
Base.metadata.create_all(engine)
session = Session(engine)
# u = User()
# u.id = n
# u.username = "user"
# u.password = "user"
# p = Product()
# p.price = 18.3
# p.name = "Smartphone"
# p1 = Product()
# p1.price = 20
# p1.name = "Tablette"
# u.products.append(p)
# u.products.append(p1)
# session.add(u)
# session.commit()

# # print(User.__annotations__.keys())
# # print(User.__mapper__.c.keys())

# with engine.begin() as conn:
#     res = update(Product).where(Product.id == 4)
#     conn.execute(res,{"name":"Tablette","price":"200"})

users = session.query(User).first()
print(users.id)
# print(sql.sqlalchemy_to_json(users))
# Convertir la liste d'objets en une liste de dictionnaires
# print(sqlalchemy_to_json(users))