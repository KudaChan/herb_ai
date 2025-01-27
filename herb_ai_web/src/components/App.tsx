import React from 'react';

import {Hero, Recognizer, Example, Models, Contact} from '@/src/components';
import SectionWrapper from '@/src/hoc/SectionWrapper';

const WrappedRecognizer = SectionWrapper(Recognizer);
const WrappedExample = SectionWrapper(Example);
const WrappedModels = SectionWrapper(Models);
const WrappedContact = SectionWrapper(Contact);

const App = () => {
  return (
    <div className= 'relative z-0'>
    <Hero />
    <WrappedRecognizer idName='recognizer'/>
    <WrappedExample idName='example'/>
    <WrappedModels idName='models'/>
    <WrappedContact idName='contact'/>
    </div>
  )
}

export default App;


