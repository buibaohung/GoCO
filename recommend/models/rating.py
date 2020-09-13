from . import Base
from sqlalchemy import Column, Integer, BIGINT, SMALLINT, String

class Rating(Base):
    __tablename__ = 'ratings'

    id = Column(BIGINT, primary_key=True)
    product_id = Column(BIGINT, primary_key=True)
    user_id = Column(BIGINT, primary_key=True)
    star = Column(SMALLINT, primary_key=True)
    stake = Column(Integer, primary_key=True)
    
    def __repr__(self):
        return "<Rating(id='{}', product_id='{}', user_id={}, star={}, stake={})>\n"\
                .format(self.id, self.product_id, self.user_id, self.star, self.stake)
    
    def to_dict(self):
        return {
            'product_id': self.product_id,
            'user_id': self.user_id,
            'star': self.star,
        }