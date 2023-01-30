import React, { useReducer, useContext, useEffect } from 'react';
import reducer from './reducer';
import axios from 'axios';
import hobbies from '../utils/hobbies';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  DELETE_JOB_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  ADD_SKILL,
  CHANGE_SKILL,
  DELETE_SKILL,
  SET_APPLICATIONS_BEGIN,
  SET_APPLICATIONS_SUCCESS,
  DELETE_APPLICATION,
  SET_EDIT_APPLICATION,
  SET_ALL_SKILLS,
  TOGGLE_SELECTED_SKILLS,
  SET_APPLICATIONS_ERROR,
  CREATE_APPLICANTS_BEGIN,
  CREATE_APPLICANTS_SUCCESS,
  CREATE_APPLICANTS_ERROR,
  EDIT_APPLICANT_BEGIN,
  EDIT_APPLICANT_SUCCESS,
  EDIT_APPLICANT_ERROR,
  CLEAN_ORPHAN_SKILL,
  HOBBY_SELECT,
  DELETE_HOBBY_SELECTED,
  ENTER_HOBBY_TO_LIST,
  CLEAR_HOBBY_INPUT,
  DELETE_APPLICATION_ERROR,
} from './actions';

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  showSidebar: false,
  alertText: '',
  alertType: '',
  user: null,
  userLocation: '',
  isEditing: false,
  idEditingApp: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['part-time', 'full-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  applicantFirstName: '',
  applicantLastName: '',
  applicantEmail: '',
  applicantPosition: '',
  applicantSkillsList: [''],
  applicantDescription: '',
  applications: [],
  allSkills: [],
  selectedSkills: [],
  allHobbies: hobbies,
  hobbyInput: '',
  selectedHobbies: [],
  eidtApplicantId: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // setup global axios headers

  // axios.defaults.headers['Authorization'] = `Bearer ${state.token}`; // have disadvantage=> it will pass the token to every API path, even the api don't need token.

  // setup Axios custom instance via axios library
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  // requst interceptor => token is reading by cookie now, no need for requst interceptor
  // authFetch.interceptors.request.use(
  //   (config) => {
  //     config.headers['Authorization'] = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });

    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // const addUserToLocalStorage = ({ user, token, location }) => {
  //   localStorage.setItem('user', JSON.stringify(user));
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('location', location);
  // };

  // const removeUserFromLocalStorage = () => {
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('location');
  // };

  const registerUser = async ({ currentUser }) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      // console.log('registerUser...........', currentUser);
      const response = await axios.post('/api/v1/auth/register', currentUser);
      // console.log('registerUser...........', response);
      const data = response.data;
      const { user, location } = data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, location },
      });

      // save token in localStorage
      // addUserToLocalStorage({ token, user, location });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post('/api/v1/auth/login', currentUser);
      const data = response.data;
      const { user, location } = data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, location },
      });

      // addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const setupUser = async ({ currentUser, endpoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(
        `/api/v1/auth/${endpoint}`,
        currentUser
      );
      const data = response.data;
      const { user, location } = data;
      // console.log('setup......', user, token, location);

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, alertText },
      });

      // addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = async () => {
    await authFetch.get('/auth/logout');
    dispatch({ type: LOGOUT_USER });
    // removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);

      const { user, location } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location },
      });

      // addUserToLocalStorage({ user, token, location });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }

    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    console.log(name, value);
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { company, position, jobLocation, status, jobType } = state;
      await authFetch.post('/jobs', {
        company,
        position,
        jobLocation,
        status,
        jobType,
      });

      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      });
    } catch (error) {
      // console.log(error.response);
      logoutUser();
    }
    clearAlert(); // just precaution, in our case, we can delete it.
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { company, position, jobType, status, jobLocation, editJobId } =
        state;

      await authFetch.patch(`/jobs/${editJobId}`, {
        company,
        position,
        jobType,
        status,
        jobLocation,
      });

      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;

      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });

    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      if (error.response.status === 401) return;

      dispatch({
        type: DELETE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/jobs/stats');

      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      // console.log(error.response);
      logoutUser();
    }

    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });

    try {
      const { data } = await authFetch('/auth/getCurrentUser');
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user: data.user, location: data.location },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  const addSkill = () => {
    console.log('Context ---- addSkill');
    dispatch({ type: ADD_SKILL });
  };

  const changeSkill = ({ skillValue, index }) => {
    dispatch({ type: CHANGE_SKILL, payload: { skillValue, index } });
  };

  const deleteSkill = ({ index }) => {
    dispatch({ type: DELETE_SKILL, payload: { index } });
  };

  const getApplications = async () => {
    dispatch({ type: SET_APPLICATIONS_BEGIN });

    try {
      const { data } = await authFetch('/applicants'); // badck
      // console.log("getApplications.....",data);

      dispatch({
        type: SET_APPLICATIONS_SUCCESS,
        payload: { applications: data.applicants },
      });
      const extractSkills = extractAllApplicantSkills(data.applicants);
      dispatch({ type: SET_ALL_SKILLS, payload: { extractSkills } }); // for all skills buttons
    } catch (error) {
      dispatch({
        type: SET_APPLICATIONS_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const createApplicant = async () => {
    dispatch({ type: CREATE_APPLICANTS_BEGIN });
    try {
      const {
        applicantFirstName,
        applicantLastName,
        applicantEmail,
        applicantPosition,
        applicantSkillsList,
        applicantDescription,
        selectedHobbies,
      } = state;

      await authFetch.put('/applicants', {
        firstName: applicantFirstName,
        lastName: applicantLastName,
        email: applicantEmail,
        position: applicantPosition,
        skills: applicantSkillsList,
        description: applicantDescription,
        hobbies: selectedHobbies,
      });

      dispatch({ type: CREATE_APPLICANTS_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_APPLICANTS_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteApplication = async (id) => {
    try {
      console.log('deleteApplication....', id);
      const { data } = await authFetch.delete(`/applicants/${id}`);

      console.log(console.log('deleteApplication....2', id));
      dispatch({ type: DELETE_APPLICATION, payload: { id, msg: data.msg } });

      await getApplications();
      cleanOrphanSkill();
    } catch (error) {
      if (error.response.status === 401) return;

      dispatch({
        type: DELETE_APPLICATION_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const setEditApplication = (id) => {
    dispatch({ type: SET_EDIT_APPLICATION, payload: { id } });
  };

  const editApplicant = async () => {
    dispatch({ type: EDIT_APPLICANT_BEGIN });
    try {
      const {
        applicantFirstName,
        applicantLastName,
        applicantEmail,
        applicantPosition,
        applicantSkillsList,
        applicantDescription,
        eidtApplicantId,
        selectedHobbies,
      } = state;

      await authFetch.post('/applicants', {
        firstName: applicantFirstName,
        lastName: applicantLastName,
        email: applicantEmail,
        position: applicantPosition,
        skills: applicantSkillsList,
        description: applicantDescription,
        id: eidtApplicantId,
        hobbies: selectedHobbies,
      });

      dispatch({ type: EDIT_APPLICANT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_APPLICANT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const extractAllApplicantSkills = (applicants) => {
    // console.log('extractAllApplicantSkills', applicants);
    const skillSet = new Set();

    applicants.forEach((applicant) => {
      applicant.skills.forEach((skill) => {
        skillSet.add(skill);
      });
    });

    // console.log('skillSet.....', Array.from(skillSet));

    return Array.from(skillSet);
  };

  const toggleSelectedSkills = (skill) => {
    dispatch({ type: TOGGLE_SELECTED_SKILLS, payload: { skill } });
    // dispatch({type: SELECTED_SKILLS})
  };

  const cleanOrphanSkill = () => {
    dispatch({ type: CLEAN_ORPHAN_SKILL });
  };

  const selectHobbyFromDropdown = (hobby) => {
    dispatch({ type: HOBBY_SELECT, payload: { hobby } });
  };

  const deleteHobbySelected = (hobby) => {
    dispatch({ type: DELETE_HOBBY_SELECTED, payload: { hobby } });
  };

  const enterHobby = () => {
    dispatch({ type: ENTER_HOBBY_TO_LIST });
  };

  const clearHobbyInput = () => {
    dispatch({ type: CLEAR_HOBBY_INPUT });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
        createApplicant,
        changeSkill,
        addSkill,
        deleteSkill,
        getApplications,
        deleteApplication,
        setEditApplication,
        toggleSelectedSkills,
        editApplicant,
        cleanOrphanSkill,
        selectHobbyFromDropdown,
        deleteHobbySelected,
        enterHobby,
        clearHobbyInput,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook
const useAppContext = () => {
  return useContext(AppContext); // via this we are able to use the value in state
};

export { AppProvider, initialState, useAppContext };

// useContext(AppContext), then you can use all the values in value={} which is in AppContext.Provider.
