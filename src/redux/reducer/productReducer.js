import { SET_PRODUCT} from "../type"
const getProductData = (data = [], action) => {
    switch (action.type)
    {
        case SET_PRODUCT:
            return action.data;
        default:
            return data;
    }
}

export default getProductData