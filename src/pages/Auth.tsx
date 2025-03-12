
import React, { useState } from 'react'
import Header from '../components/Header'
import AuthHeader from '../components/auth/AuthHeader'
import AuthForm from '../components/auth/AuthForm'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 pt-24 pb-16">
        <section className="py-12 max-w-md mx-auto">
          <AuthHeader isLogin={isLogin} />
          <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
        </section>
      </main>
    </div>
  )
}

export default Auth
