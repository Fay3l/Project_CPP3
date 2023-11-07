from sqlalchemy import ForeignKey, String, Float
from sqlalchemy.orm import DeclarativeBase,Mapped,MappedAsDataclass,mapped_column,relationship
from uuid import UUID

class Base(DeclarativeBase,MappedAsDataclass):
    pass

class User(Base):
    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(primary_key=True,init=False)
    username: Mapped[str] = mapped_column(String(),default="")
    firstname: Mapped[str] = mapped_column(String(),default="")
    lastname: Mapped[str] = mapped_column(String(),default="")
    description: Mapped[str] = mapped_column(String(),default="")
    email: Mapped[str] = mapped_column(String(),default="")
    address: Mapped[str] = mapped_column(String(),default="")
    password: Mapped[str] = mapped_column(String(),default="")
    products: Mapped[list['Product']] = relationship(default_factory=list)


class Product(Base):
    __tablename__ = "products"

    id: Mapped[UUID] = mapped_column(primary_key=True,init=False)
    name: Mapped[str] = mapped_column(String(),default="")
    price: Mapped[float] = mapped_column(Float(),default=0.0)
    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id"),default=None)

class ProductOut(Product):
    id:UUID
    name:str
    price:float
    user_id:UUID

class UserOut(User):
    id: UUID
    username:str
    firstname:str
    lastname:str
    email:str
    address:str
    description:str
    products:list[Product]

