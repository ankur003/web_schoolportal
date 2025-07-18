import React, { useEffect, useState, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createMasterFee, getAllFees, UpdateFee } from '../../Redux/Action/feeManageAction';
import { toast } from 'react-toastify';

export default function FeeSetUpModule() {
    const dispatch = useDispatch();
    const { linkList } = useSelector(state => state.manageClassesReducer);
    const { monthlyList, oneTimeList, loader } = useSelector((state) => state.feeManageReducer);
    const [isPending, startTransition] = useTransition();
    const [currentClass, setCurrentClass] = useState(1);
    const [isShowOneTimeInput, setShowOneTimeInput] = useState(true);
    const [isShowMonthlyInput, setShowMonthlyInput] = useState(true)
    const [isEditOneTime, setIsEditOneTime] = useState(true)
    const [isAddNewOneTime, setAddNewOneTime] = useState(true);
    const [isEditMonthly, setIsEditMonthly] = useState(true);
    const [isAddMonthly, setAddMonthly] = useState(true);
    const [masterClassId, setMasterClassId] = useState("")


    const oneTimeFeeObject = oneTimeList?.reduce((acc, item) => {
        acc[item.feeName] = item;
        return acc;
    }, {});

    const monthlyFeeObject = monthlyList?.reduce((acc, item) => {
        acc[item.feeName] = item;
        return acc;
    }, {});
    
    const [oneTimeFormData, setOneTimeFormData] = useState({
        dressFee: "",
        registrationFee: "",
        annualFee: ""
    });

    const [monthlyFormData, setMonthlyFormData] = useState({
        tuitionFee: "",
        foodFee: "",
        transportFee: ""
    });

    const calculateSubOneTimeTotal = () => {
        const keys = ["DRESS", "REGISTRATION", "ANNUAL"];
        const addition = keys.reduce(
            (sum, key) => sum + (Number(oneTimeFeeObject?.[key]?.totalFee) || 0),
            0
        );
        return addition;

    }
    const calculateSubMonthlyTotal = () => {
        const monthlyKeys = ["TUITION", "FOOD", "TRANSPORT"];
        const total = monthlyKeys.reduce(
            (sum, key) => sum + (Number(monthlyFeeObject?.[key]?.totalFee) || 0),
            0
        );
        return total;
    }

    useEffect(() => {
        setOneTimeFormData({
            ...oneTimeFormData, dressFee: oneTimeFeeObject?.DRESS?.totalFee ? oneTimeFeeObject?.DRESS?.totalFee : 0,
            registrationFee: oneTimeFeeObject?.REGISTRATION?.totalFee ? oneTimeFeeObject?.REGISTRATION?.totalFee : 0,
            annualFee: oneTimeFeeObject?.ANNUAL?.totalFee ? oneTimeFeeObject?.ANNUAL?.totalFee : 0,
        })
        setMonthlyFormData({
            ...monthlyFormData, tuitionFee: monthlyFeeObject?.TUITION?.totalFee ? monthlyFeeObject?.TUITION?.totalFee : 0,
            foodFee: monthlyFeeObject?.FOOD?.totalFee ? monthlyFeeObject?.FOOD?.totalFee : 0,
            transportFee: monthlyFeeObject?.TRANSPORT?.totalFee ? monthlyFeeObject?.TRANSPORT?.totalFee : 0
        })
    }, [currentClass]);


    const onChangeHandler = (e) => {
        setOneTimeFormData({ ...oneTimeFormData, [e.target.name]: e.target.value });
        setMonthlyFormData({ ...monthlyFormData, [e.target.name]: e.target.value });
    }

    const handleClassChange = (param, index) => {
        setMasterClassId(param?.masterClassUuid)
        setCurrentClass(index);
        let data = { masterClassUuid: param?.masterClassUuid, feeType: "MONTHLY" };
        dispatch(getAllFees(data));
        data = { masterClassUuid: param?.masterClassUuid, feeType: "ONE_TIME" };
        dispatch(getAllFees(data));
        setIsEditOneTime(true);
        setIsEditMonthly(true);
        setAddMonthly(true);
        setShowOneTimeInput(true);
        setShowMonthlyInput(true);
        setAddNewOneTime(true);
    };

    const addMontly = (type) => {
        if (type === "Edit") {
            setIsEditMonthly(false);
            setShowMonthlyInput(false);
        }
        else {
            setAddMonthly(false);
            setShowMonthlyInput(false);
        }
    }

    const addOneTime = (type) => {
        if (type === "Edit") {
            setIsEditOneTime(false);
            setShowOneTimeInput(false);
        }
        else {
            setAddNewOneTime(false);
            setShowOneTimeInput(false);
        }
    }

    const onsubmitOneTime = () => {
        const feeKeys = ["DRESS", "REGISTRATION", "ANNUAL"];
        const payload = feeKeys.map((key) => ({
            feeName: key,
            feeType: "ONE_TIME",
            masterClassUuid: masterClassId,
            totalFee: Number(oneTimeFormData?.[`${key.toLowerCase()}Fee`])
        }));

        dispatch(createMasterFee(payload, linkList[0]?.masterClassUuid, toast));
        setAddNewOneTime(true);
        setShowOneTimeInput(true);
        setCurrentClass(1);
    }

    const UpdateOneTime = () => {
        const feeKeys = ["DRESS", "ANNUAL", "REGISTRATION"];
        const payload = feeKeys.map((key) => ({
            masterFeeUuid: oneTimeFeeObject?.[key]?.masterFeesUuid,
            totalFee: Number(oneTimeFormData?.[`${key.toLowerCase()}Fee`])
        }));
        dispatch(UpdateFee(payload, masterClassId, toast));
        setIsEditOneTime(true);
        setShowOneTimeInput(true);
        setCurrentClass(1);
    }

    const UpdateMonthly = () => {
        const feeKeys = ["TUITION", "FOOD", "TRANSPORT"];
        const payload = feeKeys.map((key) => ({
            masterFeeUuid: monthlyFormData?.[key]?.masterFeesUuid,
            totalFee: Number(monthlyFormData?.[`${key.toLowerCase()}Fee`])
        }));
        dispatch(UpdateFee(payload, masterClassId, toast));
        setIsEditMonthly(true);
        setShowMonthlyInput(true);
        setCurrentClass(1);
    }

    const onsubmitMonthly = () => {
        const feeKeys = ["TUITION", "FOOD", "TRANSPORT"];
        const payload = feeKeys.map((key) => ({
            feeName: key,
            feeType: "MONTHLY",
            masterClassUuid: masterClassId,
            totalFee: Number(monthlyFormData?.[`${key.toLowerCase()}Fee`])
        }));
        dispatch(createMasterFee(payload, linkList[0]?.masterClassUuid, toast));
        setAddMonthly(true);
        setShowMonthlyInput(true);
        setCurrentClass(1);
    }



    useEffect(() => {
        setMasterClassId(linkList[0]?.masterClassUuid)
        let data = { masterClassUuid: linkList[0]?.masterClassUuid, feeType: "ONE_TIME" };
        dispatch(getAllFees(data));
    }, []);

    useEffect(() => {
        setMasterClassId(linkList[0]?.masterClassUuid)
        let data = { masterClassUuid: linkList[0]?.masterClassUuid, feeType: "MONTHLY" };
        dispatch(getAllFees(data));
    }, []);

    const cancelAddOrEdit = (type) => {
        if (type === "OneTime") {
            setShowOneTimeInput(true);
            setIsEditOneTime(true);
            setAddNewOneTime(true);
        } else {
            setShowMonthlyInput(true);
            setIsEditMonthly(true);
            setAddMonthly(true);
        }
    }

    return (
        <>
            <div className="header">
                <h1>Fee Structure Manager</h1>
            </div>
            <div className="content-body">
                <div className="timeTablecontainer fee-module">
                    <div className="class-selector">
                        {linkList.map((data, idx) => (
                            <button
                                key={idx + 1}
                                className={`class-btn${currentClass === idx + 1 ? " active" : ""}`}
                                onClick={() => handleClassChange(data, idx + 1)}
                            >
                                {data?.className}
                            </button>
                        ))}
                    </div>

                    <div className="fee-wrapper">
                        <div className="flex-35 pd-r-10">
                            <div className="fee-card alert alert-warning">
                                <div className="fee-card-header">
                                    <h6>
                                        <span><i className="fa-solid fa-dollar-sign"></i></span> One Time Fee
                                    </h6>
                                    <div className="btn-card-block">
                                        <button className="btn btn-warning mr-r-5" onClick={() => addOneTime(oneTimeFeeObject.hasOwnProperty("ANNUAL") ? "Edit" : "ADD NEW")}> {oneTimeFeeObject.hasOwnProperty("ANNUAL") ? <i className="fa-solid fa-pen-to-square mr-0"></i> : <i className="fa-solid fa-plus mr-0"></i>}</button>
                                        {!isShowOneTimeInput && <button className="btn btn-secondary" onClick={() => cancelAddOrEdit("OneTime")}><i className="fa-solid fa-xmark mr-0"></i> </button>}
                                    </div>
                                </div>
                                <div className="fee-card-body">
                                    <div className="fee-block-feild">
                                        <div className="flex align-center">
                                            <div className="flex-50">
                                                <p><span><i className="fa-solid fa-book"></i></span>Annual Fee</p>
                                            </div>
                                            <div className="flex-50">
                                                <div className="fee-input">
                                                    {isShowOneTimeInput ?
                                                        <p><span><i className="fa-solid fa-indian-rupee-sign"></i></span>{oneTimeFeeObject?.ANNUAL?.totalFee ? oneTimeFeeObject?.ANNUAL?.totalFee : "0"}</p>
                                                        :
                                                        <input type='text' className='form-control' name="annualFee" value={oneTimeFormData?.annualFee} onChange={(e) => onChangeHandler(e)} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fee-block-feild">
                                        <div className="flex align-center">
                                            <div className="flex-50">
                                                <p><span><i className="fa-solid fa-users"></i></span>Registration Fee</p>
                                            </div>
                                            <div className="flex-50">
                                                <div className="fee-input">
                                                    {isShowOneTimeInput ?
                                                        <p><span><i className="fa-solid fa-indian-rupee-sign"></i></span>{oneTimeFeeObject?.REGISTRATION?.totalFee ? oneTimeFeeObject?.REGISTRATION?.totalFee : "0"}</p>
                                                        :
                                                        <input type='text' className='form-control' name="registrationFee" value={oneTimeFormData?.registrationFee} onChange={(e) => onChangeHandler(e)} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fee-block-feild">
                                        <div className="flex align-center">
                                            <div className="flex-50">
                                                <p><span><i className="fa-solid fa-graduation-cap"></i></span>Dress Fee</p>
                                            </div>
                                            <div className="flex-50">
                                                <div className="fee-input">
                                                    {isShowOneTimeInput ?
                                                        <p><span><i className="fa-solid fa-indian-rupee-sign"></i></span>{oneTimeFeeObject?.DRESS?.totalFee ? oneTimeFeeObject?.DRESS?.totalFee : "0"}</p>
                                                        : <input type='text' className='form-control' name="dressFee" value={oneTimeFormData?.dressFee} onChange={(e) => onChangeHandler(e)} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="fee-card-footer">
                                    <div className="fee-block-feild">
                                        <div className="flex align-center">
                                            <div className="flex-50">
                                                <p><span><i className="fa-solid fa-calculator"></i></span>Sub Total</p>
                                            </div>
                                            <div className="flex-50">
                                                <div className="fee-input">

                                                    <p><span><i className="fa-solid fa-indian-rupee-sign"></i></span>{calculateSubOneTimeTotal()}</p>
                                                    {!isEditOneTime && <button className="btn btn-primary" onClick={() => { UpdateOneTime(); }}>Update</button>}
                                                    {!isAddNewOneTime && <button className="btn btn-primary" onClick={() => { onsubmitOneTime(); }}>Save</button>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex-35 pd-l-10 pd-r-10'>
                            <div className="fee-card alert alert-success">
                                <div className="fee-card-header">
                                    <h6>
                                        <span><i className="fa-solid fa-dollar-sign"></i></span>Monthly Fees
                                    </h6>
                                    <div className="btn-card-block">
                                        <button className="btn btn-success mr-r-5" onClick={() => addMontly(monthlyFeeObject.hasOwnProperty("TUITION") ? "Edit" : "ADD NEW")}> {monthlyFeeObject.hasOwnProperty("TUITION") ? <i className="fa-solid fa-pen-to-square mr-0"></i> : <i className="fa-solid fa-plus mr-0"></i>}</button>
                                        {!isShowMonthlyInput && <button className="btn btn-secondary" onClick={() => cancelAddOrEdit("Monthly")}><i className="fa-solid fa-xmark mr-0"></i> </button>}
                                    </div>

                                </div>
                                <div className="fee-card-body">
                                    <div className="fee-block-feild">
                                        <div className="flex align-center">
                                            <div className="flex-50">
                                                <p><span><i className="fa-solid fa-book"></i></span>Tuition Fee</p>
                                            </div>
                                            <div className="flex-50">
                                                <div className="fee-input">
                                                    {isShowMonthlyInput ?
                                                        <p><span><i className="fa-solid fa-indian-rupee-sign"></i></span>{monthlyFeeObject?.TUITION?.totalFee ? monthlyFeeObject?.TUITION?.totalFee : "0"}</p>
                                                        :
                                                        <input type='text' className='form-control' name="tuitionFee" value={monthlyFormData?.tuitionFee} onChange={(e) => onChangeHandler(e)} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fee-block-feild">
                                        <div className="flex align-center">
                                            <div className="flex-50">
                                                <p><span><i className="fa-solid fa-utensils"></i></span>Food Fee</p>
                                            </div>
                                            <div className="flex-50">
                                                <div className="fee-input">
                                                    {isShowMonthlyInput ?
                                                        <p><span><i className="fa-solid fa-indian-rupee-sign"></i></span>{monthlyFeeObject?.FOOD?.totalFee ? monthlyFeeObject?.FOOD?.totalFee : "0"}</p>
                                                        : <input type='text' className='form-control' name="foodFee" value={monthlyFormData?.foodFee} onChange={(e) => onChangeHandler(e)} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fee-block-feild">
                                        <div className="flex align-center">
                                            <div className="flex-50">
                                                <p><span><i className="fa-solid fa-bus"></i></span>Transport Fee</p>
                                            </div>
                                            <div className="flex-50">
                                                <div className="fee-input">
                                                    {isShowMonthlyInput ?
                                                        <p><span><i className="fa-solid fa-indian-rupee-sign"></i></span>{monthlyFeeObject?.TRANSPORT?.totalFee ? monthlyFeeObject?.TRANSPORT?.totalFee : "0"}</p>
                                                        : <input type='text' className='form-control' name="transportFee" value={monthlyFormData?.transportFee} onChange={(e) => onChangeHandler(e)} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="fee-card-footer">
                                    <div className="fee-block-feild">
                                        <div className="flex align-center">
                                            <div className="flex-50">
                                                <p><span><i className="fa-solid fa-calculator"></i></span>Sub Total</p>
                                            </div>
                                            <div className="flex-50">
                                                <div className="fee-input">
                                                    <p><span><i className="fa-solid fa-indian-rupee-sign"></i></span>{calculateSubMonthlyTotal()}</p>
                                                    {!isEditMonthly && <button className="btn btn-primary" onClick={() => { UpdateMonthly() }}>Update</button>}
                                                    {!isAddMonthly && <button className="btn btn-primary" onClick={() => { onsubmitMonthly() }}>Save</button>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex-30 pd-l-10 '>
                            <div className="fee-card annual-fee-card alert alert-info">
                                <div className="fee-card-header">
                                    <h6>
                                        <span><i className="fa-solid fa-calculator"></i></span>Annual Cost Summary
                                    </h6>
                                </div>
                                <div className="fee-card-body">
                                    <div className="fee-block-feild">
                                        <div className="flex align-center">
                                            <p>One-Time Fees</p>
                                            <h6><i className="fa-solid fa-indian-rupee-sign"></i>{calculateSubOneTimeTotal()}</h6>
                                        </div>
                                    </div>
                                    <div className="fee-block-feild">
                                        <div className="flex align-center">
                                            <p>Monthly Fees × 12</p>
                                            <h6><i className="fa-solid fa-indian-rupee-sign"></i>{calculateSubMonthlyTotal() * 12}</h6>
                                        </div>
                                    </div>
                                    <div className="fee-block-feild annual-amount-feild">
                                        <div className="flex align-center">
                                            <p>Total Annual Cost</p>
                                            <h6><i className="fa-solid fa-indian-rupee-sign"></i>{calculateSubOneTimeTotal() + (calculateSubMonthlyTotal() * 12)}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
