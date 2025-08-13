import React from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import './NutritionLabel.css';

const NutritionLabel = ({
    title,
    nutritionData,
    maxValues = { // Default max values for daily intake
        calories: 2000,
        totalFat: 70,
        saturatedFat: 20,
        transFat: 2,
        protein: 50,
        carbohydrate: 300,
    }
}) => {
    // Define a mapping for nutrient keys
    const nutrientKeys = [
        'calories',
        'totalFat',
        'saturatedFat',
        'transFat',
        'protein',
        'carbohydrate'
    ];

    // If input is an array, remove the first 3 elements (id, name, category)
    const processedData = Array.isArray(nutritionData)
        ? nutritionData.slice(3) // Splice out id, name, and category
        : nutritionData;

    // Convert processed array to an object using nutrientKeys
    const normalizedNutritionData = Array.isArray(processedData)
        ? nutrientKeys.reduce((obj, key, index) => {
            if (processedData[index] !== undefined) {
                obj[key] = processedData[index];
            }
            return obj;
        }, {})
        : processedData;

    // Extract category for selected item not total
    const category = Array.isArray(nutritionData) ? nutritionData[2] : normalizedNutritionData.category;

    // Create an array of key-value pairs for nutrient data
    const filteredNutritionData = Object.entries(normalizedNutritionData);

    // Set the color class for each nutrient based on its percentage of daily value
    const getTotalClassName = (value, nutrient) => {
        if (!maxValues[nutrient]) return 'normal'; // Default to normal if no max value
        const percentDV = (value / maxValues[nutrient]) * 100;

        if (percentDV > 100) return 'over'; // Exceeds daily value
        if (percentDV >= 75) return 'close'; // Close to daily value
        return 'normal'; // Normal color for values below 75%
    };

    return (
        <Card className="nutrition-label">
            <CardBody>
                <CardTitle tag="h4">{title}</CardTitle>
                {category && (
                    <p className="category">
                        <strong>Category:</strong> {category}
                    </p>
                )}
                <Table bordered className="nutrition-table">
                    <tbody>
                        {filteredNutritionData.map(([key, value]) => (
                            <tr key={key} className={getTotalClassName(value, key)}>
                                <td className="label">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </td>
                                <td className="value">
                                    {typeof value === 'number' ? value.toFixed(1) : value}
                                    {maxValues[key] ? ` (${((value / maxValues[key]) * 100).toFixed(1)}% DV)` : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default NutritionLabel;
