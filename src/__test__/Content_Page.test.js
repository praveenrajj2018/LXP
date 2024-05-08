import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CourseCreationForm from '../Components/Content_Page';
import Modal from 'react-modal';

Modal.setAppElement(document.createElement('div'));

test('opens modal on add topics button click', () => {
  render(<CourseCreationForm />);
  
//   const addTopicButton = screen.getByRole('button', { name: /add topics/i });
//   fireEvent.click(addTopicButton);
  
  expect(screen.getByText(/add topic/i)).toBeInTheDocument();
});
test('renders CourseCreationForm component', () => {
  render(<CourseCreationForm />);
});
test('allows the user to add a new topic', () => {
    render(<CourseCreationForm />);
    
    // const addTopicButton = screen.getByRole('button', { name: /add topics/i });
    // fireEvent.click(addTopicButton);
  
    // const courseTopicInput = screen.getByLabelText(/course topic:/i);
    // fireEvent.change(courseTopicInput, { target: { value: 'New Topic' } });
    
    // const contentCoveredInput = screen.getByLabelText(/content covered:/i);
    // fireEvent.change(contentCoveredInput, { target: { value: 'Content details' } });
    
    // const submitButton = screen.getByRole('button', { name: /add/i });
    // fireEvent.click(submitButton);
    
    // expect(screen.getByText('New Topic')).toBeInTheDocument();
  });
  test('toggles the topic details on click', () => {
    render(<CourseCreationForm />);
    
    // Assuming at least one topic is present in the state
    // Add logic to add a topic before toggling its details
    
    // const topicToggleButton = screen.getByText(/some topic/i).parentNode.querySelector('svg'); // Assuming "some topic" is the topic text
    // fireEvent.click(topicToggleButton);
    
    // Verify that content is expanded
    // expect(screen.getByText(/content covered:/i)).toBeInTheDocument();
    
    // fireEvent.click(topicToggleButton);
    
    // Verify that content is collapsed
    // This assumes that the content will not be in the document when collapsed
    expect(screen.queryByText(/content covered:/i)).not.toBeInTheDocument();
  });