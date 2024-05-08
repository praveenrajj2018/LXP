import React, { useState } from 'react'
//import './Relevantz.png'
import { FaBars, FaBookOpenReader, FaDeleteLeft } from "react-icons/fa6";
import { FaSearch, FaUserGraduate, FaHome, FaChartBar } from "react-icons/fa";
import Draggable from 'react-draggable';
import { FaPlus, FaBell, FaUser, FaChevronUp } from 'react-icons/fa';
import { FaPlay, FaVideo, FaMusic, FaFilePdf, FaFilePowerpoint, FaFileAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import Modal from 'react-modal';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { CiYoutube } from "react-icons/ci";
import '../Styles/Course_Description.css';
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import CourseCreationForm from './Content_Page';
const Navbars = () => {
    const [showSideNav, setShowSideNav] = useState(false);
    const [activePage, setActivePage] = useState('home');
    const [searchTerm, setSearchTerm] = React.useState('');

    const [showReportDropdown, setShowReportDropdown] = useState(false);
    const handlePageChange = (page) => {
        setActivePage(page);
        if (!showSideNav) {
            setShowSideNav(true);
        }
        if (page === 'reports') {
            setShowReportDropdown(!showReportDropdown);
        }
        if (showReportDropdown) setShowReportDropdown(!showReportDropdown);
    };
    const handleChange = e => {
        const { name, value } = e.target;
        setCourse({
            ...course,
            [name]: value,
        });
        setSearchTerm(e.target.value);
    };
    const toggleSideNav = () => {
        setShowSideNav(!showSideNav);
    }; const [course, setCourse] = useState({
        title: '',
        category: '',
        level: '',
        duration: '',
        description: '',
        thumbnail: null,
        courseTopic: '',
        contentCovered: '',
    });
    
    const [showPopup, setShowPopup] = useState(false);
    const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxoRS8_GQ4JJoTPipqgS9jWlOHY2K6sr1bUrtDVgpXZQ&s';
    const [showModal, setShowModal] = useState(false);

    const handleViewClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const fileInput = React.useRef();

    const handleFileUploadClick = (event) => {
        event.preventDefault();
        fileInput.current.click();
    };





    const handleFileChange = (e) => {
        setCourse({
            ...course,
            thumbnail: e.target.files[0],
        });
    };


    const [isExpanded, setIsExpanded] = useState(true);

    const toggleDetails = (index) => {
        setTopics(topics.map((topic, i) => {
            if (i === index) {
                return { ...topic, isExpanded: !topic.isExpanded };
            }
            return topic;
        }));
    };
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
    const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
    const isPortrait = useMediaQuery({ orientation: 'portrait' });
    const isRetina = useMediaQuery({ minResolution: '2dppx' });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpens, setModalIsOpens] = useState(false);
    // Function to open the modal
    const openModal = () => {
        setModalIsOpen(true);
    };
    const openModals = () => {
        setModalIsOpens(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const closeModals = () => {
        setModalIsOpens(false);
    };

    const [isActive, setIsActive] = useState(true); // Initial state: active

    const handleToggle = () => {
        setIsActive(!isActive); // Toggle the state
    };

    const [topics, setTopics] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (topics.some(topic => topic.courseTopic === course.courseTopic)) {
            setError(' ⚠️ Topic already exists in this course. Please try with another topic.');
        } else {

            if (course.courseTopic.trim() && course.contentCovered.trim()) {
                setTopics([...topics, {
                    courseTopic: course.courseTopic,
                    contentCovered: course.contentCovered,
                    isExpanded: true
                }]);

                setCourse({
                    title: '',
                    category: '',
                    level: '',
                    duration: '',
                    description: '',
                    thumbnail: null,
                    courseTopic: '',
                    contentCovered: '',
                });
                setError('');
                closeModal();
            } else {
                setError('Please fill in all the fields.');
            }
        }
    };

    return (
        <div className="dashboard"><div>
        <h2>{course.courseTitle}</h2>
        {course.topics.map(topic => (
          <div key={topic.topicId}>
            <h3>{topic.topicName}</h3>
            <p>{topic.topicDescription}</p>
            <ul>
              {topic.materials.map(material => (
                <li key={material.materialId}>
                  {material.materialName} ({material.materialType}) - {material.materialDuration} minutes
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
            <div className='top-nav'>
                <button className="menu-btn" onClick={toggleSideNav}>
                    <FaBars />
                </button>
                <div className='nav-img'>
                    <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcxEF2d6izYkyw940E-26faIrWT4ikbikzQv_IGNA&s'} />
                </div>

                <div className="user-info">

                    {/* <input
            onChange={handleChange}
            type="search"
            placeholder="Search..."
            value={searchTerm}
            className='search-box'
          /> */}
                    <FaSearch className="icon plus-icon" style={{ fontSize: "17px" }} />
                    <FaPlus className="icon plus-icon" style={{ fontSize: "17px" }} />
                    <FaBell className="icon notification-icon" style={{ fontSize: '17px' }} />
                    <FaUser className="icon profile-icon" style={{ fontSize: '17px' }} />

                </div>

            </div>
            <div className={`side-nav ${showSideNav ? 'open' : ''}`}>
                <ul>
                    <li className={activePage === 'home' ? 'active' : ''} onClick={() => handlePageChange('home')}>
                        <FaHome className='icon' /> {/* Icon for Home */}
                        {showSideNav && <span>Home</span>}
                    </li>
                    <li className={activePage === 'course' ? 'active' : ''} onClick={() => handlePageChange('course')}>
                        <FaBookOpenReader className='icon' /> {/* Icon for Submit Request */}
                        {showSideNav && <span>Course</span>}
                    </li>
                    <li
                        className={activePage === 'learner' ? 'active' : ''}
                        onClick={() => handlePageChange('learner')}
                    >
                        <FaUserGraduate className='icon' /> {/* Icon for Tracking */}
                        {showSideNav && <span>Learner</span>}
                    </li>
                    <li className='reports' onClick={() => handlePageChange('reports')}>
                        <FaChartBar className='icon' />
                        {showSideNav && <span>Reports</span>}


                    </li>
                </ul>
                <ul className={`submenu ${showReportDropdown ? 'open' : ''}`}>
                    <li onClick={() => setActivePage('learnerreport')}> Learner Report</li>
                    <li onClick={() => setActivePage('coursereport')}>Course Report</li>
                    <li onClick={() => setActivePage('enroll')}>Enrollment Report</li>
                    <li onClick={() => setActivePage('quiz')}>Quiz Report</li>
                </ul>
            </div>
            {/* ------------------------------------------------------------------------------------ */}

            <div className="course-creation-page" style={{ display: 'grid', width: '100%', height: '100vh' }}>

                <div className="container" style={{ marginTop: '50px', width: '1054px',height:'640px' }}>
                    {/* Rest of your code */}     <div className="form-container" style={{ width: '1010px',height:'600px' }} >
                        <div className="course-creation-form" style={{ width: '900px' }}>
                            <div className="content" style={{ width: '1010px' }}>
                                <main className="main-content" style={{ paddingRight: '80px' }}>
                                    <h1 style={{paddingRight:'410px'}}>HTML Tutorial for Beginners</h1><hr />
                                    <div className="course-details">
                                        <div className="course-header" style={{ marginLeft: '760px' }}>
                                            <FaEdit className="edit-icon" style={{ fontSize: '20px', color: "blue", marginRight: '20px' }} />
                                            <RiDeleteBin5Line className="edit-icon" style={{ fontSize: '20px', color: "red" }} />
                                        </div>
                                        <div className="course-info">
                                            <p style={{ paddingRight: '280px' }}>Course Category <span className="info-value" style={{ paddingLeft: '150px' }}>: Technical</span></p>
                                            <p style={{ paddingRight: '280px' }}>Course Level <span className="info-value" style={{ paddingLeft: '179px' }}>: Beginner</span></p>
                                            <p style={{ paddingRight: '290px' }}>Course Duration <span className="info-value" style={{ paddingLeft: '160px' }}>: 3 Days</span></p>
                                        </div>
                                        <div className="course-description">
                                            <p style={{ paddingLeft: '89px' }}>Course Description<span style={{ paddingLeft: '139px'}}>: Have you ever wanted to learn HTML and CSS but 
                                                                                  it was too <span style={{paddingLeft:'258px'}}>hard or did not have time or money? </span></span>

                                                
                                                    <button
                                                        className="btn"
                                                        style={{
                                                            width: '119px',
                                                            height: '33px',
                                                            color: 'blue',
                                                            backgroundColor: '#D9D9D9',marginLeft:'10px', width: '121px',
                                                            height: '32px',
                                                            gap: '0px',
                                                            borderradius: '4px 0px 0px 0px',
                                                            opacity:' 1'
                                                        }}
                                                        onClick={() => setShowPopup(true)}
                                                    >
                                                        Show More
                                                    </button>

                                                    {showPopup && (
                                                        <div style={{
                                                            position: 'fixed',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            backgroundColor: 'white',
                                                            padding: '20px',
                                                            zIndex: 1000, width: '705px'
                                                        }}><h1>Course Description</h1><hr /><p>
                                                                Have you ever wanted to learn HTML and CSS but thought it was too hard or did not have time or money?
                                                                This step-by-step HTML and CSS course will help you learn coding fast and with an instructor that really cares about his students.
                                                                Learning to code will help you make more money in your job, or even find a better job, or better yet, get a nice job as a web developer.
                                                                HTML and CSS are the foundations you need to get into any programming language.</p><br /><br />

                                                            <button onClick={() => setShowPopup(false)} style={{ backgroundColor: 'red', width: '121px',
  height: '32px',
  gap: '0px',
  borderradius: '4px 0px 0px 0px',
  opacity:' 1',marginLeft:'530px' }}>Close</button>
                                                        </div>
                                                    )}

                                                    {showPopup && (
                                                        <div style={{
                                                            position: 'fixed',
                                                            top: 0,
                                                            bottom: 0,
                                                            left: 0,
                                                            right: 0,
                                                            backgroundColor: 'rgba(0,0,0,0.3)',
                                                            zIndex: 999
                                                        }} onClick={() => setShowPopup(false)} />
                                                    )}
                                                </p>

                                        </div>
                                        <div className="course-dates">
                                            <p style={{ paddingRight: '260px' }}>Course Created <span className="date-value" style={{ paddingLeft: '160px' }}>: 20/05/2022</span></p>
                                            <p style={{ paddingRight: '255px' }}>Course Modified <span className="date-value" style={{ paddingLeft: '160px' }}>: 21/05/2022</span></p>
                                        </div>
                                        <div className="course-thumbnail" style={{ paddingRight: '210px' }}>Course Thumbail

                                            <button className="btn" onClick={handleViewClick} style={{ marginLeft: '160px', backgroundColor: '#D9D9D9', color: 'blue', width: '121px',
  height: '32px',
  gap: '0px',
  borderradius: '4px 0px 0px 0px',
  opacity:' 1' }}>

                                                View
                                            </button>
                                            {showModal && (
                                                <div className="modal">
                                                    <div className="modal-content">
                                                        <img src={imageUrl} alt="Course Thumbnail"></img>
                                                        <button className="close-btn" onClick={handleCloseModal}>
                                                            X
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div><br /><br />
                                        <div className="course-actions">
                                        < a href='/content-creation' style={{textDecoration:'none',color:'white'}}> 
                                        <button
    className={`content-btn ${isActive ? 'active' : 'inactive'}`}
    style={{ backgroundColor: 'blue',marginLeft:'585px'}}
    onClick={CourseCreationForm}
  >
    Content
  </button></a>
  <button
    className={`inactive-btn ${isActive ? 'inactive' : 'active'}`}
    onClick={handleToggle} style={{ width: '123px' }}
  >
    {isActive ? 'Make Inactive' : 'Make Active'}
  </button>
</div></div>

                                </main></div></div></div>
                </div>


            </div>

            {/* ------------------------------------------------------------------------------------ */}


        </div>
    );
};
export default Navbars;