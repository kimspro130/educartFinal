import React from 'react';

// Simple test page to verify the app is working
export default function TestPage() {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#f59e0b' }}>🎓 EDUCART Uganda - Test Page</h1>
      
      <div style={{ 
        background: '#f3f4f6', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>✅ Application Status</h2>
        <p>If you can see this page, the Next.js application is running successfully!</p>
      </div>

      <div style={{ 
        background: '#fef3c7', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>📱 Mobile Money Networks</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <div style={{ padding: '10px', background: '#fff', borderRadius: '4px' }}>
            <strong>MTN Mobile Money</strong><br />
            077, 078, 076
          </div>
          <div style={{ padding: '10px', background: '#fff', borderRadius: '4px' }}>
            <strong>Airtel Money</strong><br />
            075, 070, 074
          </div>
          <div style={{ padding: '10px', background: '#fff', borderRadius: '4px' }}>
            <strong>Africell Money</strong><br />
            079
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#dbeafe', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>🔧 Diagnostic Links</h2>
        <ul>
          <li><a href="/api/health" target="_blank">Health Check API</a></li>
          <li><a href="/api/payment/pesapal/test" target="_blank">Pesapal Test</a></li>
          <li><a href="/payment" target="_blank">Payment Page</a></li>
          <li><a href="/pricing" target="_blank">Pricing Page</a></li>
        </ul>
      </div>

      <div style={{ 
        background: '#f0fdf4', 
        padding: '20px', 
        borderRadius: '8px'
      }}>
        <h2>💰 Services & Pricing</h2>
        <ul>
          <li><strong>Online Classes:</strong> UGX 30,000</li>
          <li><strong>Private Tutoring:</strong> UGX 50,000</li>
          <li><strong>Holiday Works:</strong> UGX 30,000</li>
          <li><strong>Coursework Help:</strong> UGX 40,000</li>
          <li><strong>Exam Assistance:</strong> UGX 90,000</li>
        </ul>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        background: '#1f2937', 
        color: 'white', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3>🚀 EDUCART Uganda</h3>
        <p>Transforming Education with Mobile Money Payments</p>
        <p style={{ fontSize: '14px', opacity: '0.8' }}>
          Powered by Pesapal • Supporting MTN, Airtel & Africell
        </p>
      </div>
    </div>
  );
}
