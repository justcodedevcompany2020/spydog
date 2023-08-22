const initialState = {
    data: [],
    status: false,
    loading: false,
};

const ActivateTarifReducer = (state = initialState, action) => {
    let item = { ...state };
    switch (action.type) {
        case 'SuccessActivateTarif':
            item.data = action.data
            item.status = true
            item.loading = false
            break;
        case 'StartActivateTarif':
            item.data = []
            item.status = false
            item.loading = true
            break;
        case 'ErrorActivateTarif':
            item.data = []
            item.status = false
            item.loading = false
            break
        case 'ClearActivateTarifStatus':
            item.data = []
            item.status = false
            item.loading = false
            break
        default:
            break;
    }
    return item;
};
export default ActivateTarifReducer;
