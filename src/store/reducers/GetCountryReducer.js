const initialState = {
    data: [],
    status: false,
    loading: false,
};

const GetCountryReducer = (state = initialState, action) => {
    let item = { ...state };
    switch (action.type) {
        case 'SuccessGetCountry':
            item.data = action.data
            item.status = true
            item.loading = false
            break;
        case 'StartGetCountry':
            item.data = []
            item.status = false
            item.loading = true
            break;
        case 'ErrorGetCountry':
            item.data = []
            item.status = false
            item.loading = false
            break
        default:
            break;
    }
    return item;
};
export default GetCountryReducer;
