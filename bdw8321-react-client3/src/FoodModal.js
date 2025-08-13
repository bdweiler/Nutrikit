import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, InputGroup, Form, Label, Input } from 'reactstrap';
import './FoodModal.css';

class FoodModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: '',
                category: '',
                calories: 0,
                totalFat: 0,
                saturatedFat: 0,
                transFat: 0,
                protein: 0,
                carbohydrate: 0,
            },
        };
    }

    // Sets the state to empty
    toggle = () => {
        this.setState({
            formData: {
                name: '',
                category: '',
                calories: 0,
                totalFat: 0,
                saturatedFat: 0,
                transFat: 0,
                protein: 0,
                carbohydrate: 0,
            },
        });

        //this closes the modal
        this.props.cancel();
    }

    //Updates the fields of the food
    updateField = (e) => {
        //gets the name and value that is being updated 
        const { name, value } = e.target;

        // Convert numeric fields to ints 
        const numericFields = ['calories', 'totalFat', 'saturatedFat', 'transFat', 'protein', 'carbohydrate'];

        // Check if the field is a numeric field and convert it
        const updatedValue = numericFields.includes(name) ? parseInt(value, 10) || 0 : value;

        //Updates the state
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: updatedValue,
            },
        }));
    };


    // Handles the saving of the inputed information
    handleSave = () => {
        // Gets the data being stored
        const { formData } = this.state;

        // Checking if there is at least a name and category selected 
        if (!formData.name || !formData.category) {
            alert("Name and Category are required fields.");
            return;
        }

        // Checks to see if it editing an existing food and if it calls the correct function 
        if (this.props.isEdit) {
            this.props.handleEditFood(formData)
        }
        // Else saves it like a brand new food
        else {
            // Pass the data to the parent component
            this.props.handleSaveFood(formData);
        }

        // Reset the form 
        this.setState({
            formData: {
                name: '',
                category: '',
                calories: 0,
                totalFat: 0,
                saturatedFat: 0,
                transFat: 0,
                protein: 0,
                carbohydrate: 0,
            },
            saving: false
        });

        //Closes the Modal 
        this.toggle();
    };

    // Updates the modal with the current foods data 
    componentDidUpdate(prevProps) {
        if (prevProps.food !== this.props.food && this.props.food) {
            this.setState({ formData: { ...this.props.food } });
        }
    }


    render() {
        const { formData } = this.state;

        return (
            <Modal isOpen={this.props.showHide} toggle={this.toggle} className="custom-modal">
                <ModalHeader toggle={this.toggle}></ModalHeader>
                <ModalBody>
                    <Form>
                        <InputGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={this.updateField}
                                placeholder="Enter food name"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label for="category">Category</Label>
                            <Input
                                type="select"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={this.updateField}
                            >
                                <option value="" disabled>Select a category</option>
                                <option value="Proteins">Proteins</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Vegetables">Vegetables</option>
                                <option value="Dairy">Dairy</option>
                                <option value="Grains">Grains</option>
                            </Input>
                        </InputGroup>
                        <InputGroup>
                            <Label for="calories">Calories</Label>
                            <Input
                                type="number"
                                id="calories"
                                name="calories"
                                value={formData.calories}
                                onChange={this.updateField}
                                placeholder="Enter calories"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label for="totalFat">Total Fat</Label>
                            <Input
                                type="number"
                                id="totalFat"
                                name="totalFat"
                                value={formData.totalFat}
                                onChange={this.updateField}
                                placeholder="Enter total fat"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label for="saturatedFat">Saturated Fat</Label>
                            <Input
                                type="number"
                                id="saturatedFat"
                                name="saturatedFat"
                                value={formData.saturatedFat}
                                onChange={this.updateField}
                                placeholder="Enter saturated fat"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label for="transFat">Trans Fat</Label>
                            <Input
                                type="number"
                                id="transFat"
                                name="transFat"
                                value={formData.transFat}
                                onChange={this.updateField}
                                placeholder="Enter trans fat"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label for="protein">Protein</Label>
                            <Input
                                type="number"
                                id="protein"
                                name="protein"
                                value={formData.protein}
                                onChange={this.updateField}
                                placeholder="Enter protein content"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label for="carbohydrate">Carbohydrate</Label>
                            <Input
                                type="number"
                                id="carbohydrate"
                                name="carbohydrate"
                                value={formData.carbohydrate}
                                onChange={this.updateField}
                                placeholder="Enter carbohydrate content"
                            />
                        </InputGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={this.handleSave} disabled={this.state.saving}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default FoodModal;
