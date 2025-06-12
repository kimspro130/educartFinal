import Link from "next/link"

export function Footer() {
  return (
    <footer style={{
      background: '#92400e',
      color: 'white',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>
          EDUCART UGANDA
        </h3>
        <p style={{ marginBottom: '2rem', opacity: '0.8' }}>
          Transforming Education with Mobile Money Payments
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#fbbf24' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link href="/pricing" style={{ color: 'white', textDecoration: 'none', opacity: '0.8' }}>Pricing</Link>
              <Link href="/payment" style={{ color: 'white', textDecoration: 'none', opacity: '0.8' }}>Payment</Link>
              <Link href="/contact" style={{ color: 'white', textDecoration: 'none', opacity: '0.8' }}>Contact</Link>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#fbbf24' }}>Mobile Money</h4>
            <p style={{ opacity: '0.8', fontSize: '0.9rem' }}>
              MTN: 077, 078, 076<br />
              Airtel: 075, 070, 074<br />
              Africell: 079
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#fbbf24' }}>Contact Info</h4>
            <p style={{ opacity: '0.8', fontSize: '0.9rem' }}>
              Email: info@educartuganda.com<br />
              Phone: +256 700 123 456<br />
              Kampala, Uganda
            </p>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid #d97706',
          paddingTop: '2rem',
          opacity: '0.6',
          fontSize: '0.9rem'
        }}>
          © 2024 EDUCART UGANDA. All rights reserved. | Powered by Pesapal
        </div>
      </div>
    </footer>
  )
}
