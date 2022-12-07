import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import ImageSlider from './ImageSlider'

/* jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
})) */

const setUp = () => {
    const images = [
        {
            id: 0,
            image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
        },
        {
            id: 1,
            image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
        },
        {
            id: 2,
            image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
        },
        {
            id: 3,
            image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
        },
        {
            id: 4,
            image: 'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg',
        },

    ]
    const utils = render(<ImageSlider width='100%' images={images} />)
    const nextBtn = screen.getByTestId('nextBtn');
    const previousBtn = screen.getByTestId('previousBtn');

    return { 
        ...utils,
        nextBtn,
        previousBtn,
    }
}

test('should move to next image when next button is clicked', async () => {
    const { nextBtn } = setUp();

    expect(screen.getByText(/1/i)).toBeVisible();

    await userEvent.click(nextBtn);
    expect(screen.getByText(/2/i)).toBeVisible();
})

test('should stay at current image when next button is clicked with no remaining images', async () => {
    const { nextBtn } = setUp();

    expect(screen.getByText(/1/i)).toBeVisible();

    await userEvent.click(nextBtn);
    await userEvent.click(nextBtn);
    await userEvent.click(nextBtn);
    await userEvent.click(nextBtn);
    expect(screen.getByText(/5/i)).toBeVisible();

    await userEvent.click(nextBtn);
    expect(screen.getByText(/5/i)).toBeVisible();
})

test('should move to the previous image when previous button is clicked', async () => {
    const { nextBtn, previousBtn } = setUp();

    expect(screen.getByText(/1/i)).toBeVisible();

    await userEvent.click(nextBtn);
    expect(screen.getByText(/2/i)).toBeVisible();

    await userEvent.click(previousBtn);
    expect(screen.getByText(/1/i)).toBeVisible();
})

test('should stay at first image when previous buttn is clicked while at first image', async () => {
    const { previousBtn } = setUp();

    expect(screen.getByText(/1/i)).toBeVisible();

    await userEvent.click(previousBtn);
    expect(screen.getByText(/1/i)).toBeVisible();
})