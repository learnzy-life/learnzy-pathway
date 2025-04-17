import { BookOpen, Clock, Sparkles, Zap } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '../../context/AuthContext'
import { initiateGlobalPayment } from '../../services/payment/globalPayment'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

interface PaymentPromotionDialogProps {
  isOpen: boolean
  onClose: () => void
}

const PaymentPromotionDialog: React.FC<PaymentPromotionDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  // Countdown timer state
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  })

  // Set up countdown timer
  useEffect(() => {
    if (!isOpen) return;

    // Calculate end time (24 hours from now)
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);

    const updateTimer = () => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();

      if (diff <= 0) {
        // Timer expired
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Calculate remaining time
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds });
    };

    // Update timer immediately
    updateTimer();

    // Set interval to update timer every second
    const timerId = setInterval(updateTimer, 1000);

    // Clean up interval on unmount or dialog close
    return () => clearInterval(timerId);
  }, [isOpen]);

  // Format remaining time as string with leading zeros
  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  const handlePaymentClick = async () => {
    if (!user) {
      toast.error('You need to be logged in to make a payment')
      return
    }

    try {
      setIsLoading(true)
      const result = await initiateGlobalPayment()

      if (result.success) {
        // Set a session storage flag to indicate successful payment
        sessionStorage.setItem('payment_success', 'true')

        // Redirect to success page
        navigate('/payment-success')

        toast.success('Payment successful! You now have access to all cycles')
      } else {
        toast.error(result.error || 'Payment failed. Please try again.')
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('An error occurred during payment processing')
    } finally {
      setIsLoading(false)
      onClose() // Close dialog regardless of outcome
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-amber-500 to-amber-400 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-display flex items-center">
              <Sparkles className="mr-2 h-6 w-6" />
              Unlock All Cycles
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Main Benefits */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Zap className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Complete Test Access</h3>
                <p className="text-sm text-gray-600">Unlock 20 mock tests with 5 AI-powered personalized tests</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <div className="bg-amber-100 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Premium Study Materials</h3>
                <p className="text-sm text-gray-600">Get access to all premium resources:</p>
                <ul className="mt-2 text-sm text-gray-600 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    Toppers' Highlighted NCERT (Class 11 & 12 annotated)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    Physics Derived PYQs (10 similar NEET 2024 questions)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    Physics Formula Book (Complete formula guide)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    Chemistry One-Page Notes (Quick revision guide)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    Top 50 Important Topics (For Botany, Zoology, Physics & Chemistry)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Price Display */}
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Limited Time Offer</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <p className="text-sm text-amber-700">
                    Offer expires in: <span className="font-semibold">{formatTime(timeRemaining.hours)}:{formatTime(timeRemaining.minutes)}:{formatTime(timeRemaining.seconds)}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 line-through">₹5000</p>
                <p className="text-2xl font-bold text-amber-600">₹1234</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              onClick={handlePaymentClick}
              disabled={isLoading}
              className="w-full py-6 text-lg font-medium bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-white shadow-md"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                  Processing...
                </>
              ) : (
                <>
                  Unlock All Access Now
                </>
              )}
            </Button>
            <p className="text-xs text-center text-gray-500 mt-3">
              One-time payment. No subscriptions. Lifetime access.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentPromotionDialog