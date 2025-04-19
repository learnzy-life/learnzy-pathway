
import React from 'react';

const FooterSection: React.FC = () => {
  return (
    <section className="pt-16 pb-6 border-t border-amber-100">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground italic">
            *For students scoring 450+ who follow our structured program.
          </p>
          
          <div className="mt-6">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Learnzy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
