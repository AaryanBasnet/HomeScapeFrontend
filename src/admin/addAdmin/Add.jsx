import React from 'react';
import AddAdmin from './AddAdmin';
import AddAgent from './AddAgent';
import AboutForm from './AboutForm';

function Add() {
  return (
    <div className='flex flex-col md:flex-row md:space-x-4 p-4'>
      <div className='flex-1'>
        <AddAdmin />
      </div>
      <div className='flex-1'>
        <AddAgent />
      </div>
      <div className='flex-1'>
     
        <AboutForm />
      </div>
    </div>
  );
}

export default Add;
