import "@testing-library/jest-dom";

//	TODO: mock fetches?
/*
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: "mocked data" }),
  })
);
*/

//	TODO: mocks handling before/after each test?
/*
import { beforeEach, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

beforeEach(() => {
  console.log("Test is starting...");
});

afterEach(() => {
  cleanup(); // Cleans up DOM after each test
  console.log("Test finished.");
});
*/
