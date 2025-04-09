
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin?: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock database of users
const USERS_STORAGE_KEY = "nike_store_users";
const CURRENT_USER_KEY = "nike_store_current_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Helper to get users from storage
  const getUsers = (): Record<string, User & { password: string }> => {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : {};
  };

  // Helper to save users to storage
  const saveUsers = (users: Record<string, User & { password: string }>) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = getUsers();
      const userRecord = Object.values(users).find(
        u => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (!userRecord) {
        throw new Error("No account found with this email address");
      }
      
      if (userRecord.password !== password) {
        throw new Error("Invalid password");
      }
      
      // Remove password before storing in state
      const { password: _, ...userWithoutPassword } = userRecord;
      
      // Save to state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Welcome back!",
        description: `Logged in as ${userWithoutPassword.firstName} ${userWithoutPassword.lastName}`,
      });
    } catch (error) {
      console.error("Login error:", error);
      
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string
  ) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = getUsers();
      
      // Check if email already exists
      if (Object.values(users).some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("An account with this email already exists");
      }
      
      // Create new user
      const newUserId = `user_${Date.now()}`;
      const newUser = {
        id: newUserId,
        email,
        password,
        firstName,
        lastName,
        isAdmin: false,
      };
      
      // Save to mock DB
      users[newUserId] = newUser;
      saveUsers(users);
      
      // Remove password before storing in state
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Save to state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Account created successfully!",
        description: "Welcome to Nike Store",
      });
    } catch (error) {
      console.error("Registration error:", error);
      
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message,
        });
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) throw new Error("Not authenticated");
    
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = getUsers();
      const userRecord = users[user.id];
      
      if (!userRecord) {
        throw new Error("User not found");
      }
      
      // Update user data
      const updatedUser = { ...userRecord, ...data };
      users[user.id] = updatedUser;
      saveUsers(users);
      
      // Remove password before storing in state
      const { password: _, ...userWithoutPassword } = updatedUser;
      
      // Update state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error) {
      console.error("Update profile error:", error);
      
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: error.message,
        });
      }
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
