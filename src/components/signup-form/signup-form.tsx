import React, { useEffect } from 'react';
import './signup-form.css';
import InputField from "../input-field/input-field";
import {FormFields, useFormValidation} from "../../hooks/use-form-validation";



const SignupForm = () => {
    const { state, setField, validateForm, setSubmitting, resetForm } = useFormValidation();

    useEffect(() => {
        validateForm({
            username: state.username,
            password: state.password,
            confirmPassword: state.confirmPassword,
        });
    }, [state.username, state.password, state.confirmPassword, validateForm]);

    const handleInputChange = (field: keyof FormFields) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setField(field, e.target.value);
        };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = validateForm({
            username: state.username,
            password: state.password,
            confirmPassword: state.confirmPassword,
        });

        if (!isValid) {
            return;
        }

        setSubmitting(true);

        // Mock API request with delay
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            alert(`Account created successfully for user: ${state.username}`);

            // Reset form after successful submission
            resetForm();
        } catch (_error) {
            alert("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (state.isValid && !state.isSubmitting) {
                handleSubmit(e as any);
            }
        }
    };

    return (
            <div className="signup-form-wrapper">
                <h1 className="signup-title" id="signup-title">Create Your Account</h1>
                <p className="signup-subtitle" id="signup-desc">Join us today! Fill out the form below to get started.</p>

                <form
                    className="signup-form"
                    aria-labelledby="signup-title"
                    aria-describedby="signup-desc"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <InputField
                        id="username"
                        name="username"
                        type="text"
                        label="Username"
                        value={state.username}
                        onChange={handleInputChange('username')}
                        error={state.errors.username}
                        placeholder="Enter your username"
                        required
                    />

                    <InputField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        value={state.password}
                        onChange={handleInputChange('password')}
                        error={state.errors.password}
                        placeholder="Enter your password"
                        required
                    />

                    <InputField
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleInputChange('confirmPassword')}
                        error={state.errors.confirmPassword}
                        placeholder="Confirm your password"
                        required
                    />

                    <button
                        type="submit"
                        className={`submit-button ${!state.isValid || state.isSubmitting ? 'disabled' : ''}`}
                        disabled={!state.isValid || state.isSubmitting}
                        aria-disabled={!state.isValid || state.isSubmitting}
                        aria-describedby="submit-help"
                    >
                        {state.isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
            </div>
    );
};

export default SignupForm;
