import os
import psycopg2
import yaml
import urllib.parse as urlparse

def connect():
    url = os.getenv('DATABASE_URL')  # Railway Postgres URL
    if url:
        # Some providers give postgres:// — psycopg2 prefers postgresql://
        if url.startswith('postgres://'):
            url = url.replace('postgres://', 'postgresql://', 1)
        # Railway requires SSL
        sslmode = os.getenv('PGSSLMODE', 'require')
        return psycopg2.connect(dsn=url, sslmode=sslmode)
    
    # Fallback for local development using db.yml
    yml_path = os.path.join(os.path.dirname(__file__), '..', 'db.yml')
    if os.path.exists(yml_path):
        with open(yml_path, 'r') as file:
            config = yaml.load(file, Loader=yaml.FullLoader)
        return psycopg2.connect(
            dbname=config['database'],
            user=config['user'],
            password=config['password'],
            host=config['host'],
            port=config['port']
        )
    else:
        raise Exception("No database configuration found. Set DATABASE_URL environment variable or create db.yml")

def exec_sql_file(path):
    """Execute SQL file at given path"""
    conn = connect()
    cur = conn.cursor()
    with open(path, 'r') as file:
        cur.execute(file.read())
    conn.commit()
    conn.close()

def exec_get_one(sql, args=()):
    """Execute query and return one result"""
    conn = connect()
    cur = conn.cursor()
    cur.execute(sql, args)
    one = cur.fetchone()
    conn.close()
    return one

def exec_get_all(sql, args=()):
    """Execute query and return all results"""
    conn = connect()
    cur = conn.cursor()
    cur.execute(sql, args)
    list_of_tuples = cur.fetchall()
    conn.close()
    return list_of_tuples

def exec_commit(sql, args=()):
    """Execute query and commit transaction"""
    conn = connect()
    cur = conn.cursor()
    result = cur.execute(sql, args)
    conn.commit()
    conn.close()
    return result