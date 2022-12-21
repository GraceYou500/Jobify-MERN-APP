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
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
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
  ADD_SKILLS,
  ADD_SKILL,
  CHANGE_SKILL,
  DELETE_SKILL,
  DELETE_APPLICATION,
  SET_EDIT_APPLICATION,
  SET_ALL_SKILLS,
  TOGGLE_SELECTED_SKILLS,
  SET_APPLICATIONS_BEGIN,
  SET_APPLICATIONS_SUCCESS,
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
} from './actions';
import { initialState } from './appContext';



const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: 'Register successfully! Redirecting...',
      alertType: 'success',
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: 'danger',
    };
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: 'Login successfully! Redirecting...',
      alertType: 'success',
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: 'danger',
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.alertText,
      alertType: 'success',
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    };
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: 'danger',
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userLoading: false,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: 'User Profile Updated!',
      alertType: 'success',
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: 'danger',
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  // if (action.type === ADD_SKILLS) {

  //   return {
  //     ...state,
  //     applicantSkillsList: action.payload.skillsList,
  //   };
  // }

  if (action.type === ADD_SKILL) {
    console.log("ADD_SKILLS......");
    return {
      ...state,
      applicantSkillsList: [...state.applicantSkillsList, ''],
    };
  }

  if (action.type === CHANGE_SKILL) {
    // state.applicantSkillsList[action.payload.index] = action.payload.skillValue;
    const newArr = [
      ...state.applicantSkillsList.slice(0, action.payload.index),
      action.payload.skillValue,
      ...state.applicantSkillsList.slice(
        action.payload.index + 1,
        state.applicantSkillsList.length
      ),
    ];
    return {
      ...state,
      applicantSkillsList: newArr,
    };
  }

  if (action.type === DELETE_SKILL) {
    // state.applicantSkillsList[action.payload.index] = action.payload.skillValue;
    const newArr = [
      ...state.applicantSkillsList.slice(0, action.payload.index),
      ...state.applicantSkillsList.slice(
        action.payload.index + 1,
        state.applicantSkillsList.length
      ),
    ];
    return {
      ...state,
      applicantSkillsList: newArr,
    };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editJobId: '',
      position: '',
      company: '',
      jobLocation: state.userLocation,
      jobType: 'full-time',
      status: 'pending',
      idEditingApp: false,
      applicantFirstName: '',
      applicantLastName: '',
      applicantEmail: '',
      applicantPosition: '',
      applicantSkillsList: [''],
      applicantDescription: '',
      selectedHobbies:[],
    };
    return {
      ...state,
      ...initialState,
    };
  }

  if (action.type === CREATE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: 'Create job successfully!',
      alertType: 'success',
    };
  }

  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: 'danger',
    };
  }

  if (action.type === GET_JOBS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_EDIT_JOB) {
    const job = state.jobs.find((job) => job._id === action.payload.id);
    const { company, position, jobType, status, jobLocation, _id } = job;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      company,
      position,
      jobType,
      status,
      jobLocation,
    };
  }

  if (action.type === DELETE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === DELETE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: 'danger',
    };
  }

  if (action.type === EDIT_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: 'Update job successfully!',
      alertType: 'success',
    };
  }

  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: 'danger',
    };
  }

  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: '',
      searchStatus: 'all',
      searchType: 'all',
      sort: 'latest',
    };
  }

  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }

  if (action.type === GET_CURRENT_USER_BEGIN) {
    return {
      ...state,
      userLoading: true,
      showAlert: false,
    };
  }

  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      userLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    };
  }

  if (action.type === SET_APPLICATIONS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    }
  }

  if (action.type === SET_APPLICATIONS_SUCCESS) {

    // let selectedApplications=[];
    // if(state.selectedSkills.length === 0) {      
    //   selectedApplications = action.payload.applications;
    // } else {
    //   selectedApplications = state.applications.filter((application) => isSelected(state.selectedSkills, application.skills))
    // }

    return {
      ...state,
      isLoading: false,
      applications:action.payload.applications,
    };
  }

  
  if (action.type === SET_APPLICATIONS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: 'danger',
    };
  }

  if(action.type === CREATE_APPLICANTS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    }
  }
  
  if (action.type === CREATE_APPLICANTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: 'Create applicant successfully!',
      alertType: 'success',
    }
  }

  if (action.type === CREATE_APPLICANTS_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: 'danger',
    }
  }

  if (action.type === DELETE_APPLICATION) {
    const newApps = state.applications.filter(
      (item) => item._id !== action.payload.id
    );
    return {
      ...state,
      showAlert:true,
      alertText: action.payload.msg,
      alertType: 'success',
      applications: newApps,
    };
  }

  if (action.type === SET_EDIT_APPLICATION) {
    const applicant = state.applications.find(
      (item) => item._id === action.payload.id
    );
    const { firstName, lastName, position, email, skills, description, hobbies } = applicant;

    return {
      ...state,
      idEditingApp: true,
      eidtApplicantId:action.payload.id,
      applicantFirstName: firstName,
      applicantLastName: lastName,
      applicantEmail: email,
      applicantPosition: position,
      applicantSkillsList: skills,
      applicantDescription: description,
      selectedHobbies: hobbies,
    };
  }

  if (action.type === SET_ALL_SKILLS) {
    return {
      ...state,
      allSkills: action.payload.extractSkills,
    };
  }

  if (action.type === TOGGLE_SELECTED_SKILLS) {
    // console.log("TOGGLE_SELECTED_SKILLS..", action.payload.skill);
    let newSelectedSkills = [];
    if (state.selectedSkills.includes(action.payload.skill)) {
      newSelectedSkills = state.selectedSkills.filter(skill => ( skill !== action.payload.skill ))
    } else {
      newSelectedSkills = [...state.selectedSkills, action.payload.skill];
    }

    return {
      ...state,
      selectedSkills:newSelectedSkills,
    };
  }

  if (action.type === EDIT_APPLICANT_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    }
  }

  if (action.type === EDIT_APPLICANT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: 'Update applicant successfully!',
      alertType: 'success',

    }
  }

  if(action.type === CLEAN_ORPHAN_SKILL) {
    const validSelectedSkills = state.selectedSkills;
    for (let i in validSelectedSkills) {
      if (!state.allSkills.includes(validSelectedSkills[i])) {
        validSelectedSkills.splice(i,1);
      }
    }
    // console.log("CLEAN_ORPHAN_SKILL....",validSelectedSkills);
    return {
      ...state,
      selectedSkills:validSelectedSkills,
    }
  }

  if (action.type === HOBBY_SELECT) {
    let newArr = [...state.selectedHobbies];

    if(!newArr.includes(action.payload.hobby)) {
      newArr = [...state.selectedHobbies, action.payload.hobby];
    }
    
    return {
      ...state,
      selectedHobbies: newArr,
    }
  }

  if (action.type === DELETE_HOBBY_SELECTED) {
    const newHobbies = state.selectedHobbies.filter(hobby => hobby !== action.payload.hobby);

    return {
      ...state,
      selectedHobbies: newHobbies,
    }
  }

  if (action.type === ENTER_HOBBY_TO_LIST) {
    let newArr = [...state.selectedHobbies];

    if(!newArr.includes(state.hobbyInput)) {
      newArr = [...state.selectedHobbies, state.hobbyInput];
    }

    return {
      ...state,
      selectedHobbies: newArr,
    }  
  }

  if (action.type === CLEAR_HOBBY_INPUT) {
    return {
      ...state,
      hobbyInput:"",
    }
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
