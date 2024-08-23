import { combineReducers } from "redux";

const servicesState = {
  services: [],
  loading: true
}

const trainingEventsState = {
  trainingEvents: [],
  loading: true
}

const portfolioState = {
  portfolio: [],
  loading: true
}

const usersState = {
  users: [],
  loading: true
}

const listPesertaState = {
  listPeserta: [],
  loading: true
}


const servicesReducer = (state = servicesState, actions) => {
  switch (actions.type) {
    case 'services/get':
      return {
        ...state,
        services: actions.payload,
        loading: false
      }
    default:
      return state;
  }
}

const trainingEventsReducer = (state = trainingEventsState, actions) => {
  switch (actions.type) {
    case 'trainingEvents/get':
      return {
        ...state,
        trainingEvents: actions.payload,
        loading: false
      }
    case 'trainingEvent/add':
      return {
        ...state,
        trainingEvents: [...state.trainingEvents, actions.payload],
      };
    case 'DELETE_TRAINING_EVENT':
      return {
        ...state,
        trainingEvents: state.trainingEvents.filter(event => event.id !== actions.payload),
      };
    default:
      return state;
  }
}

const portfolioReducer = (state = portfolioState, actions) => {
  switch (actions.type) {
    case 'portfolio/get':
      return {
        ...state,
        portfolio: actions.payload,
        loading: false
      }
    default:
      return state;
  }
}

const usersReducer = (state = usersState, actions) => {
  switch (actions.type) {
    case 'users/get':
      return {
        ...state,
        users: actions.payload,
        loading: false,
      };
    case 'user/add':
      return {
        ...state,
        users: [...state.users, actions.payload],
      };
    case 'user/subscribe':
      return {
        ...state,
        users: state.users.map(user =>
          user.email === actions.payload ? { ...user, subscribed: true } : user
        ),
      };
    default:
      return state;
  }
}

const listPesertaReducer = (state = listPesertaState, actions) => {
  switch (actions.type) {
    case 'listPeserta/get':
      return {
        ...state,
        listPeserta: actions.payload,
        loading: false,
        error: null,
      };
    case 'listPeserta/add':
      return {
        ...state,
        listPeserta: [...state.listPeserta, actions.payload],
        loading: false,
        error: null,
      };
    case 'listPeserta/delete':
      return {
        ...state,
        listPeserta: state.listPeserta.filter(peserta => peserta.id !== actions.payload),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};



const rootReducer = combineReducers({
  services: servicesReducer,
  trainingEvents: trainingEventsReducer,
  portfolio: portfolioReducer,
  users: usersReducer,
  listPeserta: listPesertaReducer,
})

export default rootReducer