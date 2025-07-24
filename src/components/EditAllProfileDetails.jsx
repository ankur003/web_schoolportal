import React from 'react'
import { useSelector } from 'react-redux';


const EditAllProfileDetails = React.forwardRef((props, ref) => {
    const { userDetails } = useSelector((state) => state.entityReducer);
    console.log("userDetails", userDetails);
    const [formData, setFormData] = React.useState({});
    const [activeTab, setActiveTab] = React.useState('personal');


    const styles = {
        container: {
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        },
        tabsContainer: {
            display: 'flex',
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            borderRadius: '20px 20px 0 0',
            marginBottom: 0
        },
        tab: {
            flex: 1,
            padding: '1rem 1.5rem',
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '0.9rem',
            textAlign: 'center'
        },
        activeTab: {
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '20px 20px 0 0'
        },
        formCard: {
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '0 0 20px 20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            overflow: 'hidden'
        },
        sectionHeader: {
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '1.5rem 2rem',
            fontSize: '1.2rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: 0
        },
        formBody: {
            padding: '2rem'
        },
        fieldsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
        },
        formGroup: {
            marginBottom: '1.5rem'
        },
        label: {
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        input: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            background: '#ffffff',
            boxSizing: 'border-box',
            color: '#374151'
        },
        inputFocus: {
            borderColor: '#667eea',
            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
            outline: 'none'
        },
        select: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            background: '#ffffff',
            cursor: 'pointer',
            boxSizing: 'border-box',
            color: '#374151'
        },
        disabledInput: {
            background: '#f9fafb',
            color: '#6b7280',
            cursor: 'not-allowed'
        },
        addressSection: {
            marginTop: '2rem'
        },
        addressCard: {
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
            borderRadius: '15px',
            padding: '2rem',
            border: '2px solid transparent',
            marginBottom: '2rem',
            position: 'relative'
        },
        currentAddressCard: {
            borderImage: 'linear-gradient(45deg, #4CAF50, #8BC34A) 1'
        },
        permanentAddressCard: {
            borderImage: 'linear-gradient(45deg, #FF9800, #F44336) 1'
        },
        addressHeader: {
            fontSize: '1.1rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        personalCard: {
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
            borderRadius: '15px',
            padding: '2rem',
            border: '2px solid transparent',
            borderImage: 'linear-gradient(45deg, #9333ea, #ec4899) 1'
        },
        academicCard: {
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
            borderRadius: '15px',
            padding: '2rem',
            border: '2px solid transparent',
            borderImage: 'linear-gradient(45deg, #667eea, #764ba2) 1'
        }
    };


    React.useEffect(() => {
        setFormData({
            fullName: userDetails?.fullName || "",
            dob: userDetails?.dob || "",
            doj: userDetails?.doj || "",
            bloodGroup: userDetails?.userInfo?.bloodGroup || "",
            age: userDetails?.age || "",
            gender: userDetails?.gender || "",
            fatherName: userDetails?.fatherName || "",
            motherName: userDetails?.motherName || "",
            fatherMobileNumber: userDetails?.fatherMobileNumber || "",
            motherMobileNumber: userDetails?.motherMobileNumber || "",
            fatherEmailId: userDetails?.fatherEmailId || "",
            motherEmailId: userDetails?.motherEmailId || "",
            cBuildingName: userDetails?.address?.cBuildingName || "",
            cFlatNo: userDetails?.address?.cFlatNo || "",
            cFloorNo: userDetails?.address?.cFloorNo || "",
            cHouseNo: userDetails?.address?.cHouseNo || "",
            cCoutry: userDetails?.address?.cCoutry || "",
            cDistrict: userDetails?.address?.cDistrict || "",
            cState: userDetails?.address?.cState || "",
            cPinCode: userDetails?.address?.cPinCode || "",
            cVillage: userDetails?.address?.cVillage || "",
            cTehsil: userDetails?.address?.cTehsil || "",
            pBuildingName: userDetails?.address?.pBuildingName || "",
            pFlatNo: userDetails?.address?.pFlatNo || "",
            pFloorNo: userDetails?.address?.pFloorNo || "",
            pHouseNo: userDetails?.address?.pHouseNo || "",
            pCoutry: userDetails?.address?.pCoutry || "",
            pDistrict: userDetails?.address?.pDistrict || "",
            pState: userDetails?.address?.pState || "",
            pPinCode: userDetails?.address?.pPinCode || "",
            pVillage: userDetails?.address?.pVillage || "",
            pTehsil: userDetails?.address?.pTehsil || "",
            fatherOccupation: userDetails?.userInfo?.fatherOccupation || "",
            motherOccupation: userDetails?.userInfo?.motherOccupation || "",
        });
    }, [userDetails]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    React.useImperativeHandle(
        ref,
        () => ({
            getFormData: () => formData,
        }),
        [formData]
    );


    const renderInput = (name, label, type = "text", placeholder = "", disabled = false, icon = "") => (
        <div style={styles.formGroup}>
            <label style={styles.label}>
                <span>{icon}</span>
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name] || ""}
                onChange={handleChange}
                disabled={disabled}
                style={{
                    ...styles.input,
                    ...(disabled ? styles.disabledInput : {})
                }}
                onFocus={(e) => {
                    if (!disabled) {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                    }
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                }}
            />
            <style>{`
                input[name="${name}"]::placeholder {
                    color: #9ca3af !important;
                    opacity: 1 !important;
                    font-style: italic;
                }
                input[name="${name}"]:focus::placeholder {
                    color: #d1d5db !important;
                }
            `}</style>
        </div>
    );


    const renderSelect = (name, label, options, icon = "") => (
        <div style={styles.formGroup}>
            <label style={styles.label}>
                <span>{icon}</span>
                {label}
            </label>
            <select
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                style={styles.select}
                onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                }}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );


    const personalFields = () => (
        <div style={styles.personalCard}>
            <div style={styles.addressHeader}>
                <span>👤</span>
                Personal Information
            </div>
            <div style={styles.fieldsGrid}>
                {renderInput("fullName", "Full Name", "text", "Enter Full Name", false, "👤")}
                {renderInput("dob", "Date of Birth", "date", "", false, "🎂")}
                {renderInput("doj", "Date of Joining", "date", "", false, "📅")}
                {renderInput("bloodGroup", "Blood Group", "text", "Enter Blood Group", false, "🩸")}
                {renderInput("age", "Age", "text", "", true, "⏰")}
                {renderSelect("gender", "Gender", [
                    { value: "", label: "Select Gender" },
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" }
                ], "⚧")}
            </div>
        </div>
    );


    const familyFields = () => (
        <div style={styles.academicCard}>
            <div style={styles.addressHeader}>
                <span>👪</span>
                Family Information
            </div>
            <div style={styles.fieldsGrid}>
                {renderInput("fatherName", "Father's Name", "text", "Enter Father's Name", false, "👨")}
                {renderInput("motherName", "Mother's Name", "text", "Enter Mother's Name", false, "👩")}
                {renderInput("fatherMobileNumber", "Father's Mobile", "tel", "Enter Father's Mobile", false, "📱")}
                {renderInput("motherMobileNumber", "Mother's Mobile", "tel", "Enter Mother's Mobile", false, "📱")}
                {renderInput("fatherEmailId", "Father's Email", "email", "Enter Father's Email", false, "✉️")}
                {renderInput("motherEmailId", "Mother's Email", "email", "Enter Mother's Email", false, "✉️")}
                {renderInput("fatherOccupation", "Father's Occupation", "text", "Enter Father's Occupation", false, "💼")}
                {renderInput("motherOccupation", "Mother's Occupation", "text", "Enter Mother's Occupation", false, "💼")}
            </div>
        </div>
    );


    const addressFields = () => (
        <div style={styles.addressSection}>
            {/* Current Address */}
            <div style={{
                ...styles.addressCard,
                ...styles.currentAddressCard
            }}>
                <div style={styles.addressHeader}>
                    <span>🏠</span>
                    Current Address
                </div>
                <div style={styles.fieldsGrid}>
                    {renderInput("cBuildingName", "Building Name", "text", "Enter Building Name", false, "🏢")}
                    {renderInput("cFlatNo", "Flat Number", "text", "Enter Flat Number", false, "🚪")}
                    {renderInput("cFloorNo", "Floor Number", "text", "Enter Floor Number", false, "🏗️")}
                    {renderInput("cHouseNo", "House Number", "text", "Enter House Number", false, "🏘️")}
                    {renderInput("cVillage", "Village", "text", "Enter Village", false, "🏞️")}
                    {renderInput("cTehsil", "Tehsil", "text", "Enter Tehsil", false, "🗺️")}
                    {renderInput("cDistrict", "District", "text", "Enter District", false, "🌍")}
                    {renderInput("cState", "State", "text", "Enter State", false, "🏛️")}
                    {renderInput("cCoutry", "Country", "text", "Enter Country", false, "🌎")}
                    {renderInput("cPinCode", "PIN Code", "text", "Enter PIN Code", false, "📮")}
                </div>
            </div>


            {/* Permanent Address */}
            <div style={{
                ...styles.addressCard,
                ...styles.permanentAddressCard
            }}>
                <div style={styles.addressHeader}>
                    <span>🏡</span>
                    Permanent Address
                </div>
                <div style={styles.fieldsGrid}>
                    {renderInput("pBuildingName", "Building Name", "text", "Enter Building Name", false, "🏢")}
                    {renderInput("pFlatNo", "Flat Number", "text", "Enter Flat Number", false, "🚪")}
                    {renderInput("pFloorNo", "Floor Number", "text", "Enter Floor Number", false, "🏗️")}
                    {renderInput("pHouseNo", "House Number", "text", "Enter House Number", false, "🏘️")}
                    {renderInput("pVillage", "Village", "text", "Enter Village", false, "🏞️")}
                    {renderInput("pTehsil", "Tehsil", "text", "Enter Tehsil", false, "🗺️")}
                    {renderInput("pDistrict", "District", "text", "Enter District", false, "🌍")}
                    {renderInput("pState", "State", "text", "Enter State", false, "🏛️")}
                    {renderInput("pCoutry", "Country", "text", "Enter Country", false, "🌎")}
                    {renderInput("pPinCode", "PIN Code", "text", "Enter PIN Code", false, "📮")}
                </div>
            </div>
        </div>
    );


    return (
        <div style={styles.container}>
            {/* Tabs */}
            <div style={styles.tabsContainer}>
                {[
                    { id: 'personal', label: '👤 Personal', icon: '👤' },
                    { id: 'family', label: '👪 Family', icon: '👪' },
                    { id: 'address', label: '🏠 Address', icon: '🏠' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        style={{
                            ...styles.tab,
                            ...(activeTab === tab.id ? styles.activeTab : {})
                        }}
                        onClick={() => setActiveTab(tab.id)}
                        onMouseEnter={(e) => {
                            if (activeTab !== tab.id) {
                                e.target.style.background = 'rgba(255,255,255,0.1)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeTab !== tab.id) {
                                e.target.style.background = 'transparent';
                            }
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>


            {/* Form Content */}
            <div style={styles.formCard}>
                <div style={styles.formBody}>
                    {activeTab === 'personal' && personalFields()}
                    {activeTab === 'family' && familyFields()}
                    {activeTab === 'address' && addressFields()}
                </div>
            </div>
        </div>
    );
});


export default EditAllProfileDetails;
