
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from 'lucide-react';
import { MockTest } from '../../types/mock-test';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTest: MockTest | null;
  onPaymentComplete: (test: MockTest) => Promise<void>;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ 
  open, 
  onOpenChange, 
  selectedTest, 
  onPaymentComplete 
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selectedTest?.cycle > 1 && selectedTest?.requiresPayment 
              ? `Unlock Cycle ${selectedTest?.cycle}` 
              : 'Unlock Premium Mock Test'}
          </DialogTitle>
          <DialogDescription>
            {selectedTest?.cycle > 1 && selectedTest?.requiresPayment
              ? `Get access to all mock tests in Cycle ${selectedTest?.cycle}. This is a one-time payment.`
              : 'Get access to our premium mock test with exclusive questions and insights.'}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="bg-amber-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-amber-800 mb-2">
              {selectedTest?.cycle > 1 && selectedTest?.requiresPayment
                ? `Cycle ${selectedTest?.cycle} Benefits:`
                : 'Premium Mock Test Benefits:'}
            </h3>
            <ul className="list-disc pl-5 text-amber-700 space-y-1">
              {selectedTest?.cycle > 1 && selectedTest?.requiresPayment ? (
                <>
                  <li>Access to all 4 mock tests in this cycle</li>
                  <li>Access to the AI-powered review test</li>
                  <li>Detailed analytics and insights</li>
                  <li>Personalized improvement recommendations</li>
                </>
              ) : (
                <>
                  <li>Advanced difficulty level questions</li>
                  <li>Detailed analytics on your performance</li>
                  <li>Compare your score with top performers</li>
                  <li>Extended explanation for each question</li>
                </>
              )}
            </ul>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">₹499</p>
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-white w-full"
              onClick={() => {
                if (selectedTest) {
                  onPaymentComplete(selectedTest);
                }
              }}
            >
              Pay with Razorpay
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
