
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur">
      <div className="container px-4 py-8 md:px-6 md:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-gradient-to-br from-medical-400 to-medical-600 flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="font-semibold text-lg">MEDI CAREPRO</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Making student healthcare management easy, accessible, and secure.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/help" className="text-sm text-muted-foreground hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/gdpr" className="text-sm text-muted-foreground hover:text-primary">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Stay Connected</h4>
            <p className="text-sm text-muted-foreground max-w-sm">
              Subscribe to our newsletter for updates on new features and health tips.
            </p>
            <div className="flex items-center gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button className="inline-flex items-center justify-center rounded-md bg-medical-500 px-3 py-2 text-sm font-medium text-white hover:bg-medical-600 focus:outline-none focus:ring-2 focus:ring-medical-500 focus:ring-offset-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MEDI CAREPRO. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              <span className="sr-only">Instagram</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
