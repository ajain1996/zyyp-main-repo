import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  BackHandler,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native"; //Built-in
import { connect, useSelector } from "react-redux";
import { Searchbar } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view"; //External
import {
  AuthHeader,
  Button,
  ButtonText,
  SemiBoldText,
  SmallText,
  DeletePopup,
  InfoPopup,
  Error,
} from "../../components";
import {
  COLORS,
  FONTS,
  images,
  SIZES,
  strings,
  VECTOR,
  sampleArray,
  roles,
} from "../../constants";
import {
  getRequestList,
  getApproverList,
  isResponseisValid,
  updateExpenseStatus,
  //Expense Local data
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
  getCloseApproverEmployeeNameSearch,
  currencyFormat,
  digitFormat,
  spaceCamel,
  Loader,
} from "../../Utilities"; //Internal

//Main Function Component
const Expense = ({ navigation }) => {
  //Getting User Id from Login Reducer
  const userId = useSelector(
    (state) => state.LoginReducer?.SucessData?.result?.user_id
  );

  //Requester & Approver,Active Close Button States
  const [expenseToggle, setExpenseToggle] = useState(true);
  const [activeClick, setActiveClick] = useState("active");
  //Summary List & Status
  const [summaryData, setSummaryData] = useState([]);
  const [summaryAllData, setSummaryAllData] = useState();
  const [summaryListData, setSummaryListData] = useState();
  //Toast Handling
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [loader, setIsloading] = useState(false);
  //Swipe Delete Handling & Info Popup
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  //Approver Swipe
  const [showInfo, setShowInfo] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("");
  const [approverComments, setApproverComments] = useState("");
  const [approverSwipeType, setApproverSwipeType] = useState("");
  const [approverItem, setApproverItem] = useState();

  //Select Popup
  const [selectPopup, setSelectPopup] = useState(false);
  const [filterType, setFilterType] = useState(); //both
  const [filterTitle, setFilterTitle] = useState(); //both
  const [categories, setCategories] = useState([]); //Filter List Values (Categories, Status , Departments)
  const [statusData, setStatusData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [searchData, setSearchData] = useState([]);
  //Search & SelectFilter
  const [searchListPopup, setSearchListPopup] = useState(false);
  const [data, setData] = useState([]);

  //Select Filter Handling State
  const [filterData, setFilterData] = useState([]);
  const [selectData, setSelectData] = useState([]);

  const [isSubmitFilter, setIsSubmit] = useState(false);

  const [projectList, setProjectList] = useState();
  const [expenseIdList, setExpenseId] = useState();
  const [employeesList, setEmployees] = useState();

  //Selected And search Items
  const [categoriesItem, setCategoriesItem] = useState([]);
  const [statusItems, setStatusItems] = useState([]);
  const [departmentItems, setDepartmentItems] = useState([]);
  const [projectNameItems, setProjectNameItems] = useState([]);
  const [expenseIdItems, setExpenseItems] = useState([]);
  const [employeesItems, setEmployeeItems] = useState([]);

  //Count
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [statusCount, setStatusCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [projectNameCount, setProjectNameCount] = useState(0);
  const [expenseIdCount, setExpenseIdCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);

  //Getting Requestor List & Device Back Handling
  useEffect(() => {
    setIsloading(true);
    getRequestorListApiCall();
    disableBackHandler();
  }, []);

  //Disable Android Device Back handling
  const disableBackHandler = () => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  };

  //Instant Data Update Method
  useEffect(() => {}, [searchData, approverItem]);
  //search,Select filter
  useEffect(() => {}, [filterData]);

  //Requestor to Approver Summary Layout Switch Button click event
  const expenseToggleClick = (value) => {
    // clearFilterHeader();
    setExpenseToggle(!expenseToggle);
    setActiveClick("active");
    setIsloading(true);
    if (value === 1) {
      getRequestorListApiCall();
    } else {
      getApproverListApiCall();
    }
    clearFilterHeader();
  };

  //Requestor List API call
  const getRequestorListApiCall = async () => {
    try {
      const requesterApiResponse = await getRequestList(userId);
      if (isResponseisValid(requesterApiResponse)) {
        isLoaderHide();
        setSummaryData(requesterApiResponse.data.result.summary);
        filterActiveData(
          requesterApiResponse.data.result.expense_request_detail
        );
      } else {
        isLoaderHide();
      }
    } catch (e) {
      isLoaderHide();
      toHandleToast(strings.apierror, 0);
    }
  };
  //Approver List API call
  const getApproverListApiCall = async () => {
    try {
      const approverApiResponse = await getApproverList(userId);
      if (isResponseisValid(approverApiResponse)) {
        isLoaderHide();
        setSummaryData(approverApiResponse.data.result.summary);
        filterActiveData(
          approverApiResponse.data.result.expense_request_detail
        );
      } else {
        isLoaderHide();
      }
    } catch (e) {
      isLoaderHide();
      toHandleToast(strings.apierror, 0);
    }
  };
  //Loader Stop
  const isLoaderHide = () => {
    setIsloading(false);
  };

  const onNavigateRequestForm = () => {
    navigation.navigate("ExpenseRequest", {
      isPaymentEnable: false,
      isEditable: false,
    });
  };

  const navigateRequesterExpenseDetails = () => {
    navigation.navigate("ExpenseDetails", {
      transactionType: 1,
      approver: !expenseToggle,
    });
  };
  const navigateApproverExpenseDetails = () => {
    navigation.navigate("ExpenseDetails", {
      transactionType: 1,
      approver: !expenseToggle,
    });
  };
  const navigateApproverExpenseMoreDetails = () => {
    navigation.navigate("ExpenseDetails", {
      transactionType: 2,
      approver: expenseToggle,
    });
  };

  const onActiveButtonClick = () => {
    clearFilterHeader();
    setActiveClick("active");
    filterActiveData(summaryAllData);
  };

  const onCloseButtonClick = () => {
    clearFilterHeader();
    setActiveClick("close");
    filterCloseData(summaryAllData);
  };
  const clearFilterHeader = () => {
    setSelectData([]);
    setFilterData([]);

    setCategoriesItem([]);
    setStatusItems([]);
    setDepartmentItems([]);
    setProjectNameItems([]);
    setExpenseItems([]);
    setEmployeeItems([]);

    setCategoriesCount(0);
    setStatusCount(0);
    setProjectNameCount(0);
    setExpenseIdCount(0);
    setDepartmentCount(0);
    setEmployeeCount(0);
  };
  //Active Data Filter function
  const filterActiveData = (data) => {
    let activeData = data?.filter(
      (data) =>
        data.status !== roles.REJECTED && data.status !== roles.RECEIPT_ACCEPTED
    );
    setSummaryAllData(data);
    setSummaryListData(activeData);
    filterListData(activeData);
  };
  //Closed Data Filter function
  const filterCloseData = (data) => {
    let closeData = data?.filter(
      (data) =>
        data.status === roles.REJECTED || data.status === roles.RECEIPT_ACCEPTED
    );
    setSummaryAllData(data);
    setSummaryListData(closeData);
    filterListData(closeData);
  };
  //Requester Swipe Delete Click Action (only Delete)
  const onSwipeDelete = (item) => {
    setDeleteItem(item);
    setDeleteShow(true);
  };
  //Swipe Rquester Delete Api call
  const conformDelete = () => {
    setDeleteShow(false);
    updateApproverStatusApiCall(roles.DELETE, deleteItem);
  };
  //if User click Cancel on delete Popup
  const onDeleteCancel = () => {
    setDeleteShow(false);
  };
  //Approver Swipe Actions (Reject, Ask Info ,Approve)
  const approverSwipeClick = (item, type) => {
    setApproverItem(item);
    setApproverSwipeType(type);
    setShowInfo(true);
    setApproverComments("");
    if (type === 0) {
      setButtonTitle(strings.buttonReject);
    } else if (type == 1) {
      setButtonTitle(strings.buttonAskInfo);
    } else if (type == 2) {
      setButtonTitle(strings.buttonApprove);
    }
  };
  //Approve,Reject Api call
  const approverSwipeSubmit = () => {
    if (approverSwipeType == 0) {
      updateApproverStatusApiCall(roles.REJECT, approverItem);
    } else if (approverSwipeType == 1) {
      //Ask Info - Comments Must other optional
      commentsValidation();
    } else if (approverSwipeType == 2) {
      updateApproverStatusApiCall(roles.APPROVE, approverItem);
    }
  };
  //Need Info Api call
  const commentsValidation = () => {
    if (approverComments.length === 0) {
      alert(strings.infoValidation);
    } else {
      updateApproverStatusApiCall(roles.ASK_INFO, approverItem);
    }
  };
  //Delete ,Approve ,Reject ,Need info final API call
  const updateApproverStatusApiCall = async (actionValue, item) => {
    setShowInfo(false);
    setIsloading(true);
    const body = {
      action: actionValue,
      actor_id: userId,
      note: approverComments,
      expense_request: {
        expenseId: item.ExpenseId,
      },
    };
    try {
      const updateStatusResponse = await updateExpenseStatus(body);
      if (isResponseisValid(updateStatusResponse)) {
        isLoaderHide();
        updateSummaryList(actionValue);
        toHandleToast(updateStatusResponse.data.result, 3);
      } else {
        toHandleToast(updateStatusResponse.data, 0);
        isLoaderHide();
      }
    } catch (e) {
      isLoaderHide();
      toHandleToast(strings.apierror, 0);
    }
  };
  //List Update after approve ,reject ,info & delete
  const updateSummaryList = (actionValue) => {
    if (actionValue === "DELETE") {
      getRequestorListApiCall();
    } else {
      getApproverListApiCall();
    }
  };
  //Success & Failure message Handling
  const toHandleToast = (message, type) => {
    setShowToast(true);
    setToastMessage(message);
    setToastType(type);
  };

  const filterListData = (list) => {
    getCategoriesList(list);
    getStatusList(list);
    getDepartmentList(list);
    getProjectList(list);
    getExpenseId(list);
    getEmployeesName(list);
  };
  //getCategoriesList List Remove Unique Categories (Both Requestor/ Approver)
  const getCategoriesList = (data) => {
    const removeUnique = data?.filter(
      (categories, index, array) =>
        index ===
        array.findIndex(
          (c) => c.spend_category_name === categories.spend_category_name
        )
    );
    const selectedData = removeUnique?.map((file, index) => {
      return {
        ...file,
        isCategoriesSelected: false,
        isStatusSelected: false,
        isDepartmentSelected: false,
      };
    });
    setCategories(selectedData);
  };
  //getStatusList Remove Unique Status (Both Requestor/ Approver)
  const getStatusList = (data) => {
    const removeUnique = data?.filter(
      (statuses, index, array) =>
        index === array.findIndex((s) => s.status === statuses.status)
    );
    const selectedData = removeUnique?.map((file, index) => {
      return {
        ...file,
        isCategoriesSelected: false,
        isStatusSelected: false,
        isDepartmentSelected: false,
      };
    });
    setStatusData(selectedData);
  };
  //Get Department List Remove Unique Department (Only Approver)
  const getDepartmentList = (data) => {
    const removeUnique = data?.filter(
      (departments, index, array) =>
        index ===
        array.findIndex(
          (d) => d.department_name === departments.department_name
        )
    );
    const selectedData = removeUnique?.map((file, index) => {
      return {
        ...file,
        isCategoriesSelected: false,
        isStatusSelected: false,
        isDepartmentSelected: false,
      };
    });
    setDepartmentData(selectedData);
  };
  //Get Project Name List and Remove Unique Project Name (Both Approver /Requestor)
  const getProjectList = (data) => {
    const removeUnique = data?.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.project_name === item.project_name)
    );
    const selectedData = removeUnique?.map((file, index) => {
      return { ...file, isProjectSelected: false };
    });
    setProjectList(selectedData);
  };
  //Get Expense List and Remove Unique Expense Id values (Both Approver /Requestor)
  const getExpenseId = (data) => {
    const removeUnique = data?.filter(
      (item, index, self) =>
        index === self.findIndex((value) => value.ExpenseId === item.ExpenseId)
    );
    const selectedData = removeUnique?.map((file, index) => {
      return { ...file, isExpenseSelected: false };
    });
    setExpenseId(selectedData);
  };
  //Get Employee Name List and Remove Unique Employee Name (Only Approver)
  const getEmployeesName = (data) => {
    const removeUnique = data?.filter(
      (item, index, self) =>
        index ===
        self.findIndex((value) => value.requester_name === item.requester_name)
    );
    const selectedData = removeUnique?.map((file, index) => {
      return { ...file, isEmployees: false };
    });
    setEmployees(selectedData);
  };

  //Show Search Filter UI For (Categories,Status,Department)
  const selectFilterClick = (value, type) => {
    selectedData(type);
    setFilterTitle(value);
    setFilterType(type);
    setSelectPopup(true);
  };

  //Select Filter UI (Project Name ,ExpenseId,EmployeesName)
  const searchFilterClick = (value, type) => {
    setShowSearchPopup(true);
    setFilterTitle(value);
    setFilterType(type);
    setShowSearchPopup(true);

    setData(
      filterType === 3 || filterType === 5
        ? projectList
        : filterType === 4 || filterType === 6
        ? expenseIdList
        : filterType === 7
        ? employeesList
        : ""
    );
    recentValuesUpdate(type);
  };
  const recentDataHandling = (response) => {
    console.log("Get Recente Data Respons e:", response);
    const restoredArray = JSON.parse(response);
    setSearchData(restoredArray);
  };
  //Search Filter Need to show Last 5 search Values
  const recentValuesUpdate = (type) => {
    //3,4 ---Requestor
    //5,6,7 --Approver
    if (type === 3 && activeClick === "active") {
      getActiveProjectRecentSearch("requesterActiveProjectName").then(
        (response) => {
          recentDataHandling(response);
        }
      );
    } else if (type === 3 && activeClick === "close") {
      getCloseProjectRecentSearch("requesterCloseProjectName").then(
        (response) => {
          recentDataHandling(response);
        }
      );
    } else if (type === 4 && activeClick == "active") {
      getActiveExpenseIdSearch("requesterActiveExpenseId").then((response) => {
        recentDataHandling(response);
      });
    } else if (type === 4 && activeClick === "close") {
      getCloseExpenseIdSearch("requesterCloseExpenseId").then((response) => {
        recentDataHandling(response);
      });
    }

    if (type === 5 && activeClick === "active") {
      getApproverActiveProjectNameSearch("ApproverActiveProjectName").then(
        (response) => {
          recentDataHandling(response);
        }
      );
    } else if (type === 5 && activeClick == "close") {
      getApproverCloseProjectNameSearch("ApproverCloseProjectName").then(
        (response) => {
          recentDataHandling(response);
        }
      );
    } else if (type === 6 && activeClick == "active") {
      getActiveApproverExpenseIdSearch("ApproverActiveExpense").then(
        (response) => {
          recentDataHandling(response);
        }
      );
    } else if (type === 6 && activeClick == "close") {
      getCloseApproverExpenseIdSearch("ApproverCloseExpense").then(
        (response) => {
          recentDataHandling(response);
        }
      );
    } else if (type === 7 && activeClick == "active") {
      getActiveApproverEmployeeNameSearch("ApproverActiveEmployee").then(
        (response) => {
          recentDataHandling(response);
        }
      );
    } else if (type === 7 && activeClick == "close") {
      getCloseApproverEmployeeNameSearch("ApproverCloseExpense").then(
        (response) => {
          recentDataHandling(response);
        }
      );
    }
  };

  const searchResetClick = () => {
    setIsSubmit(true);
    resetSearchData();
    //Clear Local Storage Values
    searchRecentDataHandling("");
    setSearchData("");
  };
  const resetSearchData = () => {
    console.log("searchResetClick", filterType);
    if (filterType == 3 || filterType == 5) {
      setProjectNameItems([]);
      setProjectNameCount(0);
    } else if (filterType == 6 || filterType == 4) {
      setExpenseItems([]);
      setExpenseIdCount(0);
    } else if (filterType == 7) {
      setEmployeeItems([]);
      setEmployeeCount(0);
    }
  };
  const searchRecentDataHandling = (data) => {
    if (filterType === 3 && activeClick === "active") {
      setActiveProjectRecentSearch(
        "requesterActiveProjectName",
        JSON.stringify(data.slice(-5))
      );
    } else if (filterType === 3 && activeClick === "close") {
      setCloseProjectRecentSearch(
        "requesterCloseProjectName",
        JSON.stringify(data.slice(-5))
      );
    } else if (filterType === 4 && activeClick == "active") {
      setActiveExpenseIdSearch(
        "requesterActiveExpenseId",
        JSON.stringify(data.slice(-5))
      );
    } else if (filterType === 4 && activeClick === "close") {
      setCloseExpenseIdSearch(
        "requesterCloseExpenseId",
        JSON.stringify(data.slice(-5))
      );
    }

    if (filterType === 5 && activeClick === "active") {
      setApproverActiveProjectNameSearch(
        "ApproverActiveProjectName",
        JSON.stringify(data.slice(-5))
      );
    } else if (filterType === 5 && activeClick == "close") {
      setApproverCloseProjectNameSearch(
        "ApproverCloseProjectName",
        JSON.stringify(data.slice(-5))
      );
    } else if (filterType === 6 && activeClick == "active") {
      setActiveApproverExpenseIdSearch(
        "ApproverActiveExpense",
        JSON.stringify(data.slice(-5))
      );
    } else if (filterType === 6 && activeClick == "close") {
      setCloseApproverExpenseIdSearch(
        "ApproverCloseExpense",
        JSON.stringify(data.slice(-5))
      );
    } else if (filterType === 7 && activeClick == "active") {
      setActiveApproverEmployeeNameSearch(
        "ApproverActiveEmployee",
        JSON.stringify(data.slice(-5))
      );
    } else if (filterType === 7 && activeClick == "close") {
      setCloseApproverEmployeeNameSearch(
        "ApproverCloseExpense",
        JSON.stringify(data.slice(-5))
      );
    }
  };

  const selectedData = (type) => {
    console.log("Filter Data  **** 0:", filterData);
    if (type === 0) {
      const update = categories.filter((data, index) =>
        filterData.map((value) =>
          data.spend_category_name === value.spend_category_name
            ? ((data.isCategoriesSelected = value.isCategoriesSelected),
              (data.isStatusSelected = value.isStatusSelected),
              (data.isDepartmentSelected = value.isDepartmentSelected))
            : null
        )
      );
      console.log("Filter Data  **** 1:", update);
      setFilterData(update);
    } else if (type === 1) {
      const update = statusData.filter((data, index) =>
        filterData.map((value) =>
          data.status === value.status
            ? ((data.isCategoriesSelected = value.isCategoriesSelected),
              (data.isStatusSelected = value.isStatusSelected),
              (data.isDepartmentSelected = value.isDepartmentSelected))
            : null
        )
      );
      console.log("Filter Data  **** 2:", update);

      setFilterData(update);
    } else if (type === 2) {
      const update = departmentData.filter((data, index) =>
        filterData.map((value) =>
          data.department_name === value.department_name
            ? ((data.isCategoriesSelected = value.isCategoriesSelected),
              (data.isStatusSelected = value.isStatusSelected),
              (data.isDepartmentSelected = value.isDepartmentSelected))
            : null
        )
      );
      console.log("Filter Data  **** 2:", update);
      setFilterData(update);
    }
  };

  //Multi Search Filter
  const searchItemPress = (item, index) => {
    if (filterType == 3 || filterType == 5) {
      const selectData = searchData?.map((data, index) => {
        return {
          ...data,
          isProjectSelected:
            data.project_name == item.project_name
              ? !data.isProjectSelected
              : data.isProjectSelected,
        };
      });
      setSearchData(selectData);
      console.log("selected Data :", filterData);
      const filterValue = selectData?.filter(
        (categories) => categories.isProjectSelected == true
      );
      const op = filterValue.map(
        (filterCategories) => filterCategories.project_name
      );

      setProjectNameItems(op);
    } else if (filterType == 4 || filterType == 6) {
      const selectData = searchData?.map((data, index) => {
        return {
          ...data,
          isExpenseSelected:
            data.ExpenseId == item.ExpenseId
              ? !data.isExpenseSelected
              : data.isExpenseSelected,
        };
      });
      setSearchData(selectData);
      const filterValue = selectData?.filter(
        (categories) => categories.isExpenseSelected == true
      );
      const op = filterValue.map(
        (filterCategories) => filterCategories.ExpenseId
      );
      setExpenseItems(op);
    } else if (filterType === 7) {
      const selectData = searchData?.map((data, index) => {
        return {
          ...data,
          isEmployeesSelected:
            data.requester_name == item.requester_name
              ? !data.isEmployeesSelected
              : data.isEmployeesSelected,
        };
      });
      setSearchData(selectData);
      const filterValue = selectData?.filter(
        (categories) => categories.isEmployeesSelected == true
      );
      const op = filterValue.map(
        (filterCategories) => filterCategories.requester_name
      );
      setEmployeeItems(op);
    }
  };

  //Multi select on Select Filter
  const selectItemPress = (item, index) => {
    if (filterType === 0) {
      const selectData = filterData?.map((data, index) => {
        return {
          ...data,
          isCategoriesSelected:
            data.spend_category_name == item.spend_category_name
              ? !data.isCategoriesSelected
              : data.isCategoriesSelected,
        };
      });
      setFilterData(selectData);
      const filterValue = selectData?.filter(
        (categories) => categories.isCategoriesSelected == true
      );
      const op = filterValue.map(
        (filterCategories) => filterCategories.spend_category_name
      );
      setCategoriesItem(op);
    } else if (filterType === 1) {
      const selectData = filterData?.map((data, index) => {
        return {
          ...data,
          isStatusSelected:
            data.status == item.status
              ? !data.isStatusSelected
              : data.isStatusSelected,
        };
      });
      setFilterData(selectData);
      console.log("selected Data :", filterData);
      const filterValue = selectData?.filter(
        (categories) => categories.isStatusSelected == true
      );
      const op = filterValue.map((filterCategories) => filterCategories.status);
      setStatusItems(op);
    } else if (filterType == 2) {
      const selectData = filterData?.map((data, index) => {
        return {
          ...data,
          isDepartmentSelected:
            data.department_name == item.department_name
              ? !data.isDepartmentSelected
              : data.isDepartmentSelected,
        };
      });
      setFilterData(selectData);
      console.log("selected Data :", filterData);
      const filterValue = selectData?.filter(
        (categories) => categories.isDepartmentSelected == true
      );
      const op = filterValue.map(
        (filterCategories) => filterCategories.department_name
      );
      setDepartmentItems(op);
    }
  };
  const submitSelectFilter = () => {
    setIsSubmit(false);
    const op = summaryListData.filter(
      (data) =>
        categoriesItem.includes(data.spend_category_name) ||
        statusItems.includes(data.status) ||
        departmentItems.includes(data.department_name) ||
        projectNameItems.includes(data.project_name) ||
        expenseIdItems.includes(data.ExpenseId) ||
        employeesItems.includes(data.requester_name)
    );
    filterResultList(op);
    if (filterType === 0) {
      setCategoriesCount(categoriesItem?.length);
    } else if (filterType == 1) {
      setStatusCount(statusItems.length);
    } else if (filterType == 2) {
      setDepartmentCount(departmentItems.length);
    }
    if (filterType == 3 || filterType == 5) {
      setProjectNameCount(projectNameItems.length);
    } else if (filterType == 4 || filterType == 6) {
      setExpenseIdCount(expenseIdItems.length);
    } else if (filterType == 7) {
      setEmployeeCount(employeesItems.length);
    }

    searchRecentDataHandling(searchData);
  };
  const filterResultList = (result) => {
    if (result.length) {
      setSelectData(result);
      setSelectPopup(false);
      setShowSearchPopup(false);
    } else {
      setSelectData([]);
      setSelectPopup(false);
      setShowSearchPopup(false);
      // toHandleToast(`No ${filterTitle} Found `, 0);
    }
  };
  const onResetClick = () => {
    setIsSubmit(true);
    console.log("Reset FilterData ", filterData);
    if (filterType == 0 || filterType == 3) {
      const resetData = filterData?.map((file, index) => {
        return { ...file, isCategoriesSelected: false };
      });
      setCategoriesCount("");
      setCategoriesItem([]);
      setFilterData(resetData);
    } else if (filterType == 1 || filterType == 4) {
      const resetData = filterData?.map((file, index) => {
        return { ...file, isStatusSelected: false };
      });
      setStatusCount("");
      setStatusItems([]);
      setFilterData(resetData);
    } else if (filterType == 2) {
      const resetData = filterData?.map((file, index) => {
        return { ...file, isDepartmentSelected: false };
      });
      setDepartmentCount("");
      setDepartmentItems([]);
      setFilterData(resetData);
    }

    searchRecentDataHandling(searchData);
  };

  const onSearchClick = (type) => {
    setData(
      filterType === 3 || filterType === 5
        ? projectList
        : filterType === 4 || filterType === 6
        ? expenseIdList
        : filterType === 7
        ? employeesList
        : ""
    );
    setShowSearchPopup(false);
    setSearchListPopup(true);
  };

  const searchListItem = (text) => {
    const filterData =
      filterType == 3 || filterType == 5
        ? projectList
        : filterType == 4 || filterType == 6
        ? expenseIdList
        : filterType == 7
        ? employeesList
        : null;
    const newData = filterData?.filter((item) => {
      const itemData =
        filterType === 3 || filterType == 5
          ? item.project_name.toUpperCase()
          : filterType == 4 || filterType == 6
          ? item.ExpenseId.toUpperCase()
          : filterType == 7
          ? item.requester_name.toUpperCase()
          : "";
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
  };
  const onDataClick = (item) => {
    if (filterType == 3 || filterType == 5) {
      const selectData = data?.map((projectItem, index) => {
        return {
          ...projectItem,
          isProjectSelected:
            projectItem.project_name == item.project_name
              ? !data.isProjectSelected
              : data.isProjectSelected,
        };
      });
      const filter = selectData?.filter(
        (value, index) => value.isProjectSelected == true
      );
      setSearchData(searchData ? [...searchData, ...filter] : filter);
      const duplicate = searchData ? [...searchData, ...filter] : filter;
      if (
        duplicate != null &&
        duplicate.length != 0 &&
        duplicate != undefined
      ) {
        const removeUnique = duplicate?.filter(
          (item, index, list) =>
            index ===
            list.findIndex((t) => t.project_name === item.project_name)
        );

        setSearchData(removeUnique);

        const filterValue = removeUnique?.filter(
          (projectNameFilter) => projectNameFilter.isProjectSelected == true
        );
        const op = filterValue.map(
          (filterProjectName) => filterProjectName.project_name
        );
        setProjectNameItems(op);
      }
    } else if (filterType == 4 || filterType == 6) {
      const selectData = data?.map((data, index) => {
        return {
          ...data,
          isExpenseSelected:
            data.ExpenseId == item.ExpenseId
              ? !data.isExpenseSelected
              : data.isExpenseSelected,
        };
      });
      const filter = selectData?.filter(
        (data, index) => data.isExpenseSelected == true
      );
      console.log("Unique seacrh data", searchData.length < 5);
      setSearchData(searchData ? [...searchData, ...filter] : filter);
      const duplicate = searchData ? [...searchData, ...filter] : filter;
      if (
        duplicate != null &&
        duplicate.length != 0 &&
        duplicate != undefined
      ) {
        const removeUnique = duplicate?.filter(
          (item, index, list) =>
            index === list.findIndex((t) => t.ExpenseId === item.ExpenseId)
        );

        console.log("removeUnique", removeUnique.length);
        if (removeUnique.length > 0 && removeUnique.length < 5) {
          console.log("5 data ****", removeUnique.length);
        } else {
          console.log(" no 5 data ****", removeUnique.shift);
        }
        setSearchData(removeUnique);

        const filterValue = removeUnique?.filter(
          (expenseId) => expenseId.isExpenseSelected == true
        );
        const op = filterValue.map(
          (filterExpenseID) => filterExpenseID.ExpenseId
        );
        setExpenseItems(op);
      }
    } else if (filterType == 7) {
      const selectData = data?.map((data, index) => {
        return {
          ...data,
          isEmployeesSelected:
            data.requester_name == item.requester_name
              ? !data.isEmployeesSelected
              : data.isEmployeesSelected,
        };
      });
      const filter = selectData?.filter(
        (data, index) => data.isEmployeesSelected == true
      );
      setSearchData(searchData ? [...searchData, ...filter] : filter);
      const duplicate = searchData ? [...searchData, ...filter] : filter;
      if (
        duplicate != null &&
        duplicate.length != 0 &&
        duplicate != undefined
      ) {
        const removeUnique = duplicate?.filter(
          (item, index, list) =>
            index ===
            list.findIndex((t) => t.requester_name === item.requester_name)
        );
        console.log("removeUnique", removeUnique);
        setSearchData(removeUnique);
        const filterValue = removeUnique?.filter(
          (employeeName) => employeeName.isEmployeesSelected == true
        );
        const op = filterValue.map(
          (filterEmployee) => filterEmployee.requester_name
        );
        setEmployeeItems(op);
      }
    }

    setSearchListPopup(false);
    setShowSearchPopup(true);
  };
  const headerClose = () => {
    setSearchListPopup(false);
    // setShowSearchPopup(true);
  };
  //Requestor Delete Disable Button Component
  const SwipeDeleteDisableCard = () => {
    return (
      <View style={styles.notAbletoDeleteCard}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: SIZES.base,
          }}
        >
          {VECTOR.DeleteDisable}
          <Text style={{ ...FONTS.t3, color: "#AABBC6" }}>
            {strings.buttonDelete}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const SwipeApproverDeleteCard = () => {
    return (
      <View
        style={{
          backgroundColor: COLORS.white,
          marginHorizontal: SIZES.base * 2,
          borderRadius: SIZES.radius / 3,
          flex: 1,
          marginTop: SIZES.base * 2,
          flexDirection: "row",
          justifyContent: "flex-end",
          backgroundColor: '#E7EAEE',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.1}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginRight: SIZES.base * 3,
            // backgroundColor:COLORS.secondary1,
          }}
        >
          <Image source={images.swipeClose} />
          <Text style={{ ...FONTS.t3, color: "#AABBC6" }}>
            {strings.buttonReject}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "#FFE9DB",
            width: 80,
          }}
          activeOpacity={0.7}
        >
          <Image source={images.swipeInfo} />

          <Text style={{ ...FONTS.t3, color: "#AABBC6" }}>
            {strings.buttonAskInfo}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "#CBF1D9",
            borderTopEndRadius: SIZES.radius / 3,
            borderBottomRightRadius: SIZES.radius / 3,
            width: 80,
          }}
        >
          <Image source={images.swipeApprove} />
          <Text style={{ ...FONTS.t3, color: "#AABBC6" }}>
            {strings.buttonApprove}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  //Requestor /Approver Button
  const ExpenseButton = ({
    onClick,
    dotColor,
    buttonColor,
    buttonText,
    textColor,
    type,
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onClick}
        style={[styles.switchButtonContainer, { backgroundColor: buttonColor }]}
      >
        {type === 1 ? (
          <View style={styles.switchElementView}>
            <Text
              numberOfLines={1}
              style={[styles.switchText, { color: textColor }]}
            >
              {buttonText}
            </Text>
            <View
              style={[styles.switchDotView, { backgroundColor: dotColor }]}
            />
          </View>
        ) : (
          <View style={styles.switchElementView}>
            <View
              style={[styles.switchDotView, { backgroundColor: dotColor }]}
            />
            <Text
              numberOfLines={1}
              style={[styles.switchText, { color: textColor }]}
            >
              {buttonText}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.componentView}>
        <DeletePopup
          visible={deleteShow}
          btnTitle={strings.buttonDelete}
          onCancelClick={onDeleteCancel}
          onChangeDelete={conformDelete}
        />
        <InfoPopup
          title={"Add comment"}
          desc={""}
          visible={showInfo}
          btnTitle={buttonTitle}
          onChangeDelete={() => setShowInfo(false)}
          onChangeOk={() => approverSwipeSubmit()}
          onChangeText={(text) => setApproverComments(text)}
        />
        <Error
          dissMiss={() => setShowToast(false)}
          visible={showToast}
          tittle={toastMessage}
          type={toastType}
        />
        <Loader loading={loader} />
        <Modal visible={searchListPopup} transparent>
          <SafeAreaView
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                // flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.12)",
              }}
            />

            <View style={{ flex: 1, backgroundColor: COLORS.secondary1 }}>
              <AuthHeader
                tittle={`Search ${filterTitle}`}
                left_icon={images.back}
                title_color={COLORS.secondary2}
                nav={navigation}
                backPress={() => headerClose()}
              />
              <View style={{ margin: SIZES.padding * 2 }}>
                <Searchbar
                  style={{
                    borderWidth: 1,
                    borderColor: COLORS.pl,
                    borderRadius: SIZES.radius / 3,
                  }}
                  autoFocus={true}
                  onChangeText={(text) => {
                    searchListItem(text);
                  }}
                  placeholder={`Search ${filterTitle}`}
                />
                <FlatList
                  data={data}
                  keyExtractor={(index) => index.toString()}
                  renderItem={(item, index) => {
                    return (
                      <TouchableOpacity
                        key={item}
                        onPress={() => onDataClick(item.item)}
                        style={{
                          backgroundColor: item.item.isProjectSelected
                            ? COLORS.primary
                            : COLORS.white,
                          marginVertical: SIZES.base,
                          padding: SIZES.padding2,
                          borderRadius: SIZES.radius / 4,
                        }}
                      >
                        <SmallText
                          text={
                            filterType === 3 || filterType === 5
                              ? item.item.project_name
                              : filterType == 4 || filterType === 6
                              ? item.item.ExpenseId
                              : item.item.requester_name
                          }
                          color={COLORS.secondary2}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
        {/* Search View */}
        <Modal visible={showSearchPopup} transparent>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0, 0, 0, 0.12)",
            }}
          >
            <View
              style={{
                backgroundColor: "#FBFBFB",
                padding: SIZES.padding2 * 2,
                borderTopRightRadius: SIZES.radius / 1.5,
                borderTopLeftRadius: SIZES.radius / 1.5,
              }}
            >
              <FilterHeader
                title={filterTitle}
                subheader={"Reset"}
                resetPress={() => searchResetClick()}
              />

              <Searchbar
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.pl,
                  borderRadius: SIZES.radius / 3,
                }}
                onFocus={() => onSearchClick(filterType)}
                placeholder={`Search by ${filterTitle}`}
              />

              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.secondary2,
                  paddingVertical: SIZES.base * 3,
                }}
              >
                {`Recently searched ${filterTitle}`}
              </Text>
              <View
                style={{
                  paddingBottom: SIZES.padding2 * 2,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {searchData?.length === 0 ? (
                  <Text
                    style={{
                      ...FONTS.e1,
                      color: COLORS.secondary,
                      paddingVertical: SIZES.base,
                      marginLeft: SIZES.width / 3,
                    }}
                  >
                    No Recent Search found{" "}
                  </Text>
                ) : (
                  searchData?.map((item, index) => {
                    return (
                      <SelectComponent
                        key={index}
                        text={
                          filterType == 3 || filterType == 5
                            ? item?.project_name
                            : filterType == 4 || filterType == 6
                            ? item?.ExpenseId
                            : filterType == 7
                            ? item.requester_name
                            : null
                        }
                        selectPress={() => searchItemPress(item, index)}
                        isSelected={
                          filterType == 3 || filterType == 5
                            ? item?.isProjectSelected
                            : filterType == 4 || filterType == 6
                            ? item?.isExpenseSelected
                            : item?.isEmployeesSelected
                        }
                      />
                    );
                  })
                )}
              </View>
              <FilterFooter
                closePress={() => {
                  isSubmitFilter ? submitSelectFilter() : null;
                  setShowSearchPopup(false);
                }}
                selectPress={() => submitSelectFilter()}
              />
            </View>
          </View>
        </Modal>
        {/* Select View */}
        <Modal visible={selectPopup} transparent>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0, 0, 0, 0.12)",
            }}
          >
            <View
              style={{
                backgroundColor: "#FBFBFB",
                padding: SIZES.padding2 * 2,
                borderTopRightRadius: SIZES.radius / 1.5,
                borderTopLeftRadius: SIZES.radius / 1.5,
              }}
            >
              <FilterHeader
                title={filterTitle}
                subheader={"Reset"}
                resetPress={() => onResetClick()}
              />

              <View
                style={{
                  paddingBottom: SIZES.padding2 * 2,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {filterData.length === 0 ? (
                  <Text
                    style={{
                      ...FONTS.e1,
                      color: COLORS.secondary,
                      paddingVertical: SIZES.base,
                      marginLeft: SIZES.width / 3,
                    }}
                  >
                    {`No ${filterTitle}  found`}
                  </Text>
                ) : (
                  filterData.map((item, index) => {
                    console.log(
                      "pop ",
                      item.status.toLowerCase().replace("_", " ")
                    );

                    return (
                      <SelectComponent
                        key={item?.key}
                        isSelected={
                          filterType === 0 || filterType === 3
                            ? item?.isCategoriesSelected
                            : filterType === 1 || filterType === 4
                            ? item?.isStatusSelected
                            : filterType === 2
                            ? item?.isDepartmentSelected
                            : null
                        }
                        text={
                          filterType == 0 || filterType === 3
                            ? item?.spend_category_name
                            : filterType === 1 || filterType === 4
                            ? item?.status.toLowerCase().replace("_", " ")
                            : filterType === 2
                            ? item?.department_name
                            : null
                        }
                        selectPress={() => selectItemPress(item, index)}
                      />
                    );
                  })
                )}
              </View>
              <FilterFooter
                closePress={() => {
                  console.log("closePress", selectData);
                  isSubmitFilter ? submitSelectFilter() : null;
                  setSelectPopup(false);
                }}
                selectPress={() => submitSelectFilter()}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.headerContainer}>
          <View style={styles.headerView}>
            <Text style={styles.headerTitleText}>{strings.expense}</Text>
            <View style={styles.switchButtonView}>
              {expenseToggle ? (
                <ExpenseButton
                  onClick={() => expenseToggleClick(0)}
                  buttonText={roles.REQUESTOR}
                  textColor="#091020"
                  dotColor={COLORS.secondary}
                  buttonColor={COLORS.bc}
                />
              ) : (
                <ExpenseButton
                  onClick={() => expenseToggleClick(1)}
                  buttonText={roles.APPROVER}
                  textColor="#091020"
                  dotColor={"#B085F1"}
                  buttonColor={"#F2ECFB"}
                  type={1}
                />
              )}
              <TouchableOpacity
                onPress={onNavigateRequestForm}
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Image source={images.plus} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 2.5 }}>
            <FlatList
              data={summaryData}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(id) => {
                id.toString();
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: SIZES.width,
                    }}
                  >
                    <SemiBoldText
                      text={"No Summary Found"}
                      color={COLORS.secondary2}
                    />
                  </View>
                );
              }}
              renderItem={(item, index) => {
                const statusName = item?.item?.indicator?.replace(" ", "_");
                return (
                  <View
                    key={item.key}
                    style={{
                      height: "80%",
                      width: SIZES.width / 3,
                      backgroundColor: COLORS.white,
                      shadowColor: "rgba(50, 50, 71, 0.5)",
                      shadowOffset: {
                        width: 0,
                        height: 24,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: SIZES.base,
                      elevation: 20,
                      margin: SIZES.base,
                      borderRadius: SIZES.radius / 2,
                      padding: SIZES.base * 2,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "flex-end",
                      }}
                    >
                      <Image
                        source={
                          sampleArray.summaryIcon[statusName]
                            ? sampleArray.summaryIcon[statusName].icon
                            : null
                        }
                        resizeMode="contain"
                      />
                      <Text
                        numberOfLines={1}
                        style={{
                          ...FONTS.share,
                          color: COLORS.secondary,
                          letterSpacing: 2,
                          marginLeft: SIZES.base,
                          flex: 1,
                        }}
                      >
                        {item.item.count}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        numberOfLines={2}
                        style={{
                          color: "#85949F",
                          letterSpacing: 0.25,
                          ...FONTS.e1,
                          fontWeight: "500",
                        }}
                      >
                        {item.item.indicator
                          ? item.item.indicator
                          : "No Data Found"}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          ...FONTS.share,
                          color: COLORS.secondary2,
                          letterSpacing: 1.2,
                        }}
                      >
                        {/* {item.item.amount} */}
                        {currencyFormat(item.item.amount)}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...FONTS.d1,
                          color: COLORS.secondary,
                          fontWeight: "600",
                        }}
                      >
                        {strings.currency}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            marginHorizontal: SIZES.base,
          }}
        >
          <TouchableOpacity
            onPress={() => onActiveButtonClick()}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: activeClick === "active" ? 2 : null,
              borderBottomColor:
                activeClick === "active" ? COLORS.primary : null,
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                fontWeight: "500",
                color:
                  activeClick === "active" ? COLORS.primary : COLORS.secondary2,
              }}
            >
              {strings.buttonActive}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onCloseButtonClick()}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: activeClick === "close" ? 2 : null,
              borderBottomColor:
                activeClick === "close" ? COLORS.primary : null,
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                fontWeight: "500",
                color:
                  activeClick === "close" ? COLORS.primary : COLORS.secondary2,
              }}
            >
              {strings.buttonClosed}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.5,
            padding: SIZES.base / 1.5,
            backgroundColor: COLORS.white,
            marginVertical: SIZES.base,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {expenseToggle ? (
            <ScrollView
              horizontal
              contentContainerStyle={{
                flexDirection: "row",
                paddingHorizontal: SIZES.padding,
                justifyContent: "center",
                alignItems: "center",
              }}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity activeOpacity={0.7}>
                <Image source={images.filter} />
              </TouchableOpacity>
              <FilterComponent
                filterTitle="Category"
                icon={images.down}
                filterType="select"
                onPress={() => selectFilterClick("Category", 0)}
                isSelectedValue={categoriesCount > 0 ? true : false}
                filterCount={categoriesCount}
              />
              <FilterComponent
                filterTitle="Status"
                icon={images.down}
                filterType="select"
                isSelectedValue={statusCount > 0 ? true : false}
                onPress={() => selectFilterClick("Status", 1)}
                filterCount={statusCount}
              />
              <FilterComponent
                type="search"
                filterTitle="Project name"
                icon={images.searchFilter}
                onPress={() => searchFilterClick("Project name", 3)}
                isSelectedValue={projectNameCount > 0 ? true : false}
                filterCount={projectNameCount}
              />
              <FilterComponent
                filterTitle="Expense ID"
                icon={images.searchFilter}
                onPress={() => searchFilterClick("Expense ID", 4)}
                type="search"
                isSelectedValue={expenseIdCount > 0 ? true : false}
                filterCount={expenseIdCount}
              />
            </ScrollView>
          ) : (
            <ScrollView
              horizontal
              contentContainerStyle={{
                flexDirection: "row",
                paddingHorizontal: SIZES.padding,
                justifyContent: "center",
                alignItems: "center",
              }}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity activeOpacity={0.7}>
                <Image source={images.filter} />
              </TouchableOpacity>
              <FilterComponent
                filterTitle="Department"
                icon={images.down}
                filterType="select"
                isSelectedValue={departmentCount > 0 ? true : false}
                onPress={() => selectFilterClick("Department", 2)}
                filterCount={departmentCount}
              />
              <FilterComponent
                filterTitle="Category"
                icon={images.down}
                filterType="select"
                onPress={() => selectFilterClick("Category", 0)}
                isSelectedValue={categoriesCount > 0 ? true : false}
                filterCount={categoriesCount}
              />
              <FilterComponent
                filterTitle="Status"
                icon={images.down}
                filterType="select"
                onPress={() => selectFilterClick("Status", 1)}
                filterCount={statusCount}
                isSelectedValue={statusCount > 0 ? true : false}
              />
              <FilterComponent
                type="search"
                filterTitle="Project name"
                icon={images.searchFilter}
                onPress={() => searchFilterClick("Project name", 5)}
                isSelectedValue={projectNameCount > 0 ? true : false}
                filterCount={projectNameCount}
              />
              <FilterComponent
                type="search"
                filterTitle="Expense ID"
                icon={images.searchFilter}
                onPress={() => searchFilterClick("Expense ID", 6)}
                isSelectedValue={expenseIdCount > 0 ? true : false}
                filterCount={expenseIdCount}
              />
              <FilterComponent
                type="search"
                filterTitle="Employee name"
                icon={images.searchFilter}
                onPress={() => searchFilterClick("Employee name", 7)}
                isSelectedValue={employeeCount > 0 ? true : false}
                filterCount={employeeCount}
              />
            </ScrollView>
          )}
        </View>
        <View
          style={{
            flex: 3,
          }}
        >
          {expenseToggle ? (
            <SwipeListView
              data={selectData.length != 0 ? selectData : summaryListData}
              rightOpenValue={-150}
              disableRightSwipe
              leftOpenValue={75}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              disableLeftSwipe={activeClick === "active" ? false : true}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: SIZES.width,
                    }}
                  >
                    <SemiBoldText
                      text={"No Summary Found"}
                      color={COLORS.secondary2}
                    />
                  </View>
                );
              }}
              renderHiddenItem={(rowData, rowMap) =>
                rowData?.item?.allowed_actions === null ? (
                  <SwipeDeleteDisableCard />
                ) : rowData?.item?.allowed_actions.find(
                    (element) => element === "DELETE"
                  ) ? (
                  <View style={styles.deleteCard} key={rowMap}>
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.base,
                      }}
                      onPress={() => onSwipeDelete(rowData.item)}
                    >
                      {VECTOR.DeleteEnable}
                      <Text style={{ ...FONTS.t3, color: "#E02B2B" }}>
                        {strings.buttonDelete}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <SwipeDeleteDisableCard />
                )
              }
              renderItem={(data, rowMap) => (
                <ExpenseComponent
                  data={data}
                  colorData={sampleArray.colorObj}
                  expenseOnPress={navigateApproverExpenseDetails}
                />
              )}
            />
          ) : (
            <View style={{ flex: 2 }}>
              <SwipeListView
                data={selectData.length != 0 ? selectData : summaryListData}
                rightOpenValue={-300}
                leftOpenValue={300}
                showsVerticalScrollIndicator={false}
                disableRightSwipe
                keyExtractor={(item, index) => index.toString()}
                disableLeftSwipe={activeClick === "active" ? false : true}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: SIZES.width,
                      }}
                    >
                      <SemiBoldText
                        text={"No Summary Found"}
                        color={COLORS.secondary2}
                      />
                    </View>
                  );
                }}
                renderHiddenItem={(rowData, rowMap) => {
                  return rowData?.item?.allowed_actions ? (
                    <View
                      style={{
                        backgroundColor: COLORS.white,
                        marginHorizontal: SIZES.base * 2,
                        borderRadius: SIZES.radius / 3,
                        flex: 1,
                        marginTop: SIZES.base * 2,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        backgroundColor: "#FCCECE",
                      }}
                    >
                      {rowData?.item?.allowed_actions?.find(
                        (element) => element === "REJECT"
                      ) ? (
                        <TouchableOpacity
                          activeOpacity={0.1}
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: SIZES.base * 3,
                            backgroundColor: "#FCCECE",
                          }}
                          onPress={() => approverSwipeClick(rowData.item, 0)}
                        >
                          <Image source={images.swipeClose} />
                          <Text style={{ ...FONTS.t3, color: "#E02B2B" }}>
                            {strings.buttonReject}
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                      {rowData?.item?.allowed_actions?.find(
                        (element) => element === "ASK_INFO"
                      ) ? (
                        <TouchableOpacity
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#FFE9DB",
                            width: 80,
                          }}
                          activeOpacity={0.7}
                          onPress={() => approverSwipeClick(rowData.item, 1)}
                        >
                          <Image source={images.swipeInfo} />

                          <Text style={{ ...FONTS.t3, color: "#CC743E" }}>
                            {strings.buttonAskInfo}
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                      {rowData?.item?.allowed_actions?.find(
                        (element) => element == "APPROVE"
                      ) ? (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#CBF1D9",
                            borderTopEndRadius: SIZES.radius / 3,
                            borderBottomRightRadius: SIZES.radius / 3,
                            width: 80,
                          }}
                          onPress={() => approverSwipeClick(rowData.item, 2)}
                        >
                          <Image source={images.swipeApprove} />
                          <Text style={{ ...FONTS.t3, color: "#34C369" }}>
                            {strings.buttonApprove}
                          </Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  ) : (
                    <SwipeApproverDeleteCard />
                  );
                }}
                renderItem={(data, rowMap) => (
                  <View
                    style={{
                      backgroundColor: COLORS.white,
                      marginHorizontal: SIZES.base * 2,
                      borderRadius: SIZES.radius / 3,
                      flex: 1,
                      marginTop: SIZES.base * 2,
                    }}
                  >
                    <ExpenseComponent
                      data={data}
                      type={1}
                      colorData={sampleArray.colorObj}
                      expenseOnPress={navigateRequesterExpenseDetails}
                    />
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#D6E4EC",
                      }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        paddingVertical: SIZES.base * 2,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image source={images.profile} resizeMode="contain" />
                      </View>
                      <View
                        style={{
                          flex: 2.5,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          numberOfLines={1}
                          style={{
                            ...FONTS.t1,
                            flex: 1,
                            color: COLORS.secondary,
                          }}
                        >
                          {data.item.requester_name}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            ...FONTS.t1,
                            flex: 1,
                            color: COLORS.secondary,
                          }}
                        >
                          | {`${data.item.department_name}`}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1.5,
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ ...FONTS.t1, color: COLORS.secondary }}>
                          {data.item.last_updated_date}
                        </Text>
                        <Text style={{ ...FONTS.t1, color: COLORS.secondary }}>
                          Last Updated
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  componentView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(247, 245, 250, 1)",
  },
  headerContainer: {
    flex: 3,
    backgroundColor: "#FBFBFB",
    borderBottomEndRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: SIZES.base * 7,
    elevation: 20,
    paddingHorizontal: SIZES.base,
  },
  headerView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding2 / 2,
  },
  headerTitleText: {
    ...FONTS.h2,
    fontFamily: "PlayfairDisplay-Bold",
    color: COLORS.header,
  },
  switchButtonView: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchButtonContainer: {
    width: 125,
    height: 38,
    borderRadius: SIZES.radius,
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.base,
  },
  switchElementView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    ...FONTS.t1,
    marginHorizontal: SIZES.base * 1.2,
    flex: 1,
  },
  switchDotView: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },

  deleteCard: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: SIZES.base * 2,
    padding: SIZES.padding2,
    backgroundColor: "#FCCECE",
    height: 78,
    borderRadius: SIZES.radius / 6,
    marginTop: SIZES.base * 2,
  },
  notAbletoDeleteCard: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: SIZES.base * 2,
    padding: SIZES.padding2,
    backgroundColor: "#E7EAEE",
    height: 78,
    borderRadius: SIZES.radius / 6,
    marginTop: SIZES.base * 2,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  trash: {
    height: 25,
    width: 25,
  },
  filterIcon: {
    marginLeft: SIZES.base * 1.5,
    width: 10,
    height: 6,
    alignSelf: "center",
  },
  expenseCard: {
    backgroundColor: COLORS.white,
    height: 78,
    borderRadius: SIZES.radius / 6,
    marginHorizontal: SIZES.base * 2,
    marginTop: SIZES.base * 2,
    flexDirection: "row",
  },
  expenseApproverCard: {
    height: 78,
    flexDirection: "row",
  },
});
const mapStateToProps = (state) => {
  return {
    LoginReducer: state.LoginReducer,
  };
};
export default connect(mapStateToProps)(Expense);

