import Link from "next/link"

export default function HomePage() {

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #fef3c7 0%, #dbeafe 50%, #fef3c7 100%)',
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: '300',
            color: '#1e3a8a',
            marginBottom: '1rem',
            lineHeight: '1.1'
          }}>
            EDUCART
            <span style={{
              display: 'block',
              background: 'linear-gradient(45deg, #f59e0b, #d97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              UGANDA
            </span>
          </h1>
          <p style={{
            fontSize: '1.5rem',
            color: '#1e40af',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Uganda's premier educational platform offering world-class tutoring, assessment, and academic support services.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/pricing" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '15px 30px',
                fontSize: '1.1rem',
                background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Start Your Journey →
              </button>
            </Link>
            <Link href="/payment" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '15px 30px',
                fontSize: '1.1rem',
                background: 'white',
                color: '#1e40af',
                border: '2px solid #1e40af',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#1e40af';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#1e40af';
              }}
              >
                Pay with Mobile Money
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section style={{ padding: '60px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '300', color: '#1e3a8a', marginBottom: '2rem' }}>
            Our Services
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#1e40af', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Comprehensive educational solutions designed to elevate your academic journey.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {[
              {
                title: "Subject Tutoring",
                description: "Expert tutoring across all academic subjects with personalized learning approaches.",
                price: "UGX 50,000"
              },
              {
                title: "Holiday Assessments",
                description: "Comprehensive holiday work evaluation for primary and secondary students.",
                price: "UGX 30,000"
              },
              {
                title: "Online Examinations",
                description: "Secure and efficient online examination platform with real-time monitoring.",
                price: "UGX 90,000"
              },
              {
                title: "Final Year Projects",
                description: "Complete support for final year projects from conception to completion.",
                price: "UGX 40,000"
              },
              {
                title: "Language Learning",
                description: "Master new languages with our immersive and interactive teaching methods.",
                price: "UGX 30,000"
              },
              {
                title: "Web Design",
                description: "Professional web design services for educational institutions and businesses.",
                price: "Contact Us"
              },
            ].map((service, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(245, 158, 11, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                }}
              >
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e3a8a', marginBottom: '1rem' }}>
                  {service.title}
                </h3>
                <p style={{ color: '#1e40af', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  {service.description}
                </p>
                <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#f59e0b', marginBottom: '1rem' }}>
                  {service.price}
                </div>
                <Link href="/payment" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    Pay Now →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Money Section */}
      <section style={{
        padding: '60px 20px',
        background: 'linear-gradient(135deg, #fef3c7 0%, #dbeafe 100%)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '300', color: '#1e3a8a', marginBottom: '1rem' }}>
            Pay with Mobile Money
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#1e40af', marginBottom: '3rem' }}>
            Secure payments with MTN Mobile Money, Airtel Money, and Africell Money
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'white',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/93/New-mtn-logo.jpg"
                  alt="MTN Mobile Money"
                  style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#1e3a8a', marginBottom: '0.5rem' }}>
                MTN Mobile Money
              </h3>
              <p style={{ color: '#1e40af', fontSize: '1rem' }}>077, 078, 076</p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#dc2626',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <img
                  src="https://s3-ap-southeast-1.amazonaws.com/bsy/iportal/images/airtel-logo-white-text-vertical.jpg"
                  alt="Airtel Money"
                  style={{ width: '60px', height: '70px', objectFit: 'contain' }}
                />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#1e3a8a', marginBottom: '0.5rem' }}>
                Airtel Money
              </h3>
              <p style={{ color: '#1e40af', fontSize: '1rem' }}>075, 070, 074</p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'white',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}>
                <img
                  src="https://images.seeklogo.com/logo-png/40/1/africell-logo-png_seeklogo-402658.png"
                  alt="Africell Money"
                  style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#1e3a8a', marginBottom: '0.5rem' }}>
                Africell Money
              </h3>
              <p style={{ color: '#1e40af', fontSize: '1rem' }}>079</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/payment" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                fontSize: '1.2rem',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Pay Now with Mobile Money →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-amber-600 dark:via-amber-500 dark:to-amber-600 relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-thin text-white dark:text-gray-900 mb-6 transition-colors duration-300">
            Ready to Excel?
          </h2>
          <p className="text-xl text-blue-100 dark:text-gray-800 mb-12 max-w-3xl mx-auto font-light transition-colors duration-300">
            Join thousands of students who have transformed their academic journey with EDUCART Uganda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <AnimatedButton
                variant="glow"
                size="lg"
                className="bg-amber-400 dark:bg-gray-900 text-gray-900 dark:text-amber-400 hover:bg-amber-500 dark:hover:bg-gray-800 px-8 py-4 text-lg rounded-full shadow-lg"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </AnimatedButton>
            </Link>
            <Link href="/contact">
              <AnimatedButton
                variant="pulse"
                size="lg"
                className="border-white dark:border-gray-900 text-white dark:text-gray-900 hover:bg-white dark:hover:bg-gray-900 hover:text-blue-700 dark:hover:text-amber-400 px-8 py-4 text-lg rounded-full bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm transition-colors duration-300"
              >
                Contact Us
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
