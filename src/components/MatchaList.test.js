import { render, screen } from "@testing-library/react";
import MatchaList from "./MatchaList";

const dummyDrinks = [
  {
    id: 1,
    name: "Classic Matcha",
    origin: "Japan",
    description: "Smooth and creamy",
    price: 5.0,
  },
];

test("renders matcha drink item", () => {
  render(<MatchaList matchaDrinks={dummyDrinks} setMatchaDrinks={() => {}} />);
  const drinkName = screen.getByText(/Classic Matcha/i);
  expect(drinkName).toBeInTheDocument();
});

test("renders 'no drinks found' when list is empty", () => {
  render(<MatchaList matchaDrinks={[]} setMatchaDrinks={() => {}} />);
  const noDrinksMsg = screen.getByText(/no matcha drinks found/i);
  expect(noDrinksMsg).toBeInTheDocument();
});
