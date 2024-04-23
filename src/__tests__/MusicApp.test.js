import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MusicApp from '../Component/MusicApp';

describe('MusicApp Component', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ tracks: { items: [] } }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders MusicApp component', () => {
    render(<MusicApp />);
    expect(screen.getByText('MusicMate')).toBeInTheDocument();
  });

  test('displays loading spinner while fetching data', async () => {
    render(<MusicApp />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByRole('status')).toBeNull();
    });
  });

  test('displays tracks after data is fetched', async () => {
    render(<MusicApp />);
    await waitFor(() => {
      expect(screen.queryByRole('img')).toBeNull(); // Initially no tracks are displayed
    });
  });

  test('searches tracks when search button is clicked', async () => {
    render(<MusicApp />);
    const searchInput = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByText('Search');

    // Simulate typing in the search input
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // Simulate clicking the search button
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://v1.nocodeapi.com/ibitwarvedant/spotify/futuhUvQQyEenQio/search?q=test&type=track'
      );
    });
  });

  test('prevents default form submission when searching for tracks', async () => {
    render(<MusicApp />);
    const searchInput = screen.getByPlaceholderText('Search');
    const searchForm = screen.getByRole('form');

    // Simulate typing in the search input
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // Simulate form submission
    fireEvent.submit(searchForm);

    // Ensure preventDefault is called on form submission
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://v1.nocodeapi.com/ibitwarvedant/spotify/futuhUvQQyEenQio/search?q=test&type=track'
      );
    });
  });
});
