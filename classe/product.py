from sqlalchemy import String, Float
from sqlalchemy.orm import DeclarativeBase,Mapped,MappedAsDataclass,mapped_column

class Base(DeclarativeBase,MappedAsDataclass):
    pass


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True,autoincrement=True,init=False)
    name: Mapped[str] = mapped_column(String(),default="")
    price: Mapped[float] = mapped_column(Float(),default=0.0)