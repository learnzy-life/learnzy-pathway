
import React from 'react'
import { Tag, Star, Clock } from 'lucide-react'

const PromotionalBanner = () => {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-amber-400 py-2.5 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-white relative z-10">
          <div className="hidden sm:flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <span className="font-medium">Special Offer</span>
            <span className="h-5 w-[1px] bg-white/30" />
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
            <span>Use code</span>
            <code className="bg-white/20 px-2 py-0.5 rounded font-semibold">LEARNZY2025</code>
            <span>to get access at just</span>
            <div className="inline-flex items-center gap-1">
              <span className="line-through text-white/80">₹5000</span>
              <span className="font-bold">₹345</span>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="h-5 w-[1px] bg-white/30" />
            <Clock className="h-4 w-4" />
            <span className="font-medium">Limited Time Offer</span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 translate-x-1/2" />
    </div>
  )
}

export default PromotionalBanner
