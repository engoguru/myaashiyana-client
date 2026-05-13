import React from 'react'
import Header from '../ui/Header'
import Photos from './Photos'

const Gallery = () => {
    return (
        <div className=''>
            <Header
                title={' Our Gallery'}
                subheading={'Partnering with Our Shelter Charity'}
                description={'At our shelter charity, we believe that compassion has the power to change lives. Every animal deserves a loving home, and our shelter charity is committed to making that a reality.'}
            />
            <Photos/>
        </div>
    )
}

export default Gallery