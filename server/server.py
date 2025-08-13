import os
import sys
from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

print("=== FLASK APP STARTING ===")
print(f"Python version: {sys.version}")
print(f"Current working directory: {os.getcwd()}")
print(f"Python path: {sys.path}")

# Check if environment variables are available
print(f"DATABASE_URL exists: {'DATABASE_URL' in os.environ}")
print(f"INIT_DB_ON_BOOT: {os.environ.get('INIT_DB_ON_BOOT', 'Not set')}")

app = Flask(__name__)
CORS(app)
api = Api(app)

print("=== ATTEMPTING IMPORTS ===")
try:
    from api.swen_344_db_utils import *
    print("✅ swen_344_db_utils imported successfully")
except Exception as e:
    print(f"❌ Failed to import swen_344_db_utils: {e}")

try:
    from api.example_api import *
    print("✅ example_api imported successfully")
except Exception as e:
    print(f"❌ Failed to import example_api: {e}")

try:
    from api.food_api import *
    print("✅ food_api imported successfully")
except Exception as e:
    print(f"❌ Failed to import food_api: {e}")

print("=== SETTING UP ROUTES ===")
try:
    api.add_resource(ExampleApi, '/example_api')
    print("✅ ExampleApi route added")
except Exception as e:
    print(f"❌ Failed to add ExampleApi route: {e}")

try:
    api.add_resource(FoodApi, '/food_api')
    print("✅ FoodApi route added")
except Exception as e:
    print(f"❌ Failed to add FoodApi route: {e}")

# Add health check routes
@app.route('/')
def health_check():
    return {"status": "API is running", "message": "Food API deployed successfully"}

@app.route('/health')
def api_health():
    return {"status": "healthy", "service": "food-api"}

@app.route('/debug')
def debug():
    return {
        "status": "debug info",
        "env_vars": {
            "DATABASE_URL": "set" if os.environ.get('DATABASE_URL') else "not set",
            "INIT_DB_ON_BOOT": os.environ.get('INIT_DB_ON_BOOT', 'not set'),
            "PGSSLMODE": os.environ.get('PGSSLMODE', 'not set')
        },
        "routes": [str(rule) for rule in app.url_map.iter_rules()]
    }

if __name__ == '__main__':
    print("=== DATABASE INITIALIZATION ===")
    # Initialize database if flag is set
    if os.environ.get('INIT_DB_ON_BOOT') == 'true':
        try:
            print("Starting database initialization...")
            # Ensure absolute path to food.sql
            import pathlib
            sql_path = pathlib.Path(__file__).parent / 'food.sql'
            
            # Check if food.sql exists, if not try api/food.sql
            if not sql_path.exists():
                sql_path = pathlib.Path(__file__).parent / 'api' / 'food.sql'
                print(f"Trying alternative path: {sql_path}")
            
            if sql_path.exists():
                print(f"Found SQL file at: {sql_path}")
                exec_sql_file(str(sql_path))
                print("✅ Database schema loaded successfully!")
            else:
                print("❌ Could not find food.sql file")
                print("Available files:")
                for f in pathlib.Path(__file__).parent.rglob("*.sql"):
                    print(f"  - {f}")
        except Exception as e:
            print(f"❌ Error loading database: {e}")
            import traceback
            traceback.print_exc()
    else:
        print("Database initialization skipped (INIT_DB_ON_BOOT not set to 'true')")
    
    print("=== STARTING FLASK SERVER ===")
    port = int(os.environ.get('PORT', 4999))
    print(f"Starting on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)
else:
    print("=== RUNNING UNDER GUNICORN ===")
    # When running under gunicorn, we still want to initialize the database
    if os.environ.get('INIT_DB_ON_BOOT') == 'true':
        try:
            print("Initializing database under gunicorn...")
            import pathlib
            sql_path = pathlib.Path(__file__).parent / 'food.sql'
            
            if not sql_path.exists():
                sql_path = pathlib.Path(__file__).parent / 'api' / 'food.sql'
            
            if sql_path.exists():
                exec_sql_file(str(sql_path))
                print("✅ Database initialized under gunicorn!")
            else:
                print("❌ SQL file not found under gunicorn")
        except Exception as e:
            print(f"❌ Database init failed under gunicorn: {e}")

print("=== SERVER.PY LOADED ===")
print("Available routes:")
for rule in app.url_map.iter_rules():
    print(f"  {rule.methods} {rule.rule}")