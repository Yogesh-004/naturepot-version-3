import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <span className="text-2xl mr-2">🌱</span>
              About NaturePot
            </h3>
            <p className="text-primary-100 text-sm">
              An eco-friendly initiative encouraging students to create beautiful plant pots
              from recycled materials for a greener classroom environment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <span className="text-2xl mr-2">🔗</span>
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-primary-100 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/materials" className="text-primary-100 hover:text-white transition-colors">
                  Materials
                </a>
              </li>
              <li>
                <a href="/register" className="text-primary-100 hover:text-white transition-colors">
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <span className="text-2xl mr-2">📧</span>
              Contact
            </h3>
            <p className="text-primary-100 text-sm mb-2">
              Join our WhatsApp community for updates!
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-xl">💬</span>
              <span className="text-primary-100 text-sm">
                WhatsApp Group Available
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-6 text-center">
          <p className="text-primary-200 text-sm">
            © {currentYear} NaturePot Challenge. Made with 💚 for a greener future.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer