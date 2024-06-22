import LeadTable from '@/components/shared/lead-table';
import React, { useState } from 'react'

const SearchPage = ({ params: { tool } }: { params: { tool: string } }) => {

  return (
    < div className='w-full'>
      {tool === "search-prospect" ? <LeadTable /> : tool === 'saved' ? <h1>Saved</h1> : tool === 'todo' ? <h1>To Do</h1> : tool === 'calendar'? <h1>Calendar</h1> : tool === 'email-manager' ? <h1>Email Manager</h1> : <h1>no page</h1> }
    </div >
  )
}

export default SearchPage