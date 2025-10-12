import React from 'react'
import CompanionCard from "@/components/ui/CompanionCard";
import CompanionsList from "@/components/ui/CompanionsList";
import CTA from "@/components/ui/CTA";
import {getAllCompanions, getRecentSession} from "@/lib/actions/companions.actions";
import {getSubjectColor} from "@/lib/utils";
import {currentUser} from "@clerk/nextjs/server";


const Page = async () => {
    const companions = await getAllCompanions({limit: 3})
    const recentSessionsCompanions = await getRecentSession(10);

    const user = await currentUser();

    return (
        <main>
            <h1 className="text-2xl">Popular Companions</h1>
            <section className="home-section">

                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}


            </section>

            <section className="home-section">
                {user && <CompanionsList
                    title="Recently Completed Sessions"
                    companions={recentSessionsCompanions}
                    classNames="w-2/3 max-lg:w-full"

                />}
                <CTA/>
            </section>
        </main>


    )
}

export default Page