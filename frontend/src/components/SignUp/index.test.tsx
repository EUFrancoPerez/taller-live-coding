import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import SignUp from './index';

describe('SignUp Component', () => {
  beforeEach(() => {
    render(<SignUp />);
  });

  it('renders the signup form with all elements', () => {
    // Check if the form title is rendered
    expect(screen.getByText('SignUp')).toBeInTheDocument();

    // Check if email input is rendered
    expect(screen.getByTestId('email')).toBeInTheDocument();

    // Check if password input is rendered
    expect(screen.getByTestId('password')).toBeInTheDocument();

    // Check if submit button is rendered
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('updates form values when user types', () => {
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;

    // Type in email field
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    // Type in password field
    fireEvent.change(passwordInput, { target: { value: 'password123!' } });
    expect(passwordInput.value).toBe('password123!');
  });

  it('shows validation errors for empty form submission', async () => {
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('shows validation errors for invalid email format', async () => {
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // Enter invalid email and valid password
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email must contain "@"')).toBeInTheDocument();
    });
  });

  it('shows validation errors for email without domain', async () => {
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // Enter email without proper domain
    fireEvent.change(emailInput, { target: { value: 'test@' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Email must contain "." and a domain')
      ).toBeInTheDocument();
    });
  });

  it('shows validation errors for weak password', async () => {
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // Enter valid email and weak password
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'weak' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Password must be at least 8 characters long')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Password must contain at least one number')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Password must contain at least one special character')
      ).toBeInTheDocument();
    });
  });

  it('shows validation error for password without numbers', async () => {
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // Enter valid email and password without numbers
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password!' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Password must contain at least one number')
      ).toBeInTheDocument();
    });
  });

  it('shows validation error for password without special characters', async () => {
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // Enter valid email and password without special characters
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText('Password must contain at least one special character')
      ).toBeInTheDocument();
    });
  });

  it('shows success message for valid form submission', async () => {
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // Enter valid email and password
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('SignUp successful')).toBeInTheDocument();
    });
  });

  it('clears form fields after successful submission', async () => {
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const passwordInput = screen.getByTestId('password') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // Enter valid email and password
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput.value).toBe('');
      expect(passwordInput.value).toBe('');
    });
  });

  it('clears previous errors when form is resubmitted', async () => {
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // First submission with invalid data
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email must contain "@"')).toBeInTheDocument();
    });

    // Second submission with valid data
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.queryByText('Email must contain "@"')
      ).not.toBeInTheDocument();
      expect(screen.getByText('SignUp successful')).toBeInTheDocument();
    });
  });

  it('prevents form submission with invalid data', async () => {
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    // Enter invalid data
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'weak' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      // Should not show success message
      expect(screen.queryByText('SignUp successful')).not.toBeInTheDocument();
      // Should show error messages
      expect(screen.getByText('Email must contain "@"')).toBeInTheDocument();
    });
  });
});
