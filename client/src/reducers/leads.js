import {
    GET_LEADS,
    GET_LEADS_ERROR,
    ADD_LEAD,
    ADD_LEAD_ERROR,
    EDIT_LEAD,
    EDIT_LEAD_ERROR,
    DELETE_LEAD,
    DELETE_LEAD_ERROR,
} from '../actions/types';

const initialState = {
    count: 0,
    leads: [],
    isAuthenticated: false,
    loading: true,
};

const leadState = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_LEADS:
            return {
                ...state,
                count: payload.data.onBoardLeads.length,
                leads: payload.data.onBoardLeads,
                isAuthenticated: true,
                loading: false,
            };
        case ADD_LEAD:
            state.leads.push(payload.data);
            return {
                ...state,
                count: state.leads.length,
                isAuthenticated: true,
                loading: false,
            };
        case EDIT_LEAD:
            const editLeadIndex = state.leads.findIndex(
                (lead) => lead.id === payload.data.id
            );

            state.leads[editLeadIndex] =
                editLeadIndex === -1 ? undefined : payload.data;

            return {
                ...state,
                isAuthenticated: true,
                loading: false,
            };
        case DELETE_LEAD:
            const deleteIndex = payload.split(',').map(Number);

            return {
                ...state,
                count: state.leads.length - 1,
                leads: state.leads.filter(
                    (lead) => !deleteIndex.includes(lead.id)
                ),
                isAuthenticated: true,
                loading: false,
            };
        case GET_LEADS_ERROR:
        case ADD_LEAD_ERROR:
        case EDIT_LEAD_ERROR:
        case DELETE_LEAD_ERROR:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
            };
        default:
            return state;
    }
};

export default leadState;
