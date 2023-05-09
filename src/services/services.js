import { API_URL } from "../components/constants";

export const saveTraining = (training) => {
    return fetch(`${API_URL}/api/trainings`,
        {
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(training)
        });
}

export const updateCustomer = (link, customer) => {
    return fetch(link,
        {
            headers: { 'Content-type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(customer)
        });
}

export const saveCustomer = (customer) => {
    return fetch(`${API_URL}/api/customers`,
        {
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(customer)
        });
}

export const deleteCustomer = (link) => {
    return fetch(link, { method: 'DELETE' });
}

export const deleteTraining = (id) => {
    return fetch(`${API_URL}/api/trainings/${id}`, { method: 'DELETE' });
}