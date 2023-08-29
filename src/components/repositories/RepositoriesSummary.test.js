import {screen, render } from "@testing-library/react"
import RepositoriesSummary from "./RepositoriesSummary"

test('display the primary language of the repository', ()=> {
  const repository = {
    stargazers_count: 100,
    open_issues: 10,
    forks: 20,
    language: "TypeScript"
  }
  render(<RepositoriesSummary repository={repository} />)
  expect(screen.getByText("TypeScript")).toBeInTheDocument()
})