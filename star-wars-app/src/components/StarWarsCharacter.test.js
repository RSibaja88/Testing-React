import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { getData as mockGetData } from '../api';
import StarWarsCharacters from "./StarWarsCharacters";


jest.mock('../api');

test('Renders SW Character List and buttons', async () => {
    mockGetData.mockResolvedValueOnce({
        id: 1,
        next: 'https://swapi.co/api/people/?page=2',
        results: [
            {
                name: 'Luke Skywalker', url: 'test'
            }]})

    const { getByText } = render(<StarWarsCharacters />);

    const prevButt = getByText(/previous/i);
    const nextButt = getByText(/next/i);

    fireEvent.change(prevButt);
    fireEvent.change(nextButt);

    expect(mockGetData).toHaveBeenCalledTimes(1);

    wait(() => getByText(/prevButt/i));
    wait(() => getByText(/nextButt/i));
});
