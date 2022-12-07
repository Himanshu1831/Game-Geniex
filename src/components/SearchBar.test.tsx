import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import SearchBar from './SearchBar';

const setUp = () => {
    const handleChange = jest.fn();

    const utils = render(
    <SearchBar 
        search=''
        handleChange={handleChange} />
    )

    const input = screen.getByLabelText('search');

    return {
        ...utils,
        input,
        handleChange
    }
}

test('should render', () => {
    const { container } = setUp();
    expect(container.firstChild).toBeDefined()
})

test('handler is called when user is typing input', async () => {
    const { handleChange, input } = setUp();

    await userEvent.type(input, 'hello');
    expect(handleChange).toBeCalledTimes(5);
})