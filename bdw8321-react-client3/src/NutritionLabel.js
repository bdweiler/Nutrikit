import React from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import './NutritionLabel.css';

const NutritionLabel = ({
    title,
    nutritionData,
    maxValues = { // Set default values for the label 
        calories: 2000,
        totalFat: 70,
        saturatedFat: 20,
        transFat: 2,
        protein: 50,
        carbohydrate: 300,
    }
}) => {
    // Sets the values for the percetnages to change the color of the text
    const getTotalClassName = (value, nutrient) => {
        if (!maxValues[nutrient]) return 'normal';
        const percentDV = (value / maxValues[nutrient]) * 100;

        if (percentDV > 100) return 'over';
        if (percentDV >= 75) return 'close';
        return 'normal';
    };

    // Does not include the non numeric values
    const filteredNutritionData = Object.entries(nutritionData).filter(
        ([key]) => !['id', 'category', 'name'].includes(key)
    );

    return (
        <Card className="nutrition-label">
            <CardBody>
                <CardTitle tag="h4">{title}</CardTitle>
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
