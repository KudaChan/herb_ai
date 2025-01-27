import React from 'react';

interface SectionWrapperProps {
  idName: string;
}

const SectionWrapper = (Component: React.ComponentType) => {
  return function HOC({ idName }: SectionWrapperProps) {
    return (
      <section
        className="sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0"
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </section>
    );
  };
};

export default SectionWrapper;