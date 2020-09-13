import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

PG_HOST = os.getenv('POSTGREST_DB_HOST', '34.67.61.172')
PG_PORT = os.getenv('POSTGREST_DB_PORT', '5432')
PG_USER = os.getenv('POSTGREST_DB_USER', 'postgres')
PG_PASS = os.getenv('POSTGREST_DB_PASSWORD', '123456')
PG_DBNAME = os.getenv('POSTGREST_DB_NAME', 'app')

engine = create_engine('postgres+psycopg2://%s:%s@%s:%s/%s' % (PG_USER, PG_PASS, PG_HOST, PG_PORT, PG_DBNAME), echo=False)
Session = sessionmaker(bind=engine)
session = Session()