
import React from 'react'
import { Tag, Clock } from 'lucide-react'

const PromotionalBanner = () => {
  return (
    <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 py-2.5 relative overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-white" />
            <span className="font-medium text-black">Special Offer</span>
            <span className="h-5 w-[1px] bg-black/30" />
          </div>
          
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <span className="text-black font-semibold">Use code</span>
            <code className="bg-white px-2 py-0.5 rounded font-bold text-red-600">LEARNZY2025</code>
            <span className="text-black font-semibold">to get access at just</span>
            <div className="inline-flex items-center gap-1">
              <span className="line-through text-black/80">₹5000</span>
              <span className="font-bold text-black">₹345</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="h-5 w-[1px] bg-black/30" />
            <Clock className="h-4 w-4 text-black" />
            <span className="font-medium text-black">Limited Time Offer</span>
          </div>

          {/* Duplicate content for seamless loop */}
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-white" />
            <span className="font-medium text-black">Special Offer</span>
            <span className="h-5 w-[1px] bg-black/30" />
          </div>
          
          <div className="flex items-center gap-2 text-sm sm:text-base">
            <span className="text-black font-semibold">Use code</span>
            <code className="bg-white px-2 py-0.5 rounded font-bold text-red-600">LEARNZY2025</code>
            <span className="text-black font-semibold">to get access at just</span>
            <div className="inline-flex items-center gap-1">
              <span className="line-through text-black/80">₹5000</span>
              <span className="font-bold text-black">₹345</span>
            </div>
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
