import { render, screen } from '../../tests/test-utils'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import useGameElements from '../../utils/hooks/useGameElements'
import FilterMenuContent, { FilterHeader } from './FilterMenuContent'
import { ItemsPerPage } from '../pagination'

const mockedUseGameElements = useGameElements as jest.Mock<any>

jest.mock('../../utils/hooks/useGameElements');

const mockData = [{
    id: 1,
    name: 'Action',
    slug: 'action'
},
{
    id: 2,
    name: 'Adventure',
    slug: 'adventure'
},
{
    id: 3,
    name: 'Shooter',
    slug: 'shooter'
}]


describe('Filter Menu Content', () => {
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
    
        const handleManageFilters = jest.fn();
        const handleClear = jest.fn();
    
        const utils = render(<FilterMenuContent
            filterType='genres'
            filters={filters} 
            onClear={handleClear}
            onManageFilters={handleManageFilters}
            />)
    
        return {
            ...utils, 
            filters,
            handleClear,
            handleManageFilters
        }
    }

    it('should display header, menu items and pagination', () => {
        mockedUseGameElements
        .mockImplementation(() => ({
            data: {
                count: 0,
                results: mockData,
            },
            isFetching: false,
            page: 1,
            setPage: jest.fn()
        }))
    
        const { container } = setUp();
        expect(container.firstChild).toBeDefined();
    
        expect(screen.getByLabelText('header')).toBeVisible();
        expect(screen.getAllByLabelText('menu-item')).toHaveLength(mockData.length);
        expect(screen.getByLabelText('pagination')).toBeVisible();
    })
    
    it('should display skeletons while data is being fetched', () => {
        mockedUseGameElements
        .mockImplementation(() => ({
            data: {},
            isFetching: true,
            page: 1,
            setPage: jest.fn()
        }))
    
        setUp();
        expect(screen.getAllByLabelText('menu-item-skeleton')).toHaveLength(ItemsPerPage);
        expect(screen.getByLabelText('pagination-skeleton')).toBeVisible()
    })
})

d