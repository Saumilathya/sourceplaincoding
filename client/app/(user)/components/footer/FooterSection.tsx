"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <div className="px-5 sm:px-16 border-t py-2 mt-28">
      <footer className="container mx-auto mt-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center">
              <h1 className="text-[#b63806] font-extrabold text-[2.5rem]">
                Alankar
              </h1>
            </div>
            <h1 className="text-gray-600">
              Advertising & Flex Printing Agency.
            </h1>

            <h3 className="mt-3 font-semibold text-lg">Contact us</h3>

            <a
              href="tel:+919171453472"
              className="flex items-center gap-2 mt-3 text-gray-600 hover:text-blue-500"
            >
              <PhoneIcon />
              <p className="mt-0">+91-9171453472</p>
            </a>

            <a
              href="mailto:alankarflex@gmail.com"
              className="flex items-center gap-2 mt-3 text-gray-600 hover:text-blue-500"
            >
              <EmailIcon />
              <p className="mt-0">alankarflex@gmail.com</p>
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg">All Services</h3>
            <ul className="text-gray-600 mt-2 space-y-1">
              <li>Business Cards</li>
              <li>Flex</li>
              <li>Photo Frame</li>
              <li>Stationery</li>
              <li>Stickers & Labels</li>
              <li>Packaging</li>
              <li>Awards</li>
              <li>Marketing Materials</li>
            </ul>
          </div>

          {/* Agency Info & Social */}
          <div>
            <h3 className="font-semibold text-lg">Our Agency</h3>
            <ul className="text-gray-600 mt-2 space-y-1">
              <li>About us</li>
              <li>Careers</li>
            </ul>

            <h3 className="mt-4 font-semibold text-lg">Follow us</h3>
            <div className="flex space-x-4 mt-3 text-gray-500">
              <SocialIcon href="#" icon={<InstagramIcon />} />
              <SocialIcon href="#" icon={<FacebookIcon />} />
              <SocialIcon href="#" icon={<YouTubeIcon />} />
              <SocialIcon
                href="https://wa.me/8770970704?text=Hello%2C%20I%20have%20a%20question%21"
                icon={<WhatsAppIcon />}
                target="_blank"
              />
            </div>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="font-semibold text-lg">Help & Support</h3>
            <ul className="text-gray-600 mt-2 space-y-1">
              <li>Need Help?</li>
              <li>Business Solutions</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-600 border-t py-4 mt-8">
          <p>© 2023 Alankar Advertising & Flex Printing Agency.</p>
        </div>
      </footer>
    </div>
  );
};

// ===================
// ICON COMPONENTS
// ===================

const PhoneIcon = () => (
  <svg height="22" width="22" viewBox="0 0 512 512" fill="currentColor">
    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
  </svg>
);

const EmailIcon = () => (
  <svg height="22" width="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const InstagramIcon = () => (
  <svg height="23" width="23" viewBox="0 0 448 512" fill="currentColor">
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8s-26.8-12-26.8-26.8 12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9s-58-34.4-93.9-36.2c-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1S34.4 122 32.6 157.9C30.5 194.9 30.5 305.8 32.6 342.8c1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2s34.4-58 36.2-93.9c2.1-37 2.1-147.8 0-184.8z" />
  </svg>
);

const FacebookIcon = () => (
  <svg height="23" width="23" viewBox="0 0 512 512" fill="currentColor">
    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg height="23" width="23" viewBox="0 0 576 512" fill="currentColor">
    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597C14.933 167.95 14.933 257.388 14.933 257.388s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zM232.145 337.591V175.185l142.739 81.205-142.739 81.201z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg height="23" width="23" viewBox="0 0 448 512" fill="currentColor">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32C101.5 32 1.9 131.6 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222c0-59.3-25.2-115-67.1-157z" />
  </svg>
);

const SocialIcon = ({
  href,
  icon,
  target = "_self",
}: {
  href: string;
  icon: any;
  target?: string;
}) => (
  <a href={href} className="hover:text-blue-500" target={target}>
    {icon}
  </a>
);

export default Footer;
