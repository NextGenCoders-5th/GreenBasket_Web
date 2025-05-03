'use client';
import LoadingPage from "@/app/_components/Loading";
import { useCurrentUserQuery } from "@/redux/api/user.api";
import { setCredentials } from "@/redux/slices/auth.slice";
import { useAppSelector } from "@/redux/store";
import { skip } from "node:test";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const AuthProvider =   ({ children }: { children: React.ReactNode }) => {

  // Getting logged in user
  const user = useAppSelector(state => state.auth.user);

  // Getting disptacher instance

  const dispatch = useDispatch();

  // Getting current user data;
  const {data, isLoading} =  useCurrentUserQuery(undefined, {
    skip: !!user
  });
  useEffect(() => {
    if(data){
      console.log(data)
      dispatch(setCredentials({
        user: data.data.data
      }))
    }
    
  }
  , [data]);
  if(isLoading)
    return <LoadingPage />
  if(!user && !data)
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Please login to continue</h1>
      </div>
    );
  return (
    <>
      {children}
    </>
  );
};
export default AuthProvider;