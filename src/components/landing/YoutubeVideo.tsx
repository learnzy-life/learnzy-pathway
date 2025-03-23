
import React from 'react';

const YoutubeVideo = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">How to Effectively Use Learnzy</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch this quick guide to learn how Learnzy can help you ace your NEET preparation.
          </p>
        </div>
        
        <div className="aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
          {/* Using loading="lazy" for performance and adding title for accessibility */}
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/YaTK7D38C3E" 
            title="How to effectively use Learnzy for NEET preparation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default YoutubeVideo;
