import { render, screen } from '../../tests/test-utils'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import FilterDropdown from './FilterDropdown'

const setUp = () => {
    const filterType = 'genres';
    const filters = {
        genres: [],
        tags: [],
        developers: [],
        publishers: [],
        stores: [],
        platforms: [],
        creators: []
    }

    const handleManageFilters = jest.fn();
    const handleClear = jest.fn();

    const utils = render(
        <FilterDropdown 
        filters={filters} 
        filterType={filterType}
        onManageFilters={handleManageFilters}
        onClear={handleClear} />
    )

    return {
        ...utils,
        handleClear,
        handleManageFilters,
        filters,
        filterType
    }
}

test('should render', () => {
    setUp();

    expect(screen.getByText(/genres/i)).toBeVisible();
    expect(screen.queryByLabelText('filter-menu')).toBeNull();
})

test('the dropdown should be visible after the toggle button is clicked', async () => {
    setUp();

    const openBtn = screen.getByRole('button');
    
    await userEvent.click(openBtn);
    expect(screen.queryByLabelText('filter-menu')).toBeDefined();
})