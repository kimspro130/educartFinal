// Minimal debug page with no external dependencies
export default function DebugPage() {
  return (
    <html>
      <head>
        <title>EDUCART Uganda - Debug</title>
        <style>{`
          body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: #f3f4f6; 
          }
          .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            padding: 20px; 
            border-radius: 8px; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .status { 
            padding: 15px; 
            margin: 10px 0; 
            border-radius: 4px; 
          }
          .success { background: #d1fae5; color: #065f46; }
          .error { background: #fee2e2; color: #991b1b; }
          .info { background: #dbeafe; color: #1e40af; }
          h1 { color: #f59e0b; }
          h2 { color: #1e40af; }
          .grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 15px; 
            margin: 20px 0; 
          }
          .card { 
            background: #f9fafb; 
            padding: 15px; 
            border-radius: 4px; 
            border-left: 4px solid #f59e0b; 
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <h1>🎓 EDUCART Uganda - Debug Page</h1>
          
          <div className="status success">
            ✅ This page loaded successfully! Next.js is working.
          </div>

          <h2>📱 Mobile Money Networks</h2>
          <div className="grid">
            <div className="card">
              <h3>MTN Mobile Money</h3>
              <p>Prefixes: 077, 078, 076</p>
              <p>Status: Ready for payments</p>
            </div>
            <div className="card">
              <h3>Airtel Money</h3>
              <p>Prefixes: 075, 070, 074</p>
              <p>Status: Ready for payments</p>
            </div>
            <div className="card">
              <h3>Africell Money</h3>
              <p>Prefixes: 079</p>
              <p>Status: Ready for payments</p>
            </div>
          </div>

          <h2>🔧 System Status</h2>
          <div className="status info">
            If you can see this page, the basic Next.js application is working correctly.
          </div>

          <h2>🚀 Next Steps</h2>
          <ol>
            <li>If this page loads, the issue is with specific components</li>
            <li>Try visiting: <a href="/api/health">/api/health</a></li>
            <li>Try visiting: <a href="/test">/test</a></li>
            <li>If those fail, deploy to Vercel for a clean environment</li>
          </ol>

          <h2>💰 Services & Pricing</h2>
          <div className="grid">
            <div className="card">
              <h4>Online Classes</h4>
              <p>UGX 30,000</p>
            </div>
            <div className="card">
              <h4>Private Tutoring</h4>
              <p>UGX 50,000</p>
            </div>
            <div className="card">
              <h4>Holiday Works</h4>
              <p>UGX 30,000</p>
            </div>
            <div className="card">
              <h4>Exam Assistance</h4>
              <p>UGX 90,000</p>
            </div>
          </div>

          <div className="status info">
            <strong>Deployment Ready:</strong> Your code is committed to GitHub and ready for Vercel deployment.
          </div>
        </div>
      </body>
    </html>
  );
}
