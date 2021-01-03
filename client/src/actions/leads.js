import axios from 'axios';
import {
    GET_LEADS,
    GET_LEADS_ERROR,
    ADD_LEAD,
    ADD_LEAD_ERROR,
    EDIT_LEAD,
    EDIT_LEAD_ERROR,
    DELETE_LEAD,
    DELETE_LEAD_ERROR,
} from './types';

export const getLeads = () => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const allLeads = await axios.get('/leads', null, config);
        dispatch({
            type: GET_LEADS,
            payload: allLeads,
        });
    } catch (error) {
        dispatch({ type: GET_LEADS_ERROR });
    }
};

export const addLead = (formData, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify(formData);

    try {
        const lead = await axios.post('/leads', body, config);

        dispatch({
            type: ADD_LEAD,
            payload: lead.data,
        });
        history.push('/leads/allleads');
    } catch (error) {
        dispatch({ type: ADD_LEAD_ERROR });
    }
};

export const editLead = (formData, leadId, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify(formData);

    try {
        const lead = await axios.put(`/leads/${leadId}`, body, config);

        dispatch({
            type: EDIT_LEAD,
            payload: lead.data,
        });
        history.push('/leads/allleads');
    } catch (error) {
        dispatch({ type: EDIT_LEAD_ERROR });
    }
};

export const deleteLeads = (leadIds) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    leadIds = leadIds.join(',');

    try {
        await axios.delete(`/leads/${leadIds}`, null, config);

        dispatch({
            type: DELETE_LEAD,
            payload: leadIds,
        });
    } catch (error) {
        dispatch({ type: DELETE_LEAD_ERROR });
    }
};
