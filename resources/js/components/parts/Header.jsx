import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Navbar,
	NavItem,
	NavbarToggler,
	Collapse,
	NavLink,
	Nav,
	NavbarBrand
} from 'reactstrap';

function Header() {

	// Collapse isOpen State
	const [isOpen, setIsOpen] = React.useState(false);
    const username = JSON.parse(localStorage.getItem('username'));

	return (

			<Navbar color="dark" dark  >
				<NavbarBrand href="/">{username ? username : (<p>Laravel Eloquent exercises</p>)}</NavbarBrand>
				<NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink href="/">Questions</NavLink>
						</NavItem>
                        {!username ?(
                            <>
                                <NavItem>
                                    <NavLink href="/register">Register</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/login">Login</NavLink>
                                </NavItem>
                            </>
                        ):(
                            <>
                                <NavItem>
                                    <NavLink href="/password-change">Change password</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/logout">Logout</NavLink>
                                </NavItem>
                            </>
                        )}
						</Nav>
				</Collapse>
			</Navbar>

	);
}

export default Header;
