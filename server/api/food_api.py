from flask_restful import Resource, request
from .swen_344_db_utils import *

class FoodApi(Resource):
    def get(self):
        # Retrieve the category filter from the request parameters
        category = request.args.get('category')

        # If a category is specified, filter the results
        if category:
            query = """
                SELECT food.id, food.name, category.name AS category, food.calories, 
                       food.totalFat, food.saturatedFat, food.transFat, 
                       food.protein, food.carbohydrate
                FROM food
                JOIN category ON food.category_id = category.id
                WHERE category.name = %s
            """
            result = exec_get_all(query, (category,))
        else:
            # If not category return everything
            query = """
                SELECT food.id, food.name, category.name AS category, food.calories, 
                       food.totalFat, food.saturatedFat, food.transFat, 
                       food.protein, food.carbohydrate
                FROM food
                JOIN category ON food.category_id = category.id
            """
            result = exec_get_all(query)

        # Return the data
        return result
    
    def post(self):
        # Get the food item data 
        food_item = request.json

        # Getting the specific fields 
        name = food_item.get("name")
        category_name = food_item.get("category")
        calories = food_item.get("calories")
        totalFat = food_item.get("totalFat")
        saturatedFat = food_item.get("saturatedFat")
        transFat = food_item.get("transFat")
        protein = food_item.get("protein")
        carbohydrate = food_item.get("carbohydrate")

        # Gettig the category id number
        category_id_result = exec_get_one('SELECT id FROM category WHERE name = %s', (category_name,))
        category_id = category_id_result[0]

        # Inserting query for adding the new food into the food table
        insert_query = "INSERT INTO food(name, category_id, calories, totalFat, saturatedFat, transFat, protein, carbohydrate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"

        #Exicuting the query with the paramters
        exec_commit(insert_query, (name, category_id, calories, totalFat, saturatedFat, transFat, protein, carbohydrate))

        #Getting the most recently added food 
        new_food_id = exec_get_one('SELECT MAX(id) FROM food')[0]

        # Returns success message and the new food's id
        return {"message": "Food item added successfully", "food_id": new_food_id}

    def put(self):
        # Get the food item data 
        food_item = request.json

        # Getting the specific fields 
        name = food_item.get("name")
        category_name = food_item.get("category")
        calories = food_item.get("calories")
        totalFat = food_item.get("totalFat")
        saturatedFat = food_item.get("saturatedFat")
        transFat = food_item.get("transFat")
        protein = food_item.get("protein")
        carbohydrate = food_item.get("carbohydrate")

        # Gettig the category id number
        category_id_result = exec_get_one('SELECT id FROM category WHERE name = %s', (category_name,))
        category_id = category_id_result[0]

        # Getting the if from the name of the food
        food_id_result = exec_get_one('SELECT id FROM food WHERE name = %s', (name,))
        food_id = food_id_result[0]

        # Updaing query for updating the fields 
        update_query = 'UPDATE food SET category_id = %s, calories = %s, totalFat = %s, saturatedFat = %s, transFat = %s, protein = %s, carbohydrate = %s WHERE id = %s'

        #Exicuting the query with the parameters
        updated_food = exec_commit(update_query, (category_id, calories, totalFat, saturatedFat, transFat, protein, carbohydrate, food_id))
        
        # Returns success message and the newly updated food
        return {"message": "Food item updated successfully", "updated_food": updated_food}
    
    def delete(self):
        # Getting the data passed in
        food_item = request.json

        #Gets the food's id 
        food_id = food_item.get("id")

        # Setting up the delete query based off food id
        delete_query = "DELETE FROM food WHERE id = %s"

        #Commiting the query 
        exec_commit(delete_query, (food_id,))

        #Success message with the food id that was removed from the data base 
        return {"message": "Food with ID {} has been removed".format(food_id)}