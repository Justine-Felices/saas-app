import {getAllCompanions} from "@/lib/actions/companions.actions";
import CompanionCard from "@/components/ui/CompanionCard";
import {getSubjectColor} from "@/lib/utils";
import SearchInput from "@/components/ui/SearchInput";
import SubjectFilter from "@/components/ui/SubjectFilter";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

const CompanionsLibrary = async ({searchParams}: SearchParams) => {

    const user = await currentUser();
    if (!user) redirect('/sign-in');
    const filters = await searchParams;

    const subject = filters.subject ? filters.subject : "";
    const topic = filters.topic ? filters.topic : "";

    const companions = await getAllCompanions({subject, topic});

    // const sortedCompanions = [...companions].sort((a, b) => Number(b.bookmarked) - Number(a.bookmarked));

    return (
        <main>
            <section className="flex justify-between gap-4 max-sm:flex-col">
                <h1>
                    Companion Library
                </h1>
                <div className="flex gap-4">
                    <SearchInput/>
                    <SubjectFilter/>
                </div>
            </section>
            <section className="companions-grid">
                {companions.map((companion) => (
                    <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)}/>
                ))}
            </section>
        </main>
    );
};

export default CompanionsLibrary;