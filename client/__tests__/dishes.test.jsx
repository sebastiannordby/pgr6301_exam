import { createRoot } from "react-dom/client";
import { DishesPage } from "../pages/dishes";
import { act } from "react-dom/test-utils";
import React from "react";

describe("List dishes", () => {
  it("Shows list of dishes", async () => {
    const element = document.createElement("div");
    const root = createRoot(element);

    await act(async () => {
      root.render(<DishesPage></DishesPage>);
    });

    expect(element.innerHTML).toMatchSnapshot();
  });
});
