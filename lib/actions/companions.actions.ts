"use server"

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";

export const createCompanion = async (formData: CreateCompanion) => {
    const {userId: author} = await auth();
    const supabase = createSupabaseClient();

    const {data, error} = await supabase
        .from("companions")
        .insert({...formData, author})
        .select();
    if (error || !data) throw new Error(error?.message || "Failed to create companion");

    return data[0];
}

export const getAllCompanions = async ({limit = 10, page = 1, subject, topic}: GetAllCompanions) => {
    const supabase = createSupabaseClient();

    let query = supabase.from("companions").select();

    if (subject && topic) {
        query = query.ilike("subject", `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if (subject) {
        query = query.ilike("subject", `%${subject}%`)
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const {data: companions, error} = await query;

    if (error) throw new Error(error?.message || "Failed to get companions");

    return companions;
}

export const getDefaultCompanions = async () => {
    const supabase = createSupabaseClient();
    const {data, error} = await supabase
        .from("default_companions")
        .select()

    console.log('Data:', data);
    console.log('Error:', error);

    if (error) throw new Error(error?.message || "Failed to get default companions");
    return data;
}

export const getCompanion = async (id: string) => {
    const supabase = createSupabaseClient();

    const {data: defaultCompapanionsData, error: defaultCompanionsError} = await supabase
        .from("default_companions")
        .select()
        .eq("id", id);

    if (defaultCompanionsError) {
        throw new Error(defaultCompanionsError?.message || "Failed to get companion");
    }
    if (defaultCompapanionsData && defaultCompapanionsData.length > 0) {
        return defaultCompapanionsData[0];
    }

    const {data: companionsData, error: companionsError} = await supabase
        .from("companions")
        .select()
        .eq("id", id);

    if (companionsError) {
        throw new Error(companionsError?.message || "Failed to get companion");
    }

    return companionsData[0];
}

export const addToSessionHistory = async (companionId: string) => {
    const {userId} = await auth();
    const supabase = createSupabaseClient();
    const {data, error} = await supabase
        .from('session_history')
        .insert({
            companion_id: companionId,
            user_id: userId
        });
    if (error) throw new Error(error.message);

    return data;
}

export const getRecentSession = async (limit = 10) => {
    const supabase = createSupabaseClient();
    const {data, error} = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .order('created_at', {ascending: false})
        .limit(limit)
    if (error) throw new Error(error.message);

    return data.map(({companions}) => companions)
}

export const getUserSession = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const {data, error} = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', {ascending: false})
        .limit(limit)
    if (error) throw new Error(error.message);

    return data.map(({companions}) => companions)
}

export const getUserCompanions = async (userId: string) => {
    const supabase = createSupabaseClient();
    const {data, error} = await supabase
        .from('companions')
        .select()
        .eq('author', userId)

    if (error) throw new Error(error.message);

    return data;
}

export const newCompanionPermissions = async () => {
    const {userId, has} = await auth();
    const supabase = createSupabaseClient();

    let limit = 0;

    if (has({plan: 'pro'})) {
        return true
    } else if (has({feature: '3_companions_limit'})) {
        limit = 3;
    } else if (has({feature: '10_companions_limit'})) {
        limit = 1;
    }

    const {data, error} = await supabase
        .from('companions')
        .select('id', {count: 'exact'})
        .eq('author', userId)

    if (error) throw new Error(error.message);

    const companionCount = data?.length;

    if (companionCount >= limit) {
        return false;
    } else {
        return true;
    }


}