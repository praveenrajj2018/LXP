import axios from 'axios';

const API_URL = ''; // replace with your API URL

export const createCourse = async (course) => {
    try {
        const response = await axios.post(`${API_URL}/courses`, course);
        return response.data;
    } catch (error) {
        console.error('Error creating course', error);
        throw error;
    }
};

export const updateCourse = async (courseId, course) => {
    try {
        const response = await axios.put(`${API_URL}/courses/${courseId}`, course);
        return response.data;
    } catch (error) {
        console.error(`Error updating course with ID ${courseId}`, error);
        throw error;
    }
};

export const deleteCourse = async (courseId) => {
    try {
        const response = await axios.delete(`${API_URL}/courses/${courseId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting course with ID ${courseId}`, error);
        throw error;
    }
};
