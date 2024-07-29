import React from 'react';
import logo from '../assets/img/logo.svg';


const Footer = () => {
    return (
        <footer className="bg-gray-100 text-center py-14">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col  items-center mb-4 sm:ml-10 md:mb-0 md:-ml-0">
                        <img src={logo} alt="Logo" className="h-12 mb-2 " />
                    </div>
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                        <a href="/about" className="hover:underline">About Us</a>
                        <a href="/contact" className="hover:underline">Contact Us</a>
                        <a href="/unauthorized" className="hover:underline">Documentation</a>
                        <a href="/unauthorized" className="hover:underline">Terms of Service</a>
                    </div>
                    <div className="flex space-x-4 mt-4 md:mt-0">
    <a href="https://twitter.com" aria-label="Twitter" className="text-gray-700 hover:text-gray-900">
        <svg fill="currentColor" className="h-6 w-6" viewBox="0 0 24 24">
            <path d="M23.954 4.569c-.885.385-1.83.644-2.825.759 1.014-.611 1.794-1.574 2.163-2.724-.951.555-2.005.959-3.127 1.184-.897-.958-2.178-1.557-3.594-1.557-2.897 0-5.175 2.539-4.675 5.432-4.067-.205-7.683-2.157-10.093-5.144-1.29 2.213-.669 5.077 1.523 6.523-.806-.026-1.566-.248-2.229-.616v.061c0 2.28 1.581 4.224 3.693 4.657-.746.202-1.527.247-2.33.094.662 2.059 2.607 3.553 4.91 3.595-2.173 1.701-4.905 2.725-7.868 2.494 2.267 1.448 4.959 2.293 7.862 2.293 9.448 0 14.462-7.82 14.462-14.605 0-.223-.006-.444-.016-.664.995-.721 1.864-1.62 2.549-2.65z"/>
        </svg>
    </a>
    <a href="https://youtube.com" aria-label="YouTube" className="text-gray-700 hover:text-gray-900">
        <svg fill="currentColor" className="h-6 w-6" viewBox="0 0 24 24">
            <path d="M23.498 6.186c-.3-1.123-1.178-1.998-2.288-2.291-2.004-.444-10.007-.444-10.007-.444s-8.004 0-10.007.444c-1.11.293-1.989 1.168-2.288 2.291-.459 2.011-.459 6.205-.459 6.205s0 4.194.459 6.205c.3 1.123 1.178 1.998 2.288 2.291 2.004.444 10.007.444 10.007.444s8.004 0 10.007-.444c1.11-.293 1.989-1.168 2.288-2.291.459-2.011.459-6.205.459-6.205s0-4.194-.459-6.205zm-14.998 9.274v-6.924l6.457 3.462-6.457 3.462z"/>
        </svg>
    </a>
    <a href="https://facebook.com" aria-label="Facebook" className="text-gray-700 hover:text-gray-900">
        <svg fill="currentColor" className="h-6 w-6" viewBox="0 0 24 24">
            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.497v-9.284h-3.129v-3.621h3.129v-2.671c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.463.098 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.621h-3.12v9.283h6.116c.73 0 1.323-.593 1.323-1.324v-21.351c0-.732-.593-1.325-1.324-1.325z"/>
        </svg>
    </a>
    <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-700 hover:text-gray-900">
        <svg fill="currentColor" className="h-6 w-6" viewBox="0 0 24 24">
            <path d="M22.23 0h-20.46c-.975 0-1.77.795-1.77 1.77v20.46c0 .975.795 1.77 1.77 1.77h20.46c.975 0 1.77-.795 1.77-1.77v-20.46c0-.975-.795-1.77-1.77-1.77zm-13.538 20.451h-3.077v-9.233h3.077v9.233zm-1.538-10.56c-.987 0-1.785-.801-1.785-1.785s.798-1.785 1.785-1.785c.987 0 1.785.801 1.785 1.785s-.798 1.785-1.785 1.785zm13.561 10.56h-3.077v-4.775c0-1.138-.023-2.606-1.587-2.606-1.588 0-1.831 1.242-1.831 2.527v4.854h-3.077v-9.233h2.949v1.26h.041c.411-.78 1.416-1.603 2.918-1.603 3.119 0 3.695 2.054 3.695 4.724v4.852z"/>
        </svg>
    </a>
</div>

                </div>
                <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                    <span className="text-gray-600">&copy; HomeScape</span>
                    <span className="text-gray-600">Designed by Aaryan Basnet</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
