import { ArrowRight, Calendar, CheckCircle2, Download, Unlock } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { useGlobalPayment } from '../context/GlobalPaymentContext'

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const { hasPaid, isLoading } = useGlobalPayment()
  const resourcesLink = "https://drive.google.com/drive/folders/11uaUaBP8rV-ad25Zx1-eStzYvbghAiW2?usp=share_link"

  // Redirect to homepage if not coming from a payment
  useEffect(() => {
    const paymentFlag = sessionStorage.getItem('payment_success')

    if (!hasPaid && !paymentFlag) {
      // Neither context nor session flag indicates successful payment, redirect away
      navigate('/', { replace: true })
    } else if (paymentFlag) {
      // If the flag exists, remove it now that we've acknowledged it.
      // This ensures it only grants entry once right after navigation.
      sessionStorage.removeItem('payment_success')
    }
    // If hasPaid is true, we don't need to do anything regarding redirection or the flag.
  }, [hasPaid, navigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-learnzy-amber border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-amber-50 px-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. You now have full access to all learning
          cycles.
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-amber-50 p-4 rounded-lg flex items-start gap-3">
            <Unlock className="h-5 w-5 text-learnzy-amber flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <h3 className="font-medium text-gray-800">All Cycles Unlocked</h3>
              <p className="text-sm text-gray-600">
                You now have unlimited access to all mock tests and learning
                resources across all cycles.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg flex items-start gap-3">
            <Calendar className="h-5 w-5 text-learnzy-amber flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <h3 className="font-medium text-gray-800">Lifetime Access</h3>
              <p className="text-sm text-gray-600">
                Your purchase includes unlimited access to current and future
                cycles.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <Button
            onClick={() => navigate('/subjects')}
            className="bg-learnzy-amber hover:bg-learnzy-amber-dark text-white"
          >
            Go to Cycles
          </Button>

          <Button
            onClick={() => navigate('/subjects')}
            variant="outline"
            className="border-learnzy-amber text-learnzy-amber hover:bg-learnzy-amber/10"
          >
            Start Learning <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4">
          <Button
            onClick={() => window.open(resourcesLink, '_blank')}
            className="bg-green-600 hover:bg-green-700 text-white w-full"
          >
            <Download className="mr-2 h-4 w-4" /> Get Your Free Resources
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
