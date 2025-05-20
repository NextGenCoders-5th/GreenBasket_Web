import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Props{
    register: any;
    name: string;
    placeholder?: string;
    className?: string;
    [x: string]: any;
}

const PasswordInput = ({ register, name, placeholder = "Enter your password",className, ...rest }:Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        {...register(name)}
        {...rest}
        type={showPassword ? 'text' : 'password'}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 pr-10 ${className}`}
        placeholder={placeholder}
      />
      <div
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </div>
    </div>
  );
};

export default PasswordInput;
