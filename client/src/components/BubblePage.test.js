import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";

import { fetchColors as mockFetchColors } from '../api/fetchColors';
jest.mock('../api/fetchColors');

// display a rerender method, works with props
test("Fetches data and renders the bubbles", () => {
  const { rerender } = render(
    <BubblePage />
  )
  expect(screen.queryAllByTestId("bubble-component")).toHaveLength(0)
  
  // Commented out because no props..
  // rerender(<BubblePage />)
  // expect(screen.queryAllByTestId("bubble-component")).toHaveLength(2);
});

// displaying async call method with mock data. Doesn't work because /api/fetchColors is not
// working inside of the BubblePage component for some reason.... Probably has to do with returning
// res.data made with an axiosWithAuth call, but it shouldnt? Who knows..
// This fails now, but should pass once fetchColors is working properly inside of BubblePage.js
test("Fetches data and renders the bubbles with async", async () => {
  mockFetchColors.mockResolvedValueOnce({
    data: [
      {
        color: "aliceblue",
        code: {
          hex: "#f0f8ff"
        },
        id: 1
      },
      {
        color: "limegreen",
        code: {
          hex: "#99ddbc"
        },
        id: 2
      },
    ]
  })
  render(<BubblePage />)
  await waitFor(() => {
    expect(screen.queryAllByTestId("bubble-component")).toHaveLength(2);
  })
});


// const dummyData = [
//   {
//     color: "aliceblue",
//     code: {
//       hex: "#f0f8ff"
//     },
//     id: 1
//   },
//   {
//     color: "limegreen",
//     code: {
//       hex: "#99ddbc"
//     },
//     id: 2
//   },
// ]