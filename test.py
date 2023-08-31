from sqlalchemy import create_engine
from classe.product  import Product,Base
import sql
#Test Production

#Test Database
engine = create_engine('sqlite:///SQLDATA.db')
Base.metadata.create_all(engine)
p = Product()
p.price = 6.3
p.name = "Fraise"
p1 = Product()
p1.price = 2
p1.name = "Banane"
p2 = Product()
p2.price = 1
p2.name = "Kiwi"

sql.delete_product(2)
print(sql.get_products())