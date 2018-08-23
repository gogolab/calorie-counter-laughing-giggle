import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

import { showFormMsg, mealInputMsg, caloriesInputMsg } from "./Update";

const { pre, div, h1, button, form, label, input } = hh(h);

function fieldSet(labelText, inputValue, oninput) {
    return div({}, [
        label(
            {
                className: "db mb1",
                htmlFor: `${labelText}-input`
            },
            labelText
        ),
        input(
            {
                className: "pa2 input-reset ba w-100 mb2",
                type: "text",
                id: `${labelText}-input`,
                oninput
            },
            inputValue
        )
    ]);
}

function buttonSet(dispatch) {
    return div([
        button(
            {
                className: "f3 pv2 ph3 bg-blue white bn mr2 dim",
                type: "submit"
            },
            "Save"
        ),
        button(
            {
                className: "f3 pv2 ph3 bn dim bg-light-gray",
                type: "button",
                onclick: () => dispatch(showFormMsg(false))
            },
            "Cancel"
        )
    ]);
}

function formView(dispatch, model) {
    const { description, calories, showForm } = model;

    if (showForm) {
        return form(
            {
                className: "w-100 mv2"
            },
            [
                fieldSet("Meal", description, e =>
                    dispatch(mealInputMsg(e.target.value))
                ),
                fieldSet("Calories", calories || "", e =>
                    dispatch(caloriesInputMsg(e.target.value))
                ),
                buttonSet(dispatch)
            ]
        );
    } else {
        return button(
            {
                className: "f3 pv2 ph3 bg-blue white bn",
                onclick: () => dispatch(showFormMsg(true))
            },
            "Add meal"
        );
    }
}

function view(dispatch, model) {
    return div(
        {
            className: "mw6 center"
        },
        [
            h1({ className: "f2 pv2 bb" }, "Calorie Counter"),
            formView(dispatch, model),
            pre(JSON.stringify(model, null, 2))
        ]
    );
}

export default view;
