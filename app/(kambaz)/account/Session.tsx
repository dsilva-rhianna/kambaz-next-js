import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
export default function Session({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (error) {
      dispatch(setCurrentUser(null));
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return children;
}

