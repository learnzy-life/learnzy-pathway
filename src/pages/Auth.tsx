
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 pt-24 pb-16">
        <section className="py-12 max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Authentication Disabled
            </h1>
            <p className="text-muted-foreground">
              The authentication system has been temporarily disabled.
            </p>
          </div>

          <div className="card-glass p-8 animate-fade-in">
            <div className="text-center">
              <p className="mb-6">Authentication will be implemented later.</p>
              <Link to="/" className="button-primary inline-flex items-center">
                Return to Home <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Auth
