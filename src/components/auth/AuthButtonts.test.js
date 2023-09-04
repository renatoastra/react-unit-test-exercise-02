import {  render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {createServer} from "../../test/server"
import AuthButtons from "./AuthButtons";
import { SWRConfig } from "swr";


const renderComponenet = async () => {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  )
  await screen.findAllByRole("link")
}


describe("when the user is not signed in", () => {
  createServer([
    {
      path: "/api/user/",
      res: () => {
        console.log("NOT LOGGED IN RESPONSE")
        return {user: null}
      }
    }
  ])

  test("sign in and sign up buttons are visible", async () => {
    await renderComponenet()
    const signInButton = screen.getByRole("link", {name: /sign in/i})
    const signUpButton = screen.getByRole("link", {name: /sign up/i})

    expect(signInButton).toBeInTheDocument()
    expect(signInButton).toHaveAttribute("href", "/signin")
    expect(signUpButton).toBeInTheDocument()
    expect(signUpButton).toHaveAttribute("href", "/signup")


  })
  test("sign out is not visible", async () => {
    await renderComponenet()
    const signOutButton = screen.queryByRole("link", {name: /sign out/i})
    expect(signOutButton).not.toBeInTheDocument()
  })
})

describe("when the user is signed in", () => {

  createServer([
    {
      path: '/api/user',
      res: () => {
        console.log("LOGGED IN RESPONSE")
        return { user: { id:1, email: "felipeloiro@gmail.com"} }
      },
    },
  ]);

  test("sign in and sign up buttons are not shown", async () => {
    await renderComponenet()
    const signInButton = screen.queryByRole("link", {name: /sign in/i})
    const signUpButton = screen.queryByRole("link", {name: /sign up/i})

    expect(signInButton).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument(); 

  })
  test("sign out button is shown", async () => {
    await renderComponenet()
    const signOutButton = screen.getByRole("link", {name: /sign out/i})
    expect(signOutButton).toBeInTheDocument()
    expect(signOutButton).toHaveAttribute("href", "/signout")
  })
})




