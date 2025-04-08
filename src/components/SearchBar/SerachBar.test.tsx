import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

test("renders search bar and handles input", () => {
  const mockOnSearch = jest.fn(); // Mock function to simulate search
  render(<SearchBar onSearch={mockOnSearch} />);

  // Check if the input is rendered
  const input = screen.getByPlaceholderText(/search for recipes/i);
  expect(input).toBeInTheDocument();

  // Simulate user typing in the search input
  fireEvent.change(input, { target: { value: "chicken" } });
  expect(input).toHaveValue("chicken");

  // Simulate clicking the search button
  const button = screen.getByText(/search/i);
  fireEvent.click(button);

  // Check if the mock function was called with the correct argument
  expect(mockOnSearch).toHaveBeenCalledWith("chicken");
});
