import React from 'react'
import ServicePage from './ServvicePage'
import Shelter from '../transform/Shelter'
import Joinmisson from '../transform/Joinmisson'
import Header from '../ui/Header'
import OurServices from '../transform/Ourservices'

const ServiceMainpage = () => {
    return (
        <div>
            <Header
                title={'Our Services'}
                subheading={'Promoting Animal Welfare Together'}
                description={'At our shelter charity, we believe that compassion has the power to change lives. Every animal deserves a loving home, and our shelter charity is committed to making that a reality.'}
            />
            <ServicePage />
            <OurServices  />
            <Shelter />
            <Joinmisson />
        </div>
    )
}

export default ServiceMainpage