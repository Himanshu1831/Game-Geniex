import { render, screen } from '../../tests/test-utils'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import FilterDrawer from './FilterDrawer'

const setUp = () => {
    const filters = {
        genres: [],
        tags: [],
        developers: [],
        publishers: [],
        stores: [],
        platforms: [],
        creators: []
    }

    const handleDrawerToggle = jest.fn();
    const handleManageFilters = jest.fn();
    const handleClear = jest.fn();

    const utils = render(
    <FilterDrawer 
    filters={filters} 
    open={true}
    handleDrawerToggle={handleDrawerToggle}
    onManageFilters={handleManageFilters}
    onClear={handleClear} />
    )

    return {
        ...utils,
        handleClear,
        handleDrawerToggle,
        handleManageFilters,
        filters
    }
}

test('should display all filter types', () => {
    const { filters } = setUp();
    
    expect(screen.getByRole('heading')).toHaveTextContent(/filter by/i );
    expect(screen.getAllByLabelText('filter-type')).toHaveLength(Object.keys(filters).length);
})

test('should display menu content when clicking on a filter type', async () => {
    const { getByRole } = setUp();

    const genres = getByRole('button', { name : /Genres/i });
    expect(genres).toBeDefined();

    await userEvent.click(genres);

    expect(screen.queryAllByLabelText('filter-type')).toHaveLength(0);

    expect(screen.getByRole('heading')).toHaveTextContent(/filter by: genres/i );
    expect(screen.getByLabelText('filter-menu')).toBeInTheDocument();
})

test('handler is called when back button (chevron) is clicked while on filter type page', async () => {
    const { handleDrawerToggle } = setUp();

    const backBtn = screen.getByLabelText('backBtn');
    await userEvent.click(backBtn);
    expect(handleDrawerToggle).toBeCalledTimes(1)
})

test(`should go back to filter types when back button (chevron) is clicked while 
on a filter's page`, async () => {
    const { getByRole, filters, handleDrawerToggle } = setUp();

    const genres = getByRole('button', { name : /Genres/i });
    const backBtn = screen.getByLabelText('backBtn');

    await userEvent.click(genres);
    expect(screen.getByRole('heading')).toHaveTextContent(/filter by: genres/i );
    expect(screen.getByLabelText('filter-menu')).toBeInTheDocument();
    expect(screen.queryAllByLabelText('filter-type')).toHaveLength(0);

    await userEvent.click(backBtn);
    expect(handleDrawerToggle).toBeCalledTimes(0);
    expect(screen.getByRole('heading')).toHaveTextContent(/filter by/i );
    expect(screen.queryByLabelText('filter-menu')).not.toBeInTheDocument();
    expect(screen.queryAllByLabelText('filter-type')).toHaveLength(Object.keys(filters).length);
})