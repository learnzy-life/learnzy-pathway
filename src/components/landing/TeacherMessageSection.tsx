
import React from 'react';

const TeacherMessageSection = () => {
  return (
    <section className="py-6 md:py-8 bg-gradient-to-r from-white to-amber-50 rounded-xl mb-6">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-learnzy-dark">What Teachers Have to Say</h2>
          <p className="text-xl font-bold text-amber-700 bg-amber-100 px-4 py-2 rounded-lg inline-block shadow-sm">
            Anand Sir Kya Khte H
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-8">
          <div className="aspect-video bg-white shadow-lg rounded-xl overflow-hidden border border-amber-100">
            <iframe 
              className="w-full h-full"
              src="https://drive.google.com/file/d/10MIqE9PpTLQI12p2jK_oaWAt88eThJWI/preview"
              title="Message from Anand Sir"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherMessageSection;
