import { ErrorActivateTarif, ErrorGetCountry, ErrorGetMyTarife, ErrorGetTarifs } from "./errorAction"
import { StartActivateTarif, StartGetCountry, StartGetMyTarife, StartGetTarifs } from "./startAction"
import { SuccessActivateTarif, SuccessGetCountry, SuccessGetMyTarife, SuccessGetTsrifs } from "./successAction"

const api = 'https://spydog.justcode.am/api'
export const ChangeMoodToDark = () => {
    return {
        type: 'ChangeMoodToDark'
    }
}
export const ChangeMoodToLight = () => {
    return {
        type: 'ChangeMoodToLight'
    }
}
export const OpenMenu = (open) => {
    return {
        type: 'OpenMenu',
        open
    }
}

export const GetCountry = (code) => {
    return (dispatch) => {
        dispatch(StartGetCountry())
        var formdata = new FormData();
        formdata.append("phone_code", code);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${api}/get_country`, requestOptions)
            .then(response => response.json())
            .then(r => {
                if (r.status) {

                    dispatch(SuccessGetCountry(r.data))
                } else {
                    dispatch(ErrorGetCountry(error))
                }
            })
            .catch(error => {
                dispatch(ErrorGetCountry(error))
            });
    }
}

export const GetTarifs = () => {
    return (dispatch) => {
        dispatch(StartGetTarifs())
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${api}/get_tarifs`, requestOptions)
            .then(response => response.json())
            .then(r => {
                if (r.status) {
                    dispatch(SuccessGetTsrifs(r.data))
                } else {
                    dispatch(ErrorGetTarifs(error))
                }
            })
            .catch(error => {
                dispatch(ErrorGetTarifs(error))
            });
    }
}

export const ActivateTarifs = (data) => {
    var formdata = new FormData();
    formdata.append("phone_code", data.phone_code);
    formdata.append("tariff_id", data.tariff_id);

    return (dispatch) => {
        dispatch(StartActivateTarif())
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${api}/activate_tariff`, requestOptions)
            .then(response => response.json())
            .then(r => {
                if (r.status) {
                    dispatch(SuccessActivateTarif(r.data))
                } else {
                    dispatch(ErrorActivateTarif())
                }
            })
            .catch(error => {
                dispatch(ErrorActivateTarif())
            });
    }
}

export const GetMyTarife = (code) => {
    var formdata = new FormData();
    formdata.append("phone_code", code);

    return (dispatch) => {
        dispatch(StartGetMyTarife())
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${api}/validation_phone_code`, requestOptions)
            .then(response => response.json())
            .then(r => {
                if (r.status) {
                    dispatch(SuccessGetMyTarife(r.data))
                } else {
                    dispatch(ErrorGetMyTarife())
                }
            })
            .catch(error => {
                dispatch(ErrorGetMyTarife())
            });
    }
}

export const ChnageLanguage = (lang) => {
    return {
        type: 'ChnageLanguage',
        lang
    }
}