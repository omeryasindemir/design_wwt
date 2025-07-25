// requests.jsx
const API_BASE_URL = "https://73c2415cc085.ngrok-free.app";

export const getRequest = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("GET request error:", error);
        throw error;
    }
};

export const postRequest = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("POST request error:", error);
        throw error;
    }
};


// -----------------------------------------------------------



export const authLogin = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify(data),
            credentials: "include"
        });

        if (response.status === 301) {
            return response;
        }

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        return await response.json();
        
    } catch (error) {
        console.error("POST request error:", error);
        throw error;
    }
};


export const authMe = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "csrf-token": data,
                'ngrok-skip-browser-warning': 'true'
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("POST request error:", error);
        throw error;
    }
};




// -----------------------------------------------------------


export const adminCreateKey = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/createKey`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "csrf-token": data,
                'ngrok-skip-browser-warning': 'true'
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("POST request error:", error);
        throw error;
    }
};


export const adminManageKey = async (data, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/manageKey`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "csrf-token": token,
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify(data),
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("POST request error:", error);
        throw error;
    }
};


export const adminActiveKeys = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/getKey/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "csrf-token": data,
                'ngrok-skip-browser-warning': 'true'
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("POST request error:", error);
        throw error;
    }
};


// -----------------------------------------------------------



export const userBindKey = async (data, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/bindKey`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "csrf-token": token,
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify(data),
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("POST request error:", error);
        throw error;
    }
};

export const userCredSave = async (data, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/manageKey`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "csrf-token": token,
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify(data),
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("POST request error:", error);
        throw error;
    }
};


export const userNewTender = async (data, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auction/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "csrf-token": token,
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify(data),
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("POST request error:", error);
        throw error;
    }
};

// -----------------------------------------------------------

export const auctionTenderList = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auction/get/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "csrf-token": data,
                'ngrok-skip-browser-warning': 'true'
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("POST request error:", error);
        throw error;
    }
};

export const auctionMaxBidEdit = async (data, token, id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auction/manage/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "csrf-token": token,
                'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify(data),
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("POST request error:", error);
        throw error;
    }
};