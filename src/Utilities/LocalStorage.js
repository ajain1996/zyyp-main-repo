/* eslint-disable no-unused-vars */
//Local data handling
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const setBiometric = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const getBiometric = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};

const setUserInformation = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const setbiometricPassword = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const getbiometricPassword = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};
const getUserInformation = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};

const setPagestatus = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};

const getPagestatus = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};

//Expense Recent Search data -- Requestor
const setActiveProjectRecentSearch = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const getActiveProjectRecentSearch = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};
// ----------- Requestor Active Project Name Search
const setCloseProjectRecentSearch = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const getCloseProjectRecentSearch = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};
// ----------- Requestor Closed Project Name Search
const setActiveExpenseIdSearch = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const getActiveExpenseIdSearch = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};
// ----------- Requestor Active Expense ID Search
const setCloseExpenseIdSearch = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const getCloseExpenseIdSearch = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};
// ----------- Requestor Closed  Expense ID Search ---------------------------------------

//Expense Recent Search data -- Approver
const setApproverActiveProjectNameSearch = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const getApproverActiveProjectNameSearch = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};
//-------- Approver Active Project Name Recent Search
const setApproverCloseProjectNameSearch = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const getApproverCloseProjectNameSearch = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};
//-------- Approver Closed Project Name Recent Search
const setActiveApproverExpenseIdSearch = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const getActiveApproverExpenseIdSearch = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};
//-------- Approver Active Expense Id Recent Search
const setCloseApproverExpenseIdSearch = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const getCloseApproverExpenseIdSearch = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};
//-------- Approver Closed Expense Id Recent Search

const setActiveApproverEmployeeNameSearch = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const getActiveApproverEmployeeNameSearch = async (USER_KEY) => {
  await AsyncStorage.getItem(USER_KEY);
};
//-------- Approver Active Employees Name Recent Search

const setCloseApproverEmployeeNameSearch = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};
const getCloseApproverEmployeeNameSearch = async (USER_KEY) => {
  await AsyncStorage.getItem(USER_KEY);
};
//-------- Approver Closed  Employees Name Recent Search  ---------------------------------------

export {
  setBiometric,
  getBiometric,
  setUserInformation,
  getUserInformation,
  setPagestatus,
  getPagestatus,
  getbiometricPassword,
  setbiometricPassword,
  //Expense Recent search Local data Requester
  setActiveProjectRecentSearch,
  getActiveProjectRecentSearch,
  setCloseProjectRecentSearch,
  getCloseProjectRecentSearch,
  setActiveExpenseIdSearch,
  getActiveExpenseIdSearch,
  setCloseExpenseIdSearch,
  getCloseExpenseIdSearch,
  //Expense Recent search Local data Approver
  setApproverActiveProjectNameSearch,
  getApproverActiveProjectNameSearch,
  setApproverCloseProjectNameSearch,
  getApproverCloseProjectNameSearch,
  setActiveApproverExpenseIdSearch,
  getActiveApproverExpenseIdSearch,
  setCloseApproverExpenseIdSearch,
  getCloseApproverExpenseIdSearch,
  setActiveApproverEmployeeNameSearch,
  getActiveApproverEmployeeNameSearch,
  setCloseApproverEmployeeNameSearch,
  getCloseApproverEmployeeNameSearch
};
