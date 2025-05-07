import { render, screen, fireEvent} from '@testing-library/react';
import App from './App';


test('renders ToDoApp Component', () => {
  const app = render(<App />);
  const heading = app.getByRole('heading')
  expect(heading).toHaveTextContent("Todo")
});
test('renders input and button', () => {
  const app = render(<App />);
  expect(app.getByPlaceholderText('Add A Todo')).toBeInTheDocument()
  expect(app.getByRole('button', {name: 'Add'})).toBeInTheDocument();
})
test('allowes user input', () => {
  const app = render(<App />);
  const input = app.getByPlaceholderText('Add A Todo');

  fireEvent.change(input, {target: {value: 'Dog Food'}});
  expect(input).toHaveValue('Dog Food');
})
test('Add button adds input to list', () => {
  const app = render(<App />);
  const input = app.getByPlaceholderText('Add A Todo');
  const button = app.getByRole('button', {name: 'Add'});

  fireEvent.change(input, {target: {value: "Button Works"}});
  fireEvent.click(button);

  expect(app.getByText('Button Works')).toBeInTheDocument();
})
test('Edit button updates and displays updated value', () => {
  const app = render(<App />);
  const input = app.getByPlaceholderText('Add A Todo');
  const addButton = app.getByRole('button', {name: 'Add'});

  fireEvent.change(input, {target: {value: "Button Works"}});
  fireEvent.click(addButton);

  const editButton = app.getByRole('button', {name: 'Edit'});
  fireEvent.click(editButton)

  const editInput = app.getByPlaceholderText('Edit Todo');
  fireEvent.change(editInput, {target: {value: 'Edit Button Works'}})

  const updateButton = app.getByRole('button', {name: 'Update Todo'})
  fireEvent.click(updateButton)

  expect(app.getByText('Edit Button Works')).toBeInTheDocument();
})