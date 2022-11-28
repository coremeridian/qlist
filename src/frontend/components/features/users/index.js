import React from "react";
import { useAppSelector } from "@App/store";
import { selectFirstName, selectLastName } from "@features/users/userSlice";

export const useAppSelectFullName = () =>
    useAppSelector(selectFirstName) + " " + useAppSelector(selectLastName);
