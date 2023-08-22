const initialState = {
    data: [],
    status: false,
    loading: false,
};

const GetTarifsReducer = (state = initialState, action) => {
    let item = { ...state };
    switch (action.type) {
        case 'SuccessGetTsrifs':
            item.data = action.data
            item.status = true
            item.loading = false
            break;
        case 'StartGetTarifs':
            item.data = []
            item.status = false
            item.loading = true
            break;
        case 'ErrorGetTarifs':
            item.data = []
            item.status = false
            item.loading = false
            break
        default:
            break;
    }
    return item;
};
export default GetTarifsReducer;
