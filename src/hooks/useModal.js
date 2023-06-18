import React from "react";
import { useSelector } from "react-redux";

export function useModal(startDirection, percentCoverage){
    const modalState = useSelector(state => state.modal)
    return modalState
}