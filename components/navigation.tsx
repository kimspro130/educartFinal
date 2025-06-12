"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function Navigation() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #f59e0b'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
                EDUCART UGANDA
              </h1>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 50,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #f59e0b'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
              EDUCART UGANDA
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link href="/pricing" style={{ textDecoration: 'none', color: '#d97706', fontWeight: '500' }}>
              Pricing
            </Link>
            <Link href="/payment" style={{ textDecoration: 'none', color: '#d97706', fontWeight: '500' }}>
              Payment
            </Link>
            <Link href="/contact" style={{ textDecoration: 'none', color: '#d97706', fontWeight: '500' }}>
              Contact
            </Link>
            <Link href="/payment" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem'
              }}>
                Pay Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
