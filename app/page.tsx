import React from 'react'
import CompanionCard from "@/components/ui/CompanionCard";
import CompanionsList from "@/components/ui/CompanionsList";
import CTA from "@/components/ui/CTA";
import {recentSessions} from "@/constants";


const Page = () => {
    return (
        <main>
            <h1 className="text-2xl">Popular Companions</h1>
            <section className="home-section">
                <CompanionCard
                    id="123"
                    name="Neura the Brainy Explorer"
                    topic="Newral Network of The Brain"
                    subject="Science"
                    duration={45}
                    color="#ffda6e"
                />
                <CompanionCard
                    id="1234"
                    name="Countsy the Number Wizard"
                    topic="Derivative and Integrals"
                    subject="Mathematics"
                    duration={45}
                    color="e5e0ff"
                />
                <CompanionCard
                    id="123"
                    name="Verba the Vocabulary Builder"
                    topic="Language"
                    subject="English Literature"
                    duration={30}
                    color="#bde7ff"
                />
            </section>

            <section className="home-section">
                <CompanionsList
                    title="Recently Completed Sessions"
                    companions={recentSessions}
                    classNames="w2/3 max-lg:w-full"

                />
                <CTA/>
            </section>
        </main>


    )
}

export default Page