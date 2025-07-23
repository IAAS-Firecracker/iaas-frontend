// src/hooks/useUser.js
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  loginUser,
  registerUser,
  createAdminUser,
  fetchUsers,
  fetchUserById,
  fetchLoggedInUser,
  updateUser,
  deleteUser,
  updateUserProfile,
  deleteUserProfile,
  changePassword,
  requestPasswordReset,
  verifyResetCode,
  resetPassword,
  refreshAuthToken,
  logout,
  selectCurrentUser,
  selectUsers,
  selectSelectedUser,
  selectIsAuthenticated,
  selectUserToken,
  selectUserError,
  selectUserSuccess,
  selectIsLoading,
  clearUserError,
  clearUserSuccess,
  resetPasswordResetState,
  selectPasswordResetState
} from '../redux/slices/userSlice';

const useUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors
  const currentUser = useSelector(selectCurrentUser);
  const users = useSelector(selectUsers);
  const selectedUser = useSelector(selectSelectedUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = useSelector(selectUserToken);
  const error = useSelector(selectUserError);
  const success = useSelector(selectUserSuccess);
  const isLoading = useSelector(selectIsLoading);
  const passwordResetState = useSelector(selectPasswordResetState);

  // Authentication Actions
  const login = useCallback(async (credentials) => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      navigate('/dashboard'); // Or based on user role
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Login failed' };
    }
  }, [dispatch, navigate]);

  const register = useCallback(async (userData) => {
    try {
      await dispatch(registerUser(userData)).unwrap();
      navigate('/login', { state: { registrationSuccess: true } });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  }, [dispatch, navigate]);

  const signOut = useCallback(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  const refreshToken = useCallback(async (refreshToken) => {
    try {
      const result = await dispatch(refreshAuthToken(refreshToken)).unwrap();
      return { success: true, data: result };
    } catch (err) {
      signOut();
      return { success: false, error: 'Session expired. Please login again.' };
    }
  }, [dispatch, signOut]);

  // User Management Actions
  const getUsers = useCallback(async () => {
    try {
      await dispatch(fetchUsers()).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to fetch users' };
    }
  }, [dispatch]);

  const getUserById = useCallback(async (userId) => {
    try {
      await dispatch(fetchUserById(userId)).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to fetch user' };
    }
  }, [dispatch]);

  const getCurrentUser = useCallback(async (userId) => {
    try {
      await dispatch(fetchLoggedInUser(userId)).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to fetch current user' };
    }
  }, [dispatch]);

  const createAdmin = useCallback(async (adminData) => {
    try {
      const result = await dispatch(createAdminUser(adminData)).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to create admin' };
    }
  }, [dispatch]);

  const update = useCallback(async (userId, userData) => {
    try {
      const result = await dispatch(updateUser({ userId, userData })).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to update user' };
    }
  }, [dispatch]);

  const remove = useCallback(async (userId) => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to delete user' };
    }
  }, [dispatch]);

  // Profile Actions
  const updateProfile = useCallback(async (userId, profileData) => {
    try {
      const result = await dispatch(updateUserProfile({ id: userId, profileData })).unwrap();
      return { success: true, data: result };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to update profile' };
    }
  }, [dispatch]);

  const deleteProfile = useCallback(async (userId) => {
    try {
      await dispatch(deleteUserProfile(userId)).unwrap();
      signOut();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to delete profile' };
    }
  }, [dispatch, signOut]);

  // Password Actions
  const changeUserPassword = useCallback(async (passwordData) => {
    try {
      await dispatch(changePassword(passwordData)).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to change password' };
    }
  }, [dispatch]);

  const requestResetCode = useCallback(async (email) => {
    try {
      await dispatch(requestPasswordReset(email)).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to request reset code' };
    }
  }, [dispatch]);

  const verifyCode = useCallback(async (email, code) => {
    try {
      await dispatch(verifyResetCode({ email, code })).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to verify code' };
    }
  }, [dispatch]);

  const resetUserPassword = useCallback(async (email, code, newPassword) => {
    try {
      await dispatch(resetPassword({ email, code, newPassword })).unwrap();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to reset password' };
    }
  }, [dispatch]);

  // Helper functions
  const hasRole = useCallback((role) => {
    if (!currentUser) return false;
    return currentUser.roles?.includes(role) || currentUser.role === role;
  }, [currentUser]);

  const clearErrors = useCallback(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  const clearSuccess = useCallback(() => {
    dispatch(clearUserSuccess());
  }, [dispatch]);

  const resetPasswordReset = useCallback(() => {
    dispatch(resetPasswordResetState());
  }, [dispatch]);

  return {
    // State
    currentUser,
    users,
    selectedUser,
    isAuthenticated,
    token,
    error,
    success,
    isLoading,
    passwordResetState,

    // Authentication
    login,
    register,
    logout: signOut,
    refreshToken,

    // User Management
    getUsers,
    getUserById,
    getCurrentUser,
    createAdmin,
    updateUser: update,
    deleteUser: remove,

    // Profile Management
    updateProfile,
    deleteProfile,

    // Password Management
    changePassword: changeUserPassword,
    requestResetCode,
    verifyResetCode: verifyCode,
    resetPassword: resetUserPassword,

    // Helpers
    hasRole,
    clearErrors,
    clearSuccess,
    resetPasswordReset,
    isAdmin: hasRole('ADMIN'),
    isUser: hasRole('USER')
  };
};

export default useUser;