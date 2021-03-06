import * as R from "ramda";

const MSGS = {
    SHOW_FORM: "SHOW_FORM",
    MEAL_INPUT: "MEAL_INPUT",
    CALORIES_INPUT: "CALORIES_INPUT",
    SAVE_MEAL: "SAVE_MEAL",
    DELETE_MEAL: "DELETE_MEAL",
    EDIT_MEAL: "EDIT_MEAL"
};

function showFormMsg(showForm) {
    return {
        type: MSGS.SHOW_FORM,
        showForm
    };
}

function mealInputMsg(description) {
    return {
        type: MSGS.MEAL_INPUT,
        description
    };
}

const saveMealMsg = {
    type: MSGS.SAVE_MEAL
};

function deleteMealMsg(id) {
    return {
        type: MSGS.DELETE_MEAL,
        id
    };
}

function caloriesInputMsg(calories) {
    return {
        type: MSGS.CALORIES_INPUT,
        calories
    };
}

function editMealMsg(editId) {
    return {
        type: MSGS.EDIT_MEAL,
        editId
    };
}

function update(msg, model) {
    switch (msg.type) {
        case MSGS.SHOW_FORM:
            const { showForm } = msg;
            return {
                ...model,
                showForm,
                description: "",
                calories: 0
            };
        case MSGS.MEAL_INPUT:
            const { description } = msg;
            return {
                ...model,
                description
            };
        case MSGS.CALORIES_INPUT:
            const calories = R.pipe(
                parseInt,
                R.defaultTo(0)
            )(msg.calories);
            return {
                ...model,
                calories
            };
        case MSGS.SAVE_MEAL:
            const { editId } = model;
            const updatedModel =
                editId === null ? add(msg, model) : edit(msg, model);
            return updatedModel;
        case MSGS.DELETE_MEAL:
            const { id } = msg;
            const meals = model.meals.filter(meal => meal.id !== id);
            return { ...model, meals };
        case MSGS.EDIT_MEAL:
            const { editId: editedMealId } = msg;
            const meal = model.meals.find(meal => meal.id === editedMealId);
            const {
                description: editDescription,
                calories: editCalories
            } = meal;

            return {
                ...model,
                description: editDescription,
                calories: editCalories,
                editId: editedMealId,
                showForm: true
            };

        default:
            console.log("bad message");
            return model;
    }
}

function add(msg, model) {
    const { nextId, description, calories } = model;
    const meal = { id: nextId, description, calories };
    const meals = [...model.meals, meal];

    return {
        ...model,
        meals,
        nextId: nextId + 1,
        description: "",
        calories: 0,
        showForm: false
    };
}

function edit(msg, model) {
    const { description, calories, editId } = model;
    const meals = model.meals.map(meal => {
        if (meal.id === editId) {
            return {
                ...meal,
                description,
                calories
            };
        } else {
            return meal;
        }
    });

    return {
        ...model,
        meals,
        description: "",
        calories: 0,
        editId: null,
        showForm: false
    };
}

export {
    update as default,
    showFormMsg,
    mealInputMsg,
    caloriesInputMsg,
    saveMealMsg,
    deleteMealMsg,
    editMealMsg
};
