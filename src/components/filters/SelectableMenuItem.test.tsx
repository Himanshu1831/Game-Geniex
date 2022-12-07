import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import SelectableMenuItem from './SelectableMenuItem';

const setUp = () => {
    const handleSelect = jest.fn();
    
    const utils = render(
        <SelectableMenuItem 
        name='action' 
        id={1} 
        isSelected={false} 
        onSelect={handleSelect} />
    )

    return {
        ...utils,
        handleSelect
    }
}

test('should render', () => {
    setUp();
    expect(screen.getByText(/action/i)).toBeVisible();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
})

test('handler is called when menu item is selected', async () => {
    const { handleSelect } = setUp();
    
    const menuItem = screen.getByLabelText('menu-item');
    
    await userEvent.click(menuItem);
    expect(handleSelect).toBeCalledTimes(1);
})

test('checkbox should be checked if the menu item is selected', async () => {
    render(<SelectableMenuItem 
        name='action' 
        id={1} 
        onSelect={jest.fn()} 
        isSelected={true} />
    )

    expect(screen.getByRole('checkbox')).toBeChecked();
})