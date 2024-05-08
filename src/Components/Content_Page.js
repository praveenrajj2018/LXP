import React, { useState } from 'react'
import { FaBars, FaBookOpenReader } from "react-icons/fa6";
import { FaSearch, FaUserGraduate, FaHome, FaChartBar } from "react-icons/fa";
import Draggable from 'react-draggable';
import { FaPlus, FaBell, FaUser, FaChevronUp } from 'react-icons/fa';
import { FaPlay, FaVideo, FaMusic, FaFilePdf, FaFilePowerpoint, FaFileAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import Modal from 'react-modal';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { CiYoutube } from "react-icons/ci";
import { IoIosWarning } from "react-icons/io";
import '../Styles/Content_Page.css'
import { BsFiletypePdf, BsFiletypePpt } from "react-icons/bs";
import { CiMusicNote1 } from "react-icons/ci";
import Navbars from './Course_Description';
import App from '../App';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
//import {Navbars} from './Course_Description';
//import { createCourse, updateCourse, deleteCourse } from '../utils/Content_Page';
const CourseCreationForm = () => {
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
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      // Fetch the courses data from your API here
      // For example:
      fetch('/api/courses')
        .then(response => response.json())
        .then(data => setCourses(data.data));
    }, []);
    let navigate = useNavigate();

    const navigateToCourseCreationForm = () => {
        navigate.push('/content-creation');
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

    const useLocalStorage = (key, initialValue) => {
        const [storedValue, setStoredValue] = useState(() => {
          try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
          } catch (error) {
            console.log(error);
            return initialValue;
          }
        });
      
        const setValue = value => {
          try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          } catch (error) {
            console.log(error);
          }
        };
      
        return [storedValue, setValue];
      };
      
      // Usage:
      const [topics, setTopics] = useLocalStorage('topics', []);
      

    //const [topics, setTopics] = useState([]);
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
        
        <div className="dashboard"> <div>
        {courses.map(course => (
          <Navbars key={course.courseId} course={course} />
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

            <div className="course-creation-page" style={{ display: 'grid', width: '100%', height: '100vh', width: isDesktopOrLaptop ? '100%' : '100vw', width: isBigScreen ? '100%' : '100vw', width: isTabletOrMobile ? '100%' : '100vw', width: isPortrait ? '100%' : '100vw', width: isRetina ? '100%' : '100vw' }}>
              
                <div className="container" style={{ marginTop: '50px', width: '1054px', height: '505px' }}>
                    {/* Rest of your code */}     <div className="form-container" style={{ width: '1010px' }} >
                        <div className="course-creation-form" style={{ width: '900px' }}>
                            <div className="content" style={{ width: '1010px' }}>
                                <main className="main-content">
                                    <h1 style={{ paddingRight: '485px' }}>HTML Tutorial for Beginner</h1><hr /><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h2>Topics</h2>
                                        <button className="add-topic-btn" style={{ borderRadius: '6px' }} onClick={openModal}><b>Add Topics</b></button>
                                    </div>
                                    <hr></hr>

                                    {topics.map((topic, index) => (
                                        <div className="course-section" key={index}>
                                            <div className="section-header">
                                                <h4 className="toggle-button" onClick={() => toggleDetails(index)} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>{topic.courseTopic}</span>
                                                    <span>{topic.isExpanded ? <FaChevronUp /> : <FaChevronDown />}</span>
                                                </h4>
                                            </div>
                                            {topic.isExpanded && (
                                                <div className="course-section">
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'self-start', marginTop: '10px' }}>
                                                        <p><b>Content Covered:</b>
                                                            <ul>
                                                                {topic.contentCovered.split(',').map((content, index) => (
                                                                    <li key={index}>{content}</li>
                                                                ))}
                                                            </ul>
                                                        </p>
                                                        <div className="icons">
                                                            <CiYoutube className="icon" style={{ color: 'blue', fontSize: '20px' }} />
                                                            <CiMusicNote1 className="icon" style={{ color: 'blue' }} />
                                                            <BsFiletypePdf className="icon" style={{ color: 'red' }} />
                                                            <BsFiletypePpt className="icon" style={{ color: 'red' }} />
                                                            <FaFileAlt className="icon" style={{ color: 'red' }} />
                                                            <FaEdit className="icon" style={{ color: 'blue' }} />
                                                            <FaTrash className="icon" style={{ color: 'red' }} />
                                                        </div>
                                                    </div>
                                                    <p>No Content is available. Add content to display</p>
                                                    <a href='#' style={{ textDecoration: 'none', color: 'blue' }} onClick={openModals}>Add Content</a>
                                                </div>
                                            )}
                                            <hr />
                                        </div>
                                    ))}

                                </main></div></div></div>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Add Topic"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '30%',
                            height: 'auto',
                            padding: '20px',
                            overflow: 'hidden'
                        }
                    }}
                >{error && <div style={{
                    border: '1px solid #E01950',
                    backgroundColor: '#FFDBDB',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px'
                }}><p style={{ color: 'red' }}>{error}</p></div>}
                    <h2>Add Topic</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Course Topic:
                            <input type="text" name="courseTopic" value={course.courseTopic} required onChange={handleChange} style={{ width: '410px' }} />
                            {course.title === '' && <span className="warning"><h5 ><IoIosWarning style={{ fontSize: '20px', color: 'orange', marginRight: '7px' }} /> Make sure that topic does not already exist.</h5></span>}
                        </label><br></br>
                        <label>
                            Content Covered:
                            <input type="text" name="contentCovered" value={course.contentCovered} required onChange={handleChange} style={{ width: '410px' }} />
                        </label>
                        <button className="btn btn-danger btn-size" onClick={closeModal}>Cancel</button>
                        <button className="btn btn-primary btn-size" type="submit" >Add</button>
                    </form>
                </Modal>
                {/* ------------------------------------------------------------------------------------- */}
                <Modal
                    isOpen={modalIsOpens}
                    onRequestClose={closeModals}
                    contentLabel="Add Topic"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '35%',
                            height: 'auto',
                            padding: '20px',
                            overflow: 'hidden'
                        }
                    }}
                >
                    <h2>Choose Content Type</h2>

                    <div className="content-options">
                        <button className="content-btn" style={{
                            fontSize: '15px', width: ' 82px', backgroundColor: '#D9D9D9', color: 'black',
                            height: '91px',
                            top: '414px',
                            left: '465px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }}><CiYoutube style={{ fontSize: '23px', color: 'blue' }} /> VIDEOS</button>
                        <button className="content-btn" style={{
                            fontSize: '15px', width: ' 82px', backgroundColor: '#D9D9D9', color: 'black',
                            height: '91px',
                            top: '414px',
                            left: '465px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }}><CiMusicNote1 style={{ fontSize: '23px', color: 'blue' }} /> AUDIO</button>
                        <button className="content-btn" style={{
                            fontSize: '15px', width: ' 82px', backgroundColor: '#D9D9D9', color: 'black',
                            height: '91px',
                            top: '414px',
                            left: '465px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }}><BsFiletypePdf style={{ fontSize: '23px', color: 'red' }} /> PDF</button>
                        <button className="content-btn" style={{
                            fontSize: '15px', width: ' 82px', backgroundColor: '#D9D9D9', color: 'black',
                            height: '91px',
                            top: '414px',
                            left: '465px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }}><BsFiletypePpt style={{ fontSize: '23px', color: 'red' }} /> PPT</button>
                        <button className="content-btn" style={{
                            fontSize: '15px', width: ' 82px', backgroundColor: '#D9D9D9', color: 'black',
                            height: '91px',
                            top: '414px',
                            left: '465px',
                            gap: '0px',
                            borderradius: '4px 0px 0px 0px',
                            opacity: '0px'
                        }}><FaFileAlt style={{ fontSize: '23px', color: 'red' }} /> TEXT</button>
                    </div>

                </Modal>

            </div>

            {/* ------------------------------------------------------------------------------------ */}


        </div>
    );
};
export default CourseCreationForm;
