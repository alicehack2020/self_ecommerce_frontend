import { SET_BASKET} from "../type"
import { getRequest,postRequest,deleteRequest } from "../../service/request"
import { successMessage,errorsMessage } from "../../helpers/helper"
import Cookies from 'js-cookie';

//get bascket  
export const getBascket = () => {
    let token = Cookies.get('token');
    if (!token) {
        if (!Cookies.get('data'))
        {
            let data = {
                data: {
                       data: [],
                        Total:0,
                        ItemCount:0 
                }     
            }   
            Cookies.set('data',  JSON.stringify(data));
            return async (dispatch) => {
                await dispatch(setBascketData(data))  
            }
        }
        else {
            let data = JSON.parse(Cookies.get('data'));
            return async (dispatch) => {
                await dispatch(setBascketData(data))  
            }  
        }   
    }
    else {
        return async (dispatch) => {
            await getRequest({ url: `api/product/listCheckout`}).then((data) => {
                dispatch(setBascketData(data.data))
            }).catch((error) => {
                console.log("error==>",error)
            })
            
        } 
    }
      
}

export const setBascketData = (data) => {
    return {
        type: SET_BASKET,
        data:data
    }
}

//add data to bascket
export const postBascket = (singleProduct) => {
    const {listPrice,_id}=singleProduct
    let token =Cookies.get('token');
    if (!token) {
        if (!Cookies.get('data'))
        {
            let data = {
                data: {
                        data: [singleProduct],
                        Total:listPrice,
                        ItemCount:1  
                }   
            }
            Cookies.set('data',JSON.stringify(data));
            return async (dispatch) => {
                await dispatch(setBascketData(data))  
            }
        }
        else {
            let temp = JSON.parse(Cookies.get('data'));
            let checkProduct = temp.data.data.find((e) => {
                return e._id === _id;
            });

              
            if (checkProduct !== undefined) {
                return async (dispatch) => {
                    errorsMessage("Product already added") 
                } 
               
            } else {
                let sampleData=temp.data.data
                sampleData.push(singleProduct)
                let price = 0;
                sampleData.forEach((e) => {
                price += Number(e.listPrice);
                });

                let data = {
                    data: {
                            data: sampleData,
                            Total:price,
                            ItemCount:sampleData.length  
                    }   
                }
                Cookies.set('data', JSON.stringify(data));
                return async (dispatch) => {
                    successMessage("Product added successfully")
                    await dispatch(setBascketData(data))  
                } 
            } 
            
            
            
        }   
    }
    return async (dispatch) => {
        await postRequest({ url: `api/product/addCheckout?ProductId=${_id}`}).then((data) => {
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
    let token =Cookies.get('token');
    if (!token) {
        if (!Cookies.get('data'))
        {
            
        }
        else {
            let temp = JSON.parse(Cookies.get('data'));
            let updateProductList = temp.data.data.filter((e) => {
                return e._id !== ProductId;
            });

              
            if (updateProductList === undefined) {
                return async (dispatch) => {
                    errorsMessage("Product already removed") 
                } 
               
            } else {
                
                let price = 0;
                updateProductList.forEach((e) => {
                price += Number(e.listPrice);
                });

                let data = {
                    data: {
                            data: updateProductList,
                            Total:price,
                            ItemCount:updateProductList.length  
                    }   
                }
                Cookies.set('data', JSON.stringify(data));
                return async (dispatch) => {
                    successMessage("Product removed successfully")
                    await dispatch(setBascketData(data))  
                } 
            } 
            
            
            
        }   
    }
    return async (dispatch) => {
        await deleteRequest({ url: `api/product/removeCheckout?ProductId=${ProductId}`}).then((data) => {
            successMessage(data?.data?.message)
            dispatch(getBascket())
        }).catch((error) => {
            console.log("error==>",error)
        })
        
    }  
}
