import React from 'react'

export default function loading() {
    return (
        <div className='loading flex-center h-screen'>
            <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
    )
}
