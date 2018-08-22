import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

const { div } = hh(h);

function view(dispatch, model) {
    return div(JSON.stringify(model, null, 2));
}

export default view;
