// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { login, register } from "@/services/api";
// import { toast } from "sonner";
// import axios from 'axios';

// interface AuthDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSuccess?: (token: string) => void;
// }

// interface JwtPayload {
//   exp: number;
// }

// export function AuthDialog({ open, onOpenChange, onSuccess }: AuthDialogProps) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   function isTokenValid(token: string): boolean {
//     try {
//       const decoded = jwtDecode<JwtPayload>(token);
//       const currentTime = Math.floor(Date.now() / 1000);
//       return decoded.exp > currentTime;
//     }
//     catch (error) {
//       return false;
//     }
//   }

//   function logout() {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     toast.info("Logged out successfully.");
//   }


//   const apiClient = axios.create({
//     baseURL: "http://localhost:8080/api/auth",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   async function register(email: string, password: string) {
//     const response = await apiClient.post("/register", {
//       email,
//       password,
//     });
//     return response.data;
//   }

//   async function login(email: string, password: string) {
//     const response = await apiClient.post("/authenticate", {
//       email,
//       password,
//     });
//     return response.data;
//   }

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token && isTokenValid(token)) {
//       setIsLoggedIn(true);
//     } else {
//       localStorage.removeItem("token");
//       setIsLoggedIn(false);
//     }
//   }, []);

//   apiClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response && error.response.status === 401) {
//         logout(); // Call the logout function on token expiry
//       }
//       return Promise.reject(error);
//     }
//   );


//   // async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//   //   event.preventDefault();
//   //   setLoading(true);

//   //   const formData = new FormData(event.currentTarget);
//   //   const email = formData.get("email") as string;
//   //   const password = formData.get("password") as string;

//   //   try {
//   //     let response;
//   //     if (isLogin) {
//   //       response = await login(email, password);
//   //       localStorage.setItem('token', response.token);
//   //       toast.success("Welcome back!");
//   //       if (onSuccess) {
//   //         onSuccess(response.token);
//   //       }
//   //     } else {
//   //       response = await register(email, password);
//   //       toast.success("Account created successfully!");
//   //     }
//   //     onOpenChange(false);
//   //   } catch (error) {
//   //     toast.error(error.response?.data?.message || "Authentication failed. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // }
//   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     setLoading(true);

//     const formData = new FormData(event.currentTarget);
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;

//     try {
//       let response;
//       if (isLogin) {
//         response = await login(email, password);
//         if (response.token && isTokenValid(response.token)) {
//           localStorage.setItem("token", response.token);
//           setIsLoggedIn(true); // Update the state
//           toast.success("Welcome back!");
//           if (onSuccess) {
//             onSuccess(response.token);
//           }
//         } else {
//           throw new Error("Invalid token received.");
//         }
//       } else {
//         response = await register(email, password);
//         toast.success("Account created successfully!");
//       }
//       onOpenChange(false);
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Authentication failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-md border border-gray-800/50 rounded-3xl bg-[#1A1F2C]/95 backdrop-blur-xl shadow-2xl">
//         <DialogHeader>
//           <DialogTitle className="text-[2rem] font-bold text-white text-center tracking-tight">
//             {isLogin ? "Welcome Back" : "Create Account"}
//           </DialogTitle>
//         </DialogHeader>
//         <form onSubmit={onSubmit} className="space-y-5 py-4">
//           <div className="space-y-2">
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               required
//               className="h-12 bg-[#262B38] border-0 text-white text-lg placeholder:text-gray-400 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500/50"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="space-y-2">
//             <Input
//               id="password"
//               name="password"
//               type="password"
//               required
//               className="h-12 bg-[#262B38] border-0 text-white text-lg placeholder:text-gray-400 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500/50"
//               placeholder="Enter your password"
//             />
//           </div>
//           <Button
//             type="submit"
//             className="w-full h-12 bg-[#4F6EF7] hover:bg-[#4F6EF7]/90 text-white text-lg font-medium rounded-xl transition-all"
//             disabled={loading}
//           >
//             {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
//           </Button>
//         </form>
//         <div className="flex justify-center text-base">
//           <span className="text-gray-400">
//             {isLogin ? "Don't have an account? " : "Already have an account? "}
//           </span>
//           <button
//             type="button"
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-[#4F6EF7] hover:text-[#4F6EF7]/90 font-medium ml-1"
//           >
//             {isLogin ? "Sign Up" : "Sign In"}
//           </button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (token: string) => void;
}

interface JwtPayload {
  exp: number;
}

export function AuthDialog({ open, onOpenChange, onSuccess }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/auth",
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  }, []);

  function isTokenValid(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  async function register(email: string, password: string) {
    const response = await apiClient.post("/register", {
      email,
      password,
    });
    return response.data;
  }

  async function login(email: string, password: string) {
    const response = await apiClient.post("/authenticate", {
      email,
      password,
    });
    return response.data;
  }

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.info("Logged out successfully.");
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      let response;
      if (isLogin) {
        response = await login(email, password);
        if (response.token && isTokenValid(response.token)) {
          localStorage.setItem("token", response.token);
          setIsLoggedIn(true);
          toast.success("Welcome back!");
          if (onSuccess) {
            onSuccess(response.token);
          }
        } else {
          throw new Error("Invalid token received.");
        }
      } else {
        response = await register(email, password);
        toast.success("Account created successfully!");
      }
      onOpenChange(false);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border border-gray-800/50 rounded-3xl bg-[#1A1F2C]/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-[2rem] font-bold text-white text-center tracking-tight">
            {isLogin ? "Welcome Back" : "Create Account"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-5 py-4">
          <div className="space-y-2">
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="h-12 bg-[#262B38] border-0 text-white text-lg placeholder:text-gray-400 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500/50"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="h-12 bg-[#262B38] border-0 text-white text-lg placeholder:text-gray-400 rounded-xl focus-visible:ring-1 focus-visible:ring-blue-500/50"
              placeholder="Enter your password"
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 bg-[#4F6EF7] hover:bg-[#4F6EF7]/90 text-white text-lg font-medium rounded-xl transition-all"
            disabled={loading}
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>
        <div className="flex justify-center text-base">
          <span className="text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#4F6EF7] hover:text-[#4F6EF7]/90 font-medium ml-1"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
