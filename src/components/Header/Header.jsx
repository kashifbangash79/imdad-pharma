import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNavLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <header className="shadow sticky z-50 top-0 bg-white">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 max-w-screen-xl mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <Link to="/" className="flex items-center">
            <p className="text-xl font-bold text-red-600 tracking-wider">
              IMDAD
            </p>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/logout"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Log Out
            </Link>
            <button
              data-collapse-toggle="mobile-menu"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={handleToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`w-full lg:flex lg:w-auto ${isOpen ? "block" : "hidden"} lg:order-1 lg:flex-grow`}
            id="mobile-menu"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-6 lg:mt-0">
              <li>
                <NavLink
                  to="/home"
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/purchase"
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Purchase
                </NavLink>
              </li>
              <li className="relative group">
                <NavLink
                  to="#"
                  className="block py-2 pr-4 pl-3 duration-200 text-gray-700 hover:text-orange-700"
                  onClick={(e) => e.preventDefault()} // Prevent default navigation
                >
                  Payments <span className="ml-2 text-gray-500">&#9660;</span>
                </NavLink>
                <ul className="absolute left-0 hidden mt-2 space-y-2 bg-white text-gray-700 shadow-lg rounded-lg group-hover:block z-10">
                  <li>
                    <NavLink
                      to="/payment"
                      onClick={handleNavLinkClick}
                      className={({ isActive }) =>
                        `block py-2 px-4 duration-200 ${
                          isActive ? "text-orange-700" : "text-gray-700"
                        } hover:bg-gray-50`
                      }
                    >
                      Recieved Payment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/sendPayment"
                      onClick={handleNavLinkClick}
                      className={({ isActive }) =>
                        `block py-2 px-4 duration-200 ${
                          isActive ? "text-orange-700" : "text-gray-700"
                        } hover:bg-gray-50`
                      }
                    >
                      Send Payment
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/AgentPayment"
                      onClick={handleNavLinkClick}
                      className={({ isActive }) =>
                        `block py-2 px-4 duration-200 ${
                          isActive ? "text-orange-700" : "text-gray-700"
                        } hover:bg-gray-50`
                      }
                    >
                      Agent Payment
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink
                  to="/Frieghtdetail"
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Freight Detail
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/stockhouse"
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Stockhouse
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Customer"
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Customers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Recovery"
                  onClick={handleNavLinkClick}
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Recovery
                </NavLink>
              </li>
              <li className="relative group">
                <NavLink
                  to="#"
                  className="block py-2 pr-4 pl-3 duration-200 text-gray-700 hover:text-orange-700"
                  onClick={(e) => e.preventDefault()} // Prevent default navigation
                >
                  Expenses <span className="ml-2 text-gray-500">&#9660;</span>
                </NavLink>
                <ul className="absolute left-0 hidden mt-2 space-y-2 bg-white text-gray-700 shadow-lg rounded-lg group-hover:block z-10">
                  <li>
                    <NavLink
                      to="/dailyExpenses"
                      onClick={handleNavLinkClick}
                      className={({ isActive }) =>
                        `block py-2 px-4 duration-200 ${
                          isActive ? "text-orange-700" : "text-gray-700"
                        } hover:bg-gray-50`
                      }
                    >
                      Daily Expenses
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dubaiPortExpenses"
                      onClick={handleNavLinkClick}
                      className={({ isActive }) =>
                        `block py-2 px-4 duration-200 ${
                          isActive ? "text-orange-700" : "text-gray-700"
                        } hover:bg-gray-50`
                      }
                    >
                      Dubai Port Expenses
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
