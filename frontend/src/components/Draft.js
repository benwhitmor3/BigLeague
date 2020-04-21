import React from 'react';

export default function Draft() {
  return <Headline />;
}
function Headline() {
  const greeting = 'Draft Function Component!';
  return <h1>{greeting}</h1>;
}
