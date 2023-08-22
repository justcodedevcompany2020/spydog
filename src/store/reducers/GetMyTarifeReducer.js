const initialState = {
    data: [],
    status: false,
    loading: false,
};

const GetMyTarifeReducer = (state = initialState, action) => {
    let item = { ...state };
    switch (action.type) {
        case 'SuccessGetMyTarife':
            item.data = action.data
            item.status = true
            item.loading = false
            break;
        case 'StartGetMyTarife':
            item.data = []
            item.status = false
            item.loading = true
            break;
        case 'ErrorGetMyTarife':
            item.data = []
            item.status = false
            item.loading = false
            break
        default:
            break;
    }
    return item;
};
export default GetMyTarifeReducer;
