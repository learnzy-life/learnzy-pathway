
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const testimonials = [
  {
    id: 1,
    text: "The unique concept of cycle and the last test is all about my weaknesses helped me turn my weak topics into strengths and improved my marks.",
    name: "Isha",
    achievement: "NEET 2024, 644 marks"
  },
  {
    id: 2,
    text: "The analysis section saved 4-5 hours of my daily time, and the topic-wise analysis helped me a lot. I remember similar questions were asked in the NEET 2024 exam from these 20 mocks. The mock papers are so balanced, just like the real NEET exam.",
    name: "Avni",
    achievement: "Cracked NEET 2024"
  },
  {
    id: 3,
    text: "The stress management techniques before every test helped me stay calm during the actual exam. I could answer more questions with better accuracy.",
    name: "Rahul",
    achievement: "NEET 2024, 612 marks"
  }
];

const StudentFeedbackSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 mb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Student Feedback</h2>
          <p className="text-muted-foreground">Hear from students who achieved their goals with Learnzy</p>
        </div>
        
        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 px-2">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 h-full flex flex-col">
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-amber-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-learnzy-dark mb-4 flex-grow">"{testimonial.text}"</p>
                  <div className="mt-auto">
                    <p className="font-semibold text-learnzy-dark">– {testimonial.name}</p>
                    <p className="text-amber-600 text-sm">{testimonial.achievement}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default StudentFeedbackSection;
