
import React, { useEffect, useCallback } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const testimonials = [
  {
    id: 1,
    text: "The unique concept of cycle and the last test is all about my weaknesses helped me turn my weak topics into strengths and improved my marks.",
    name: "Isha",
    achievement: "NEET 2024, 644 marks",
    rating: 5
  },
  {
    id: 2,
    text: "The analysis section saved 4-5 hours of my daily time, and the topic-wise analysis helped me a lot. I remember similar questions were asked in the NEET 2024 exam from these 20 mocks. The mock papers are so balanced, just like the real NEET exam.",
    name: "Avni",
    achievement: "Cracked NEET 2024",
    rating: 5
  },
  {
    id: 3,
    text: "The stress management techniques before every test helped me stay calm during the actual exam. I could answer more questions with better accuracy.",
    name: "Rahul",
    achievement: "NEET 2024, 612 marks",
    rating: 5
  }
];

const StudentFeedbackSection: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Auto-scroll when component mounts
  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', scrollNext);
    }
    return () => {
      if (emblaApi) emblaApi.off('select', scrollNext);
    };
  }, [emblaApi, scrollNext]);

  return (
    <section className="py-8 mb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-1">Student Feedback</h2>
          <p className="text-muted-foreground">Hear from students who achieved their goals with Learnzy</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Carousel ref={emblaRef} className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 pl-4">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 h-full flex flex-col transform transition-transform duration-300 hover:shadow-md hover:border-amber-200">
                    <div className="mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-amber-400 text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-learnzy-dark mb-4 flex-grow text-sm md:text-base leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="mt-auto">
                      <p className="font-semibold text-learnzy-dark">– {testimonial.name}</p>
                      <p className="text-amber-600 text-sm">{testimonial.achievement}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default StudentFeedbackSection;
