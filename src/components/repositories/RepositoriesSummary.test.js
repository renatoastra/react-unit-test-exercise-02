import {screen, render } from "@testing-library/react"
import RepositoriesSummary from "./RepositoriesSummary"

test('display the primary language of the repository', ()=> {
  const repository = {
    stargazers_count: 100,
    open_issues: 30,
    forks: 20,
    language: "TypeScript"
  }
  render(<RepositoriesSummary repository={repository} />)

  for (let key in repository) {
    const value = repository[key]
    const element = screen.getByText(new RegExp(value))
    expect(element).toBeInTheDocument()
  }
})