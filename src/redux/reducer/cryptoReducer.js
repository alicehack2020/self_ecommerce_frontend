import { SET_CRYPTO} from "../type"
const getCryptoData = (data = [], action) => {
    switch (action.type)
    {
        case SET_CRYPTO:
            return action.data;
        default:
            return data;
    }
}

export default getCryptoData