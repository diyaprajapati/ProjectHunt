// Temporary mock implementation
export const login = async (email: string, password: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, always succeed
  return { success: true };
};

export const register = async (name: string, email: string, password: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, always succeed
  return { success: true };
};