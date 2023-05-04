import { SET_BASKET} from "../type"
import { getRequest,postRequest,deleteRequest } from "../../service/request"
import { successMessage,errorsMessage } from "../../helpers/helper"

//get bascket  
export const getBascket = () => {
    const id = localStorage.getItem("id")
    return async (dispatch) => {
        await getRequest({ url: `api/product/listCheckout?userId=${id}` }).then((data) => {
            dispatch(setBascketData(data.data))
        }).catch((error) => {
            console.log("error==>",error)
        })
        
    }  
}

export const setBascketData = (data) => {
    return {
        type: SET_BASKET,
        data:data
    }
}


//add data to bascket
export const postBascket = (ProductId) => {
    const id = localStorage.getItem("id")
    return async (dispatch) => {
        await postRequest({ url: `api/product/addCheckout?userId=${id}&ProductId=${ProductId}`}).then((data) => {
            // console.log('data==========>', data)
            successMessage(data?.data?.message)
            dispatch(getBascket())
        }).catch((error) => {
            // console.log("error=======>", error)
            errorsMessage(error?.response?.data?.message)
        })
        
    }  
}


//remove  bascket data
export const removeBascket = (ProductId) => {
    const id = localStorage.getItem("id")
    return async (dispatch) => {
        await deleteRequest({ url: `api/product/removeCheckout?userId=${id}&ProductId=${ProductId}`}).then((data) => {
            // console.log('data==========>', data)
            successMessage(data?.data?.message)
            dispatch(getBascket())
        }).catch((error) => {
            console.log("error==>",error)
        })
        
    }  
}
