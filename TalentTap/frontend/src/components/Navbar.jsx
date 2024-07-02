import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Router, Routes, Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';
const Navbar = () => {
	const [isSignUpOpen, setIsSignUpOpen] = useState(false);
	const navigate = useNavigate();
	const handleSignUpClick = () => {
		setIsSignUpOpen(true);
	};

	const handleCloseSignUpClick = () => {
		setIsSignUpOpen(false);
		navigate('/');
	};

	const handleJobsClick=()=>{
		navigate('/view-all-jobs')
	}
	return (
		<>
			<nav className="bg-indigo-700 border-b border-indigo-500">
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="flex h-20 items-center justify-between">
						<div className="flex flex-1 items-center justify-center md:items-stretch">
							<a
								className="flex flex-shrink-0
						items-center mr-4"
								href="/index.html"
							>
								<img
									className="h-10 w-auto"
									src={logo}
									alt="React Jobs"
								/>
								<span className="md:block text-white text-2xl font-bold">
									Talent$Tap
								</span>
							</a>
							<div className="md:ml-auto">
								<div className="flex space-x-2">
									<a
										href="/index.html"
										className="rounded-md py-2 px-2 mt text-white bg-black"
									>
										Home
									</a>
									<button
									onClick={handleJobsClick} 
									className="rounded-md py-2 px-2 mt text-white hover:bg-black contain"
									>
										Jobs
									</button>
									<Link to={'/signup'}>
										<button
											onClick={handleSignUpClick}
											className="rounded-md py-2 px-2 mt text-white hover:bg-black contain"
										>
											SignUp
										</button>
									</Link>
									{isSignUpOpen && (
										<SignUpForm onClose={handleCloseSignUpClick} />
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;