import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Github, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface AuthFormProps {
  onSuccess: () => void;
}

interface PasswordStrength {
  score: number;
  message: string;
  color: string;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({ score: 0, message: '', color: 'gray' });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isResetPassword, setIsResetPassword] = useState(false);

  useEffect(() => {
    // Simple password strength checker
    const checkPasswordStrength = (pass: string) => {
      const hasLower = /[a-z]/.test(pass);
      const hasUpper = /[A-Z]/.test(pass);
      const hasNumber = /\d/.test(pass);
      const hasSpecial = /[!@#$%^&*]/.test(pass);
      const length = pass.length;

      let score = 0;
      if (length > 8) score++;
      if (hasLower && hasUpper) score++;
      if (hasNumber) score++;
      if (hasSpecial) score++;

      const strengthMap: Record<number, PasswordStrength> = {
        0: { score: 0, message: 'Very Weak', color: 'red' },
        1: { score: 25, message: 'Weak', color: 'orange' },
        2: { score: 50, message: 'Medium', color: 'yellow' },
        3: { score: 75, message: 'Strong', color: 'light-green' },
        4: { score: 100, message: 'Very Strong', color: 'green' }
      };

      setPasswordStrength(strengthMap[score]);
    };

    if (password) checkPasswordStrength(password);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      if (isResetPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        setSuccessMessage('Password reset instructions have been sent to your email');
        return;
      }

      if (isSignUp) {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (passwordStrength.score < 50) {
          throw new Error('Please choose a stronger password');
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setSuccessMessage('Registration successful! Please check your email for verification.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          {isResetPassword ? 'Reset Password' : isSignUp ? 'Create Account' : 'Welcome to MoniPro'}
        </h2>
        <p className="text-gray-400">
          {isResetPassword
            ? 'Enter your email to receive reset instructions'
            : isSignUp
            ? 'Sign up to get started with our service'
            : 'Sign in to access your account'}
        </p>
      </div>

      <button
        type="button"
        onClick={() => handleSocialLogin('github')}
        className="w-full flex items-center justify-center space-x-2 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors mb-4"
      >
        <Github className="h-5 w-5" />
        <span>Continue with GitHub</span>
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
              required
            />
        </div>
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
              )}
            </button>
          </div>
          {password && (
            <div className="mt-2">
              <div className="h-2 rounded-full bg-gray-700">
                <div
                  className={`h-full rounded-full bg-${passwordStrength.color}-500 transition-all duration-300`}
                  style={{ width: `${passwordStrength.score}%` }}
                ></div>
              </div>
              <p className={`text-sm mt-1 text-${passwordStrength.color}-500`}>{passwordStrength.message}</p>
            </div>
          )}
        </div>
        {isSignUp && (
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                required
              />
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-md bg-red-900/50 border border-red-800">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-md bg-green-900/50 border border-green-800">
            <p className="text-green-500 text-sm">{successMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 transform mt-4"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : isResetPassword ? (
            'Send Reset Instructions'
          ) : isSignUp ? (
            'Create Account'
          ) : (
            'Sign In'
          )}
        </button>

        <div className="flex flex-col space-y-2">
          {!isResetPassword && (
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setSuccessMessage(null);
              }}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setIsResetPassword(!isResetPassword);
              setError(null);
              setSuccessMessage(null);
              setIsSignUp(false);
            }}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            {isResetPassword ? 'Back to Sign In' : 'Forgot your password?'}
          </button>
        </div>
        </div>
      </form>
    </div>
  );
}