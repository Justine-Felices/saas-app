"use client"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {subjects} from "@/constants";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";

function SubjectFilter() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";

    const [subject, setSubject] = useState(query);

    useEffect(() => {
        let newURL = "";
        if (subject === "all") {
            newURL = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            });
            router.push(newURL, {scroll: false});
        } else {
            newURL = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject,
            });
            router.push(newURL, {scroll: false});
        }
    }, [subject, router, searchParams])


    return (
        <div className="">
            <Select onValueChange={setSubject} value={subject}>
                <SelectTrigger
                    className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
                    <SelectValue placeholder="Select Subject"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {subjects.map((subject) => (
                        <SelectItem
                            key={subject}
                            value={subject}
                            className="capitalize"
                        >
                            {subject}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default SubjectFilter;