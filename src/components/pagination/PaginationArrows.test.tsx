import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import PaginationArrows from './PaginationArrows'

const setUp = () => {
    const handleNext = jest.fn();
    const handlePrevious = jest.fn();

    const utils = render(
    <PaginationArrows 
    onNext={handleNext} 
    onPrevious={handlePrevious} 
    totalCount={50} 
    page={1} />
    )

    const previousBtn = screen.getByTestId('previousBtn')
    const nextBtn = screen.getByTestId('nextBtn')

    return {
        ...utils,
        handleNext,
        handlePrevious,
        nextBtn,
        previousBtn
    }
}

test('should render', () => {
    const { container } = setUp();
    expect(container.firstChild).toBeDefined();
})

test(`should call handler when next arrow is clicked
and current items displayed is less than total count`, async () => {
    const { nextBtn, handleNext } = setUp();

    await userEvent.click(nextBtn);
    expect(handleNext).toBeCalledTimes(1)
})

test(`should disable nextBtn when total count is less than or equal to 10`, async () => {
    const { rerender, handleNext, handlePrevious, nextBtn } = setUp();

    rerender(
    <PaginationArrows 
    onNext={handleNext} 
    onPrevious={handlePrevious} 
    totalCount={10} 
    page={1} />)

    expect(nextBtn).toHaveAttribute('disabled');

    rerender(
        <PaginationArrows 
        onNext={handleNext} 
        onPrevious={handlePrevious} 
        totalCount={5} 
        page={1} />)

    expect(nextBtn).toHaveAttribute('disabled');
})

test('should call handler when previous arrow is clicked', async () => {
    const { previousBtn, handlePrevious } = setUp();

    await userEvent.click(previousBtn);
    expect(handlePrevious).toBeCalledTimes(1)
})