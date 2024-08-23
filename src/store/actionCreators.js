const BASE_URL = `http://localhost:3001`
const BASE_URL_TESTING = `http://36.92.58.82:1525/api`
const BASE_URL_ACN = `http://${import.meta.env.VITE_API_URL2}`
import Swal from 'sweetalert2';


export const subscribeUser = (email) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                alert('Subscribe berhasil! Silakan cek email Anda.');
                dispatch({ type: 'user/subscribe', payload: email });
            } else {
                alert('Gagal melakukan subscribe. Mohon coba lagi.');
            }
        } catch (error) {
            console.error('Error subscribing:', error);
            alert('Gagal melakukan subscribe. Mohon coba lagi.');
        }
    };
};

export const resetPassword = (resetEmail, newPassword) => {
    return async (dispatch) => {
      try {
        const response = await fetch(`${BASE_URL}/forget`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: resetEmail, newPassword }),
        });
  
        if (response.ok) {
          Swal.fire('Success', 'Password has been reset successfully', 'success');
          return true;
        } else {
          Swal.fire('Error', 'Failed to reset password', 'error');
          return false;
        }
      } catch (error) {
        Swal.fire('Error', 'Something went wrong', 'error');
        return false;
      }
    };
  };

export const formatDate = (isoDate) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(isoDate);
    return date.toLocaleDateString('id-ID', options);
};

export const fetchServices = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/services`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'services/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchTrainingEvents = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/trainingEvents`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'trainingEvents/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const addTrainingEvent = (eventData) => {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('judul', eventData.judul);
            formData.append('tanggal', eventData.tanggal);
            formData.append('link_gambar', eventData.link_gambar);

            const response = await fetch(`${BASE_URL}/trainingEvents/add`, {
                method: 'POST',
                body: formData,
                headers: {
                    "access_token": localStorage.getItem('access_token')
                },
            });

            if (!response.ok) {
                throw new Error('Failed to add event');
            }

            await response.json();
            dispatch(fetchTrainingEvents()); // Refresh the event list
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };
};

export const deleteTrainingEvent = (id) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/trainingEvents/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': localStorage.getItem('access_token'),
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            }

            dispatch({ type: 'DELETE_TRAINING_EVENT', payload: id });
        } catch (error) {
            console.error('Error deleting training event:', error);
            throw error;
        }
    };
};

export const fetchPortfolio = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/portfolio`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'portfolio/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const registerUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response from server:', errorData);
                throw new Error('Registration failed');
            }

            const data = await response.json();
            console.log('Registration Response Data:', data);

            dispatch({
                type: 'user/add',
                payload: data,
            });
        } catch (error) {
            console.error('Error occurred during registration:', error);
        }
    };
};


export const fetchUsers = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/users`, {
                method: "GET",
                headers: {
                    "access_token": localStorage.getItem('access_token')
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'users/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const loginUser = (DB_USER, DB_PASS) => {
    return async dispatch => {
        try {
            const payload = {
                email: DB_USER,
                password: DB_PASS,
            };
            console.log('Request Payload:', payload);

            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response from server:', errorData);
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Response Data:', data);

            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('role', data.role);
            localStorage.setItem('id', data.id);

            dispatch({
                type: 'user/login',
                payload: {
                    email: DB_USER,
                    access_token: data.access_token
                },
            });
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    };
};


export const fetchListPeserta = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/listPeserta`, {
                method: "GET",
                headers: {
                    "access_token": localStorage.getItem('access_token'),
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'listPeserta/get', payload: data });
        } catch (error) {
            console.error(error.message);
        }
    };
};

export const addListPeserta = (pesertaData, userId, trainingEventId) => {
    console.log(pesertaData, 'ini');
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/listPeserta/add?userId=${userId}&trainingEventId=${trainingEventId}`, {
                method: "POST",
                headers: {
                    "access_token": localStorage.getItem('access_token'),
                },
                body: pesertaData,
            });

            if (!response.ok) {
                throw new Error('Failed to add peserta');
            }

            const data = await response.json();
            dispatch({ type: 'listPeserta/add', payload: data });
        } catch (error) {
            console.error(error.message);
        }
    };
};

export const deleteListPeserta = (id) => {
    return async (dispatch) => {
        try {
            await fetch(`${BASE_URL}/listPeserta/${id}`, {
                method: "DELETE",
                headers: {
                    "access_token": localStorage.getItem('access_token'),
                },
            });

            dispatch({ type: 'listPeserta/delete', payload: id });
        } catch (error) {
            console.error(error.message);
        }
    };
};
