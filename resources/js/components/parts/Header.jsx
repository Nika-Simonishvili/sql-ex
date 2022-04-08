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

	return (

			<Navbar color="dark" dark  >
				<NavbarBrand href="/">Laravel Eloquent exercises</NavbarBrand>
				<NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink href="/">Questions</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/login">Login</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/logout">Logout</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/register">Register</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>

	);
}

export default Header;
