import { useState } from 'react';

const SignUp = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string[]>([]);
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
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
  };

  const validatePassword = (password: string) => {
    const errors = [];
    if (password === '') {
      errors.push('Password is required');
    }
    if (form.password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!form.password.match(/\d/)) {
      errors.push('Password must contain at least one number');
    }
    if (!form.password.match(/\W/)) {
      errors.push('Password must contain at least one special character');
    }
    return errors;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
  };

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {error.length > 0 &&
          error.map((error, index) => (
            <p key={index} style={{ color: 'red' }}>
              {error}
            </p>
          ))}
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
    </div>
  );
};

export default SignUp;
