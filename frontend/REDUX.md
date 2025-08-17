# Redux Configuration Guide

This project uses Redux Toolkit for state management with TypeScript integration.

## 🏗️ Architecture

```
src/
├── store/
│   ├── index.ts              # Main store configuration
│   ├── hooks.ts              # Typed Redux hooks
│   └── slices/
│       ├── userSlice.ts      # User management slice
│       └── counterSlice.ts   # Counter demo slice
├── components/
│   ├── UserManagement/       # User management component
│   └── Counter/              # Counter demo component
└── REDUX.md                  # This file
```

## 🚀 Features

### ✅ What's Included:

- **Redux Toolkit** - Modern Redux with less boilerplate
- **TypeScript Integration** - Full type safety
- **Async Thunks** - API calls with loading states
- **Error Handling** - Comprehensive error management
- **DevTools** - Redux DevTools integration
- **Modern Hooks** - `useAppDispatch` and `useAppSelector`

### 🎯 State Management:

- **User Management** - CRUD operations with API integration
- **Counter Demo** - Simple state updates
- **Loading States** - UI feedback during operations
- **Error States** - User-friendly error messages

## 📦 Store Configuration

### Main Store (`store/index.ts`)

```typescript
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import counterReducer from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Typed Hooks (`store/hooks.ts`)

```typescript
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 🎨 Slices

### User Slice (`store/slices/userSlice.ts`)

- **State**: Users list, current user, loading, error
- **Actions**: CRUD operations with async thunks
- **API Integration**: Full backend communication

```typescript
// Async thunks
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await fetch('http://localhost:3000/api/users');
  return response.json();
});

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  }
);
```

### Counter Slice (`store/slices/counterSlice.ts`)

- **State**: Simple counter value
- **Actions**: Increment, decrement, reset
- **Demo**: Basic Redux functionality

## 🎯 Usage Examples

### Using Redux in Components

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUsers, createUser } from '@/store/slices/userSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreateUser = (userData) => {
    dispatch(createUser(userData));
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

### Dispatching Actions

```typescript
// Simple actions
dispatch(increment());
dispatch(decrement());
dispatch(reset());

// Actions with payload
dispatch(incrementByAmount(5));

// Async thunks
dispatch(fetchUsers());
dispatch(createUser({ name: 'John', email: 'john@example.com' }));
```

### Selecting State

```typescript
// Select entire slice
const userState = useAppSelector((state) => state.user);

// Select specific properties
const { users, loading, error } = useAppSelector((state) => state.user);

// Select single value
const count = useAppSelector((state) => state.counter.value);
```

## 🔧 Best Practices

### 1. **Use Typed Hooks**

```typescript
// ✅ Good
import { useAppDispatch, useAppSelector } from '@/store/hooks';

// ❌ Avoid
import { useDispatch, useSelector } from 'react-redux';
```

### 2. **Async Operations**

```typescript
// ✅ Use createAsyncThunk for API calls
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await fetch('/api/users');
  return response.json();
});
```

### 3. **Error Handling**

```typescript
// ✅ Handle errors in components
const { error } = useAppSelector((state) => state.user);
if (error) {
  return <div>Error: {error}</div>;
}
```

### 4. **Loading States**

```typescript
// ✅ Show loading indicators
const { loading } = useAppSelector((state) => state.user);
if (loading) {
  return <div>Loading...</div>;
}
```

## 🛠️ Development Tools

### Redux DevTools

- **Browser Extension**: Install Redux DevTools
- **Development**: Automatically enabled in development
- **Features**: State inspection, action replay, time-travel debugging

### TypeScript Integration

- **Type Safety**: Full TypeScript support
- **IntelliSense**: Autocomplete for actions and state
- **Error Prevention**: Compile-time error checking

## 📱 Components

### UserManagement Component

- **Features**: Full CRUD operations
- **API Integration**: Backend communication
- **UI**: Modern, responsive design
- **Error Handling**: User-friendly error messages

### Counter Component

- **Features**: Simple state management demo
- **Actions**: Increment, decrement, reset
- **UI**: Beautiful gradient design

## 🚀 Getting Started

### 1. **Install Dependencies**

```bash
npm install @reduxjs/toolkit react-redux
```

### 2. **Setup Store**

```typescript
// main.tsx
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### 3. **Create Slices**

```typescript
import { createSlice } from '@reduxjs/toolkit';

const mySlice = createSlice({
  name: 'mySlice',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});
```

### 4. **Use in Components**

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.mySlice.value);

  return <button onClick={() => dispatch(increment())}>{value}</button>;
};
```

## 🔍 Debugging

### Redux DevTools

1. Install Redux DevTools browser extension
2. Open browser DevTools
3. Go to Redux tab
4. Inspect state and actions

### Console Logging

```typescript
// Add to store configuration
devTools: process.env.NODE_ENV !== 'production',
```

## 📚 Additional Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Redux Hooks](https://react-redux.js.org/api/hooks)
- [TypeScript with Redux](https://redux-toolkit.js.org/usage/usage-with-typescript)
- [Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
