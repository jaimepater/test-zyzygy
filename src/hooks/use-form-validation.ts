import { useReducer, useCallback } from 'react';

interface FormState {
  username: string;
  password: string;
  confirmPassword: string;
  errors: {
    username?: string;
    password?: string;
    confirmPassword?: string;
  };
  isValid: boolean;
  isSubmitting: boolean;
}

const initialState: FormState = {
  username: '',
  password: '',
  confirmPassword: '',
  errors: {},
  isValid: false,
  isSubmitting: false,
};
export type FormFields =  Omit<FormState, 'errors' | 'isValid' | 'isSubmitting'>;

type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormFields; value: string }
  | { type: 'SET_ERRORS'; errors: FormState['errors'] }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'RESET_FORM' };



const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
        isValid: Object.keys(action.errors).length === 0,
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};


export const useFormValidation = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setField = useCallback((field: keyof FormFields, value: string) => {
    dispatch({ type: 'SET_FIELD', field, value });
  }, []);

  const validateForm = useCallback((formData: { username: string; password: string; confirmPassword: string }) => {
    const errors: FormState['errors'] = {};


    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }


    if (!formData.password) {
      errors.password = 'Password is required';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    dispatch({ type: 'SET_ERRORS', errors });
    return Object.keys(errors).length === 0;
  }, []);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    dispatch({ type: 'SET_SUBMITTING', isSubmitting });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  return {
    state,
    setField,
    validateForm,
    setSubmitting,
    resetForm,
  };
};
