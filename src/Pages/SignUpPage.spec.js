import SignUpPage from "./SignUpPage";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Sign Up Page", () => {
    /**
     * Tests Layout elements
     */
    describe ("Layout", () => {
        /**
         * Test header
         */
        it("has header", () => {
            render(<SignUpPage />);
            const header = screen.queryByRole("heading", {name: "Sign Up"});
            expect(header).toBeInTheDocument();
        });
        
        /**
         * Tests if username input is in the document
         */
        it("has usermame input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Username");
            expect(input).toBeInTheDocument();
        });

        /**
         * Tests if email input is in the document
         */
         it("has email input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("E-mail");
            expect(input).toBeInTheDocument();
        });

        /**
         * Tests if password input is in the document
         */
        it("has password input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password");
            expect(input).toBeInTheDocument();
        });

        /**
         * Tests if password input is in masked
         */
        it("has password input masked", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password");
            expect(input.type).toBe("password");
        });

        /**
         * Tests if password confirm input is in the document
         */
         it("has password confirm input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password Confirm");
            expect(input).toBeInTheDocument();
        });

        /**
        * Tests if password confirm input is in masked
        */
        it("has password confirm input masked", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password Confirm");
            expect(input.type).toBe("password");
        });

        /**
        * Test Sign in button
        */
        it("has sign in button", () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", {name: "Sign Up"});
            expect(button).toBeInTheDocument();
        });
        /**
        * Test Sign in button is disabled initially
        */
         it("has sign in button disabled initially", () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", {name: "Sign Up"});
            expect(button).toBeDisabled();
        });
    });
    describe("Form Interactions", () => {

        it("enables button when password and confirmation values are the same", () => {
            render(<SignUpPage />);
            const password = screen.getByLabelText("Password");
            const passwordConfirm = screen.getByLabelText("Password Confirm");
            const button = screen.queryByRole("button", {name: "Sign Up"});
            userEvent.type(password, "P4ssword");
            userEvent.type(passwordConfirm, "P4ssword");
            expect(button).toBeEnabled();
        });

        it("sends form after clicking the button", () => {
            render(<SignUpPage />);
            const usernameInput = screen.getByLabelText("Username");
            const emailInput = screen.getByLabelText("E-mail");
            const password = screen.getByLabelText("Password");
            const passwordConfirm = screen.getByLabelText("Password Confirm");
            const button = screen.queryByRole("button", {name: "Sign Up"});

            userEvent.type(usernameInput, "user1");
            userEvent.type(emailInput, "test@example.com");
            userEvent.type(password, "P4ssword");
            userEvent.type(passwordConfirm, "P4ssword");

            const mockFn = jest.fn();
            //axios.post = mockFn;
            window.fetch = mockFn

            userEvent.click(button)

            const firstCallMockFunction = mockFn.mock.calls[0];
            const body = JSON.parse(firstCallMockFunction[1].body);
            expect(body).toEqual({
                username   : "user1",
                email       : "test@example.com",
                password    : "P4ssword",
            })
            
        });
    });
});