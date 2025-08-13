import os
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
from api.swen_344_db_utils import *
from api.example_api import *
from api.food_api import *

app = Flask(__name__)
CORS(app)
api = Api(app)

# Add your API routes
api.add_resource(ExampleApi, '/example_api')
api.add_resource(FoodApi, '/food_api')

# Add a health check route for Railway
@app.route('/')
def health_check():
    return {"status": "API is running", "message": "Food API deployed successfully"}

@app.route('/health')
def api_health():
    return {"status": "healthy", "service": "food-api"}

if __name__ == '__main__':
    # Initialize database if flag is set (useful for Railway deployment)
    if os.environ.get('INIT_DB_ON_BOOT') == 'true':
        try:
            print("Loading database schema...")
            # Ensure absolute path to food.sql
            import pathlib
            sql_path = pathlib.Path(__file__).parent / 'food.sql'
            
            # Check if food.sql exists, if not try api/food.sql
            if not sql_path.exists():
                sql_path = pathlib.Path(__file__).parent / 'api' / 'food.sql'
            
            if sql_path.exists():
                exec_sql_file(str(sql_path))
                print("✅ Database schema loaded successfully!")
            else:
                print("❌ Could not find food.sql file")
        except Exception as e:
            print(f"❌ Error loading database: {e}")
    
    print("Starting Flask server...")
    port = int(os.environ.get('PORT', 4999))
    app.run(host='0.0.0.0', port=port, debug=False)