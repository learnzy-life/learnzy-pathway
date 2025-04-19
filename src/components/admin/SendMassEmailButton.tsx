
import { useState } from 'react'
import { Button } from '../ui/button'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export const SendMassEmailButton = () => {
  const [isSending, setIsSending] = useState(false)

  const handleSendMassEmail = async () => {
    try {
      setIsSending(true)
      const { data, error } = await supabase.functions.invoke('send-mass-email')
      
      if (error) throw error
      
      toast.success(`${data.message}`)
    } catch (error) {
      console.error('Error sending mass emails:', error)
      toast.error('Failed to send mass emails. Check console for details.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Button 
      onClick={handleSendMassEmail}
      disabled={isSending}
    >
      {isSending ? 'Sending...' : 'Send Physics Formula Book to All Users'}
    </Button>
  )
}
