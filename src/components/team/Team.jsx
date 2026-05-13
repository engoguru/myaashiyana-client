import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Header from '../ui/Header'
import { fetchTeamData } from '../reasctquery/api'

const Team = () => {
    const { data: teamdata, error, isLoading } = useQuery({
        queryKey: ['team'],
        queryFn: fetchTeamData,
    })

    if (isLoading) {
        return <div>Loading team members...</div>
    }

    if (error) {
        return <div>Error loading team members: {error.message}</div>
    }

    return (
        <div className="bg-[#F7FFF5]">
            <Header
                title={'Our Team'}
                subheading={'Changing Lives Through Shelter Support'}
            
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-6 md:px-10 font-Lora">
                {teamdata.map((member, index) => (
                    <div
                        key={index}
                        className="group relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 bg-[#072724]"
                    >
                        <div className="relative w-full h-96 overflow-hidden">
                            <img
                                src={member.images?.[0]?.url || '/assets/image/rescue.jpg'}
                                alt={member.name}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-4 left-4 bg-[#BEFD95] text-black text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                                {member.position}
                            </div>
                        </div>
                        <div className="py-4 px-3 text-center">
                            <h3 className="text-xl font-bold text-[#D88E3C]">{member.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Team
