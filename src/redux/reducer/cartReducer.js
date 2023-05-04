import { SET_BASKET} from "../type"
const getBascketData = (data = {}, action) => {
    switch (action.type)
    {
        case SET_BASKET:
            return action.data.data;
        default:
            return data;
    }
}
export default getBascketData

 