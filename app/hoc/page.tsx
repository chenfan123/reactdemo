'use client';
import { useState } from 'react';
import { Button } from './components/button';
import { TextArea } from './components/textarea';

export default () => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [textareaVisible, setTextareaVisible] = useState(false);

  return (
    <div>
      <Button visible={buttonVisible} />
      <TextArea visible={textareaVisible} />
    </div>
  );
};
