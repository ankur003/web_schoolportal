import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EditAllProfileDetails from '../components/EditAllProfileDetails';
import { getAllUserDetails, updateUserDetails } from '../Redux/Action/entityAction';
import { PARENT, SUPER_ADMIN, TEACHER } from '../Redux/Constants';
import { toast } from 'react-toastify';


export default function ProfileDetailsPage() {
    const { pic, loader, noDataFound, userDetails } = useSelector((state) => state.entityReducer)
    const { userId, role } = useSelector((state) => state.loginReducer);
    console.log({ userDetails, userId })


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(true);
    const [activeTab, setActiveTab] = useState('personal');


    const styles = {
        container: {
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        topBar: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: '0',
            zIndex: '100'
        },
        topBarLeft: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        },
        logo: {
            width: '3rem',
            height: '3rem',
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
        },
        title: {
            fontSize: '1.8rem',
            fontWeight: '700',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
        },
        backButton: {
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '25px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
        },
        mainContent: {
            maxWidth: '1400px',
            margin: '0 auto'
        },
        profileBanner: {
            background: 'linear-gradient(145deg, #667eea 0%, #764ba2 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        },
        profileHeader: {
            display: 'flex',
            // alignItems: 'center',
            gap: '2rem',
            // marginBottom: '2rem'
        },
        avatarSection: {
            position: 'relative'
        },
        avatar: {
            width: '120px',
            height: '120px',
            borderRadius: '30px',
            border: '4px solid rgba(255,255,255,0.3)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
            objectFit: 'cover'
        },
        statusBadge: {
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: '#4CAF50',
            color: 'white',
            padding: '0.3rem 0.8rem',
            borderRadius: '15px',
            fontSize: '0.7rem',
            fontWeight: '600',
            boxShadow: '0 4px 10px rgba(76, 175, 80, 0.3)'
        },
        profileInfo: {
            flex: 1,
            color: 'white'
        },
        userName: {
            fontSize: '2.5rem',
            fontWeight: '700',
            margin: '0 0 0.5rem 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
        },
        userRole: {
            fontSize: '1.1rem',
            opacity: '0.9',
            marginBottom: '1rem'
        },
        quickStats: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem'
        },
        statCard: {
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            padding: '1rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            textAlign: 'center'
        },
        statValue: {
            fontSize: '1.2rem',
            fontWeight: '700',
            color: 'white',
            margin: '0 0 0.3rem 0',
            wordBreak: 'break-word',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        statLabel: {
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.8)',
            margin: 0
        },
        actionButtons: {
            display: 'flex',
            gap: '1rem',
            alignItems: 'start'
        },
        editButton: {
            background: isEdit ? 'linear-gradient(45deg, #ff6b6b, #ee5a24)' : 'linear-gradient(45deg, #00b894, #00cec9)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '25px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
            fontSize: '1rem'
        },
        contentArea: {
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(20px)'
        },
        tabsContainer: {
            display: 'flex',
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            borderRadius: '20px 20px 0 0'
        },
        tab: {
            flex: 1,
            padding: '1.5rem',
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '1rem'
        },
        activeTab: {
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '20px 20px 0 0'
        },
        tabContent: {
            padding: '2rem'
        },
        sectionGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
        },
        infoCard: {
            background: 'linear-gradient(145deg, #f8f9fa, #e9ecef)',
            borderRadius: '15px',
            padding: '1.5rem',
            border: '1px solid #e0e0e0',
            transition: 'all 0.3s ease'
        },
        cardTitle: {
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#333',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        cardIcon: {
            width: '20px',
            height: '20px',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        infoRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.8rem 0',
            borderBottom: '1px solid #f0f0f0'
        },
        infoLabel: {
            fontWeight: '600',
            color: '#666',
            fontSize: '0.9rem'
        },
        infoValue: {
            color: '#333',
            fontWeight: '500',
            fontSize: '0.9rem'
        },
        addressGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
        },
        addressCard: {
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
            borderRadius: '15px',
            padding: '1.5rem',
            border: '2px solid transparent',
            backgroundClip: 'padding-box',
            position: 'relative',
            transition: 'all 0.3s ease'
        },
        addressHeader: {
            fontSize: '1rem',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        currentAddress: {
            borderImage: 'linear-gradient(45deg, #4CAF50, #8BC34A) 1'
        },
        permanentAddress: {
            borderImage: 'linear-gradient(45deg, #FF9800, #F44336) 1'
        }
    };


    const getAge = (date) => {
        let today = new Date(),
            dob = new Date(date),
            diff = today.getTime() - dob.getTime(),
            years = Math.floor(diff / 31556736000),
            days_diff = Math.floor((diff % 31556736000) / 86400000),
            months = Math.floor(days_diff / 30.4167),
            days = Math.floor(days_diff % 30.4167);
        return years + " years " + months + " months " + days + " days";
    }


    const editRef = React.useRef();
    const submitForm = () => {
        if (editRef.current && editRef.current.getFormData) {
            const data = editRef.current.getFormData();
            let payload = { userId: userId, ...data };
            dispatch(updateUserDetails(payload, setIsEdit, toast));
        }
    };


    useEffect(() => {
        dispatch(getAllUserDetails(userId, null));
    }, [userId]);


    const personalInfo = [
        { label: "Full Name", value: userDetails?.fullName, icon: "👤" },
        { label: "Date of Birth", value: userDetails?.dob, icon: "🎂" },
        { label: "Age", value: userDetails?.dob ? getAge(userDetails?.dob) : null, icon: "⏰" },
        { label: "Gender", value: userDetails?.userInfo?.gender, icon: "⚧" },
        { label: "Blood Group", value: userDetails?.userInfo?.bloodGroup, icon: "🩸" },
        { label: "Date of Joining", value: userDetails?.doj, icon: "📅" }
    ];


    const familyInfo = [
        { label: "Father's Name", value: userDetails?.userInfo?.fatherName, icon: "👨" },
        { label: "Mother's Name", value: userDetails?.userInfo?.motherName, icon: "👩" },
        { label: "Father's Mobile", value: userDetails?.userInfo?.fatherPh, icon: "📱" },
        { label: "Mother's Mobile", value: userDetails?.userInfo?.motherPh, icon: "📱" },
        { label: "Father's Email", value: userDetails?.userInfo?.fatherEmail, icon: "✉️" },
        { label: "Mother's Email", value: userDetails?.userInfo?.motherEmail, icon: "✉️" },
        { label: "Father's Occupation", value: userDetails?.userInfo?.fatherOccupation, icon: "💼" },
        { label: "Mother's Occupation", value: userDetails?.userInfo?.motherOccupation, icon: "💼" }
    ];


    const academicInfo = [
        { label: "Roll Number", value: userDetails?.rollNumber, icon: "🔢" },
        { label: "Enrollment No", value: userDetails?.enrollmentNumber, icon: "📋" },
        { label: "Class", value: userDetails?.className, icon: "🎓" },
        { label: "Section", value: userDetails?.sectionName, icon: "📚" },
        { label: "Email", value: userDetails?.username, icon: "📧" },
        { label: "Mobile", value: userDetails?.phoneNo, icon: "📞" }
    ];


    const renderInfoCard = (title, data, icon) => (
        <div style={styles.infoCard}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}>
            <div style={styles.cardTitle}>
                <span style={styles.cardIcon}>{icon}</span>
                {title}
            </div>
            {data.map((item, index) => (
                <div key={index} style={styles.infoRow}>
                    <span style={styles.infoLabel}>
                        <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>
                        {item.label}
                    </span>
                    <span style={styles.infoValue}>{item.value || "N/A"}</span>
                </div>
            ))}
        </div>
    );


    const renderAddressCard = (title, addressData, type) => (
        <div style={{
            ...styles.addressCard,
            ...(type === 'current' ? styles.currentAddress : styles.permanentAddress)
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}>
            <div style={styles.addressHeader}>
                <span>{type === 'current' ? '🏠' : '🏡'}</span>
                {title}
            </div>
            {addressData.map((item, index) => (
                <div key={index} style={styles.infoRow}>
                    <span style={styles.infoLabel}>{item.label}</span>
                    <span style={styles.infoValue}>{item.value || "N/A"}</span>
                </div>
            ))}
        </div>
    );


    const currentAddressData = [
        { label: "Building", value: userDetails?.address?.cBuildingName },
        { label: "Flat No", value: userDetails?.address?.cFlatNo },
        { label: "Floor", value: userDetails?.address?.cFloorNo },
        { label: "House No", value: userDetails?.address?.cHouseNo },
        { label: "Village", value: userDetails?.address?.cVillage },
        { label: "Tehsil", value: userDetails?.address?.cTehsil },
        { label: "District", value: userDetails?.address?.cDistrict },
        { label: "State", value: userDetails?.address?.cState },
        { label: "Country", value: userDetails?.address?.cCoutry },
        { label: "PIN Code", value: userDetails?.address?.cPinCode }
    ];


    const permanentAddressData = [
        { label: "Building", value: userDetails?.address?.pBuildingName },
        { label: "Flat No", value: userDetails?.address?.pFlatNo },
        { label: "Floor", value: userDetails?.address?.pFloorNo },
        { label: "House No", value: userDetails?.address?.pHouseNo },
        { label: "Village", value: userDetails?.address?.pVillage },
        { label: "Tehsil", value: userDetails?.address?.pTehsil },
        { label: "District", value: userDetails?.address?.pDistrict },
        { label: "State", value: userDetails?.address?.pState },
        { label: "Country", value: userDetails?.address?.pCoutry },
        { label: "PIN Code", value: userDetails?.address?.pPinCode }
    ];


    return (
        <>
            <div className="header">
                <h1>Profile</h1>
                <div className="header-right">
                    {role === SUPER_ADMIN && (
                        <button
                            type="button" className="btn btn-outline-light"
                            onClick={() => navigate("/EntityPage")}
                        >
                            Back to Entity
                        </button>
                    )}
                    {(role === PARENT || role === TEACHER) && (
                        <button
                            type="button" className="btn btn-outline-light"
                            onClick={() => navigate("/StudentPage")}
                        >
                            ← Back to Students
                        </button>
                    )}
                </div>
            </div>
            <div className="content-body" style={styles.container}>


                {/* Main Content */}
                <div style={styles.mainContent}>
                    {/* Profile Banner */}
                    <div style={styles.profileBanner}>
                        <div style={styles.profileHeader}>
                            <div style={styles.avatarSection}>
                                <img
                                    src={pic?.base64String === undefined ? require('../assets/images/no-data-found.gif') : 'data:image/png;base64,' + pic?.base64String}
                                    alt="Profile"
                                    style={styles.avatar}
                                />
                                <div style={styles.statusBadge}>
                                    {userDetails?.isActive === true ? "✓ Active" : "✗ Inactive"}
                                </div>
                            </div>


                            <div style={styles.profileInfo}>
                                <h2 style={styles.userName}>
                                    {userDetails?.fullName || "N/A"}
                                </h2>
                                <p style={styles.userRole}>
                                    {userDetails?.userType || "N/A"} • {userDetails?.className || "N/A"} {userDetails?.sectionName ? `- ${userDetails?.sectionName}` : ""}
                                </p>


                                <div style={styles.quickStats}>
                                    <div style={styles.statCard}>
                                        <p style={styles.statValue}>{userDetails?.rollNumber || "N/A"}</p>
                                        <p style={styles.statLabel}>Roll Number</p>
                                    </div>
                                    <div style={styles.statCard}>
                                        <p style={styles.statValue}>{userDetails?.enrollmentNumber || "N/A"}</p>
                                        <p style={styles.statLabel}>Enrollment</p>
                                    </div>
                                    <div style={styles.statCard}>
                                        <p style={styles.statValue}>{userDetails?.dob ? getAge(userDetails?.dob).split(' ')[0] + " yrs" : "N/A"}</p>
                                        <p style={styles.statLabel}>Age</p>
                                    </div>
                                    <div style={styles.statCard}>
                                        <p style={styles.statValue}>{userDetails?.userInfo?.bloodGroup || "N/A"}</p>
                                        <p style={styles.statLabel}>Blood Group</p>
                                    </div>
                                </div>
                            </div>


                            <div style={styles.actionButtons}>
                                <button
                                    style={styles.editButton}
                                    onClick={() => { isEdit ? setIsEdit(!isEdit) : submitForm() }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-3px)';
                                        e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
                                    }}
                                >
                                    {isEdit ? "✏️ Edit Profile" : "💾 Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* Content Area */}
                    <div style={styles.contentArea}>
                        {isEdit ? (
                            <>
                                {/* Tabs */}
                                <div style={styles.tabsContainer}>
                                    {[
                                        { id: 'personal', label: '👤 Personal Info', icon: '👤' },
                                        { id: 'academic', label: '🎓 Academic Info', icon: '🎓' },
                                        { id: 'family', label: '👪 Family Info', icon: '👪' },
                                        { id: 'address', label: '🏠 Address Info', icon: '🏠' }
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


                                {/* Tab Content */}
                                <div style={styles.tabContent}>
                                    {activeTab === 'personal' && (
                                        <div style={styles.sectionGrid}>
                                            {renderInfoCard("Personal Details", personalInfo, "👤")}
                                        </div>
                                    )}


                                    {activeTab === 'academic' && (
                                        <div style={styles.sectionGrid}>
                                            {renderInfoCard("Academic Information", academicInfo, "🎓")}
                                        </div>
                                    )}


                                    {activeTab === 'family' && (
                                        <div style={styles.sectionGrid}>
                                            {renderInfoCard("Family Information", familyInfo, "👪")}
                                        </div>
                                    )}


                                    {activeTab === 'address' && (
                                        <div style={styles.addressGrid}>
                                            {renderAddressCard("Current Address", currentAddressData, 'current')}
                                            {renderAddressCard("Permanent Address", permanentAddressData, 'permanent')}
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div style={styles.tabContent}>
                                <div style={{
                                    background: 'linear-gradient(145deg, #f8f9fa, #ffffff)',
                                    borderRadius: '15px',
                                    padding: '2rem',
                                    border: '2px dashed #667eea'
                                }}>
                                    <h3 style={{
                                        color: '#667eea',
                                        textAlign: 'center',
                                        marginBottom: '2rem',
                                        fontSize: '1.5rem',
                                        fontWeight: '700'
                                    }}>
                                        ✏️ Edit Profile Information
                                    </h3>
                                    <EditAllProfileDetails ref={editRef} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
