import React from 'react';
import CompanionForm from "@/components/ui/CompanionForm";

const NewCompanion = () => {
    return (
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
            <article className="w-full flex gap-4 flex-col">
                <h1>Companion Builder</h1>

                <CompanionForm/>
            </article>
        </main>
    );
};

export default NewCompanion;