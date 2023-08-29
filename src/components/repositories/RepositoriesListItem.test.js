import { render, screen} from "@testing-library/react"
import RepositoriesListItem from "./RepositoriesListItem"
import { MemoryRouter } from "react-router"

const renderComponent = () => {

  const repository =  {
    full_name: 'facebook/react',
    language: 'Javascript',
    description: "A js library",
    owner: "facebook",
    name: "react",
    html_url: 'https://github.com/facebook/react' 
  }


  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  )
}

test('shows a link to the github homepage for this repository', async () => {
  renderComponent()

 await screen.findByRole('img', { name: /javascript/i });
} )

const pause = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 100)
  })
}