import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

import {
    showFormMsg,
    mealInputMsg,
    caloriesInputMsg,
    saveMealMsg
} from "./Update";

const {
    pre,
    div,
    h1,
    button,
    form,
    label,
    input,
    table,
    thead,
    tbody,
    td,
    tr,
    th
} = hh(h);

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
                className: "w-100 mv2",
                onsubmit: e => {
                    e.preventDefault();
                    dispatch(saveMealMsg);
                }
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

const tableHeader = thead(
    tr([
        tableHeaderCell("", "Meal"),
        tableHeaderCell("", "Calories"),
        tableHeaderCell("", "")
    ])
);

function tableHeaderCell(className, value) {
    return th({ className }, value);
}

function mealsBody(model) {
    const lines = model.meals.map(meal => {
        return mealRow(meal);
    });

    return tbody({ className: "ba bw1" }, [lines, totalRow(model)]);
}

function mealRow(meal) {
    return tr({ className: "" }, [
        cell(meal.description),
        cell(meal.calories),
        cell("icons")
    ]);
}

function cell(value) {
    return td({ className: "ba bw1" }, value);
}

function totalRow(model) {
    const total = model.meals
        .map(meal => meal.calories)
        .reduce((total, count) => {
            return total + count;
        }, 0);

    return tr({ className: "b" }, [cell("total:"), cell(total), cell("")]);
}

function tableView(model) {
    return table({ className: "" }, [tableHeader, mealsBody(model)]);
}

function view(dispatch, model) {
    return div(
        {
            className: "mw6 center"
        },
        [
            h1({ className: "f2 pv2 bb" }, "Calorie Counter"),
            formView(dispatch, model),
            tableView(model),
            pre(JSON.stringify(model, null, 2))
        ]
    );
}

export default view;
