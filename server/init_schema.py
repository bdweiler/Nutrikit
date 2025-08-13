"""
Database initialization script - run this after deploying to Railway
"""
import os
from api.swen_344_db_utils import connect

def init_database():
    try:
        print("Initializing database schema...")
        
        # Read and execute the SQL schema
        schema_path = os.path.join(os.path.dirname(__file__), 'food.sql')
        
        conn = connect()
        cur = conn.cursor()
        
        with open(schema_path, 'r') as file:
            schema_sql = file.read()
            cur.execute(schema_sql)
        
        conn.commit()
        conn.close()
        
        print("✅ Database schema initialized successfully!")
        
        # Verify the setup
        conn = connect()
        cur = conn.cursor()
        
        cur.execute("SELECT COUNT(*) FROM category")
        category_count = cur.fetchone()[0]
        
        cur.execute("SELECT COUNT(*) FROM food")
        food_count = cur.fetchone()[0]
        
        conn.close()
        
        print(f"✅ Categories: {category_count}")
        print(f"✅ Food items: {food_count}")
        print("🎉 Database setup complete!")
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        raise

if __name__ == "__main__":
    init_database()