import { useState, useCallback, useMemo, useRef, useEffect } from 'react';

import './index.css';

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string[]>([]);
  const [success, setSuccess] = useState('');

  // useRef for email input focus
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Focus email input when component mounts
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  // Memoize the handleChange function
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  // Memoize validation functions
  const validateEmail = useCallback((email: string) => {
    const errors = [];
    if (email === '') {
      errors.push('Email is required');
    }
    if (!email.includes('@')) {
      errors.push('Email must contain "@"');
    }
    if (email.includes('@') && !email.split('@')[1].includes('.')) {
      errors.push('Email must contain "." and a domain');
    }
    if (
      email.includes('@') &&
      email.split('@')[1].includes('.') &&
      !email.split('.')[1]
    ) {
      errors.push('Email have a valid domain');
    }
    return errors;
  }, []);

  const validatePassword = useCallback((password: string) => {
    const errors = [];
    if (password === '') {
      errors.push('Password is required');
    }
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!password.match(/\d/)) {
      errors.push('Password must contain at least one number');
    }
    if (!password.match(/\W/)) {
      errors.push('Password must contain at least one special character');
    }
    return errors;
  }, []);

  // Memoize the onSubmit function
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError([]);
      setSuccess('');

      let errors: string[] = [];
      errors = errors.concat(validateEmail(form.email));
      errors = errors.concat(validatePassword(form.password));

      if (errors.length > 0) {
        setError(errors);
        return;
      }

      setSuccess('SignUp successful');
      setForm({ email: '', password: '' });

      // Focus back to email input after successful submission
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 100);
    },
    [form.email, form.password, validateEmail, validatePassword]
  );

  // Memoize expensive computations
  const hasErrors = useMemo(() => error.length > 0, [error.length]);

  return (
    <form onSubmit={onSubmit} className="form-container">
      <h2>SignUp</h2>
      <input
        ref={emailInputRef}
        id="email"
        data-testid="email"
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        id="password"
        data-testid="password"
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      {hasErrors && (
        <div className="error-container">
          {error.map((error, index) => (
            <p
              key={index}
              style={{
                color: 'red',
                margin: '0',
              }}
            >
              {error}
            </p>
          ))}
        </div>
      )}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px',
          borderRadius: '10px',
        }}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default SignUp;
