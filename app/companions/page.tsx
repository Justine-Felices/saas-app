import {getAllCompanions} from "@/lib/actions/companions.actions";
import CompanionCard from "@/components/ui/CompanionCard";
import {getSubjectColor} from "@/lib/utils";
import SearchInput from "@/components/ui/SearchInput";
import SubjectFilter from "@/components/ui/SubjectFilter";

const CompanionsLibrary = async ({searchParams}: SearchParams) => {
    const filters = await searchParams;

    const subject = filters.subject ? filters.subject : "";
    const topic = filters.topic ? filters.topic : "";

    const companions = await getAllCompanions({subject, topic});

    console.log(companions);


    return (
        <main>
            <section className="flex jsutify-between gap-4 max-sm:flex-col">
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