// Select and Search popup header
const FilterHeader = ({ title, subheader, resetPress }) => {
  return (
    <View
      style={{
        height: 80,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <SemiBoldText text={title} color={COLORS.secondary2} />
      <TouchableOpacity onPress={resetPress}>
        <SemiBoldText text={subheader} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};
//Select and Search bottom Button Styles
const FilterFooter = ({ closePress, selectPress }) => {
  return (
    <View
      style={{
        height: 80,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Button type={3} color={COLORS.white} onPress={closePress}>
        <ButtonText text={strings.bt_Cancel} color={COLORS.primary} />
      </Button>
      <View style={{ flex: 1, marginLeft: SIZES.base }}>
        <Button
          type={2}
          onPress={selectPress}
          icon={images.Enable_icon}
          color={COLORS.primary}
        >
          <ButtonText text={strings.buttonselect} color={COLORS.white} />
        </Button>
      </View>
    </View>
  );
};
//Drop Down component
const SelectComponent = ({ text, isSelected, key, selectPress }) => {
  return (
    <TouchableOpacity
      key={key}
      onPress={selectPress}
      style={{
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        margin: SIZES.base,
        backgroundColor: isSelected ? COLORS.primary : null,
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          ...FONTS.body4,
          color: isSelected ? COLORS.white : COLORS.primary,
          fontWeight: "500",
        }}
      >
        {text}
      </Text>
      {isSelected ? (
        <Text
          style={{
            ...FONTS.body6,
            color: COLORS.white,
            paddingHorizontal: SIZES.base,
          }}
        >
          x
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};
//Requestor Expense Card
const ExpenseComponent = ({ expenseOnPress, data, type, colorData }) => {
  const requestStatus = data?.item?.status?.replace("_", " ");
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={expenseOnPress}
      style={type == 1 ? styles.expenseApproverCard : styles.expenseCard}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={images.approve} />
      </View>
      <View style={{ flex: 2, justifyContent: "center" }}>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.t2,
            color: COLORS.mdtitle,
            fontWeight: "400",
          }}
        >
          {data.item.ExpenseId}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.body4,
            color: COLORS.secondary,
            fontWeight: "400",
          }}
        >
          {data.item.project_name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.t1,
            color: COLORS.secondary,
            lineHeight: 20,
          }}
        >
          {data.item.spend_category_name}
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          marginRight: SIZES.base * 1.2,
          alignItems: "flex-end",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            backgroundColor: colorData[data?.item?.status]
              ? colorData[data?.item?.status].color
              : null,
            borderRadius: SIZES.radius / 2,
            paddingHorizontal: SIZES.base,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colorData[data?.item?.status]
                ? colorData[data?.item?.status].dotColor
                : null,
              ...FONTS.body6,
              paddingRight: SIZES.base / 3,
            }}
          >
            •
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...FONTS.e1,
              color: colorData[data?.item?.status]
                ? colorData[data?.item?.status].dotColor
                : null,
              letterSpacing: 0.2,
              fontWeight: "500",
            }}
          >
            {spaceCamel(requestStatus)}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text
            numberOfLines={1}
            style={{
              ...FONTS.d1,
              color: COLORS.secondary2,
              bottom: 3,
            }}
          >
            {strings.currency}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...FONTS.share,
              color: COLORS.secondary2,
              letterSpacing: 1.2,
              marginHorizontal: SIZES.base,
            }}
          >
            {digitFormat(data.item.requested_amount)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
//Filter Select and Search component
const FilterComponent = ({
  filterTitle,
  icon,
  type,
  filterType,
  onPress,
  isSelectedValue,
  filterCount,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: "center",
        paddingHorizontal: SIZES.padding2,
        borderRadius: SIZES.radius / 3.2,
        marginLeft: SIZES.padding,
        flexDirection: "row",
        backgroundColor: isSelectedValue ? COLORS.primary1 : "#FBFBFB",
        borderWidth: 1,
        borderColor: "#D6E4EC",
      }}
    >
      <SmallText
        text={`${filterTitle} ${filterCount ? `(${filterCount})` : ""}`}
        color={isSelectedValue ? "#1A2330" : COLORS.secondary2}
      />
      <Image
        source={icon}
        resizeMode={"contain"}
        style={filterType ? styles.filterIcon : null}
      />
    </TouchableOpacity>
  );
};

export function projectRecent(data) {
  return {
    type: "projectRecent",
    payload: data,
  };
}

export function expenseIdRecent(data) {
  return {
    type: "expenseIdRecent",
    payload: data,
  };
}
export function employeesRecent(data) {
  return {
    type: "employeesRecent",
    payload: data,
  };
}
