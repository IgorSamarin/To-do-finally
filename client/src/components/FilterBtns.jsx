import React, { useEffect, useState } from 'react';

export default function FilterBtns(props) {
  const [chronology, setChronology] = useState('normal');
  const [complete, setComplete] = useState('all');

  const changeSetChroology = (e) => {
    setChronology(e.target.id);
  };
  const changeSetComplete = (e) => {
    setComplete(e.target.id);
  };
  useEffect(() => {
    props.updateFilters(chronology, complete);
  }, [chronology, complete]);
  return (
    <div className='filterBtns'>
      <input
        onChange={(event) => changeSetChroology(event)}
        type='radio'
        name='chronology'
        id='normal'
        defaultChecked
      />
      <label htmlFor='normal'>normal</label>
      <input
        onChange={(event) => changeSetChroology(event)}
        type='radio'
        name='chronology'
        id='reverse'
      />
      <label htmlFor='reverse'>reverse</label>

      <input
        onChange={(event) => changeSetComplete(event)}
        type='radio'
        name='complete'
        id='all'
        defaultChecked
      />
      <label htmlFor='all'>all</label>
      <input
        onChange={(event) => changeSetComplete(event)}
        type='radio'
        name='complete'
        id='true'
      />
      <label htmlFor='true'>done</label>
      <input
        onChange={(event) => changeSetComplete(event)}
        type='radio'
        name='complete'
        id='false'
      />
      <label htmlFor='false'>undone</label>
    </div>
  );
}
