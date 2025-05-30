"use server"
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { transactionSchema } from "./validation";
import { redirect } from "next/navigation";


export async function createTransaction(formData: {
    type: string;
    category: string;
    amount: number;
    description: string;
    created_at: string;
}) {
    // Validate the form data if necessary
    transactionSchema.parse({
        type: formData.type,
        category: formData.category,
        amount: formData.amount,
        description: formData.description,
        created_at: formData.created_at,
    });


    try {
        const supabase = await createClient();
        const { error } = await supabase
            .from("transactions")
            .insert({
            type: formData.type,
            category: formData.category,
            amount: formData.amount,
            description: formData.description,
            created_at: formData.created_at,
            });

        if (error) {
            throw error;
        }

        // Revalidate the dashboard page to show new data
        revalidatePath('/dashboard');
        
    } catch (error) {
        console.error('Error creating transaction:', error);
        throw error;
    }
}

export async function updateTransaction(id: string, formData: {
    type: string;
    category: string;
    amount: number;
    description: string;
    created_at: string;
}) {
    // Validate the form data if necessary
    transactionSchema.parse({
        type: formData.type,
        category: formData.category,
        amount: formData.amount,
        description: formData.description,
        created_at: formData.created_at,
    });

    try {
        const supabase = await createClient();
        const { error } = await supabase
            .from("transactions")
            .update({
                type: formData.type,
                category: formData.category,
                amount: formData.amount,
                description: formData.description,
                created_at: formData.created_at,
            })
            .eq("id", id);

        if (error) {
            throw error;
        }

        // Revalidate the dashboard page to show updated data
        revalidatePath('/dashboard');
        
    } catch (error) {
        console.error('Error updating transaction:', error);
        throw error;
    }
}

export async function fetchTransactions(range, offset = 0, limit = 10){
    const supabase = await createClient()
    const{data, error} = await supabase
        .rpc('fetch_transactions', {
            range_arg: range,
            limit_arg: limit,
            offset_arg: offset

        })
    if (error) {
        console.error("Error fetching transactions:", error)
        return <div>Error loading transactions</div>
    }
    
    return data;
}

export async function deleteTransaction(id: string) {
  console.log("Deleting transaction with ID:", id);
  
  if (!id) {
    throw new Error("Transaction ID is required");
  }

  try {
    const supabase = await createClient();
    
    // Execute the delete operation without selecting count
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);
    
    if (error) {
      console.error("Error deleting transaction:", error);
      throw error;
    }

    console.log("Transaction deleted successfully");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error in deleteTransaction:", error);
    return { success: false, message: error.message };
  }
}

export async function login(
    prevState: any, 
    formData: FormData
): Promise<{ error?: boolean; message: string }> {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOtp({
        email: formData.get("email") as string,
        options: {
            shouldCreateUser: true
        }
    });

    if(error) {
        return {
            error: true,
            message: "Error authenticating"
        };
    }
    
    return {
        message: `Email sent to ${formData.get("email") as string}`
    };
}

export async function Signout(){
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("Error signing out:", error);
        throw error;
    }

    // Revalidate the dashboard page to reflect the sign-out state
    redirect("/login")
    
}


export async function uploadAvatar(
  prevState: { error: boolean; message: string },
  formData: FormData
) {
  const supabase = await createClient();

  const file = formData.get("avatar");
  if (!file || !(file instanceof File)) {
    console.error("No file uploaded or invalid file type");
    return { error: true, message: "No file uploaded or invalid file type" };
  }

  if (!file.type.startsWith("image/")) {
    console.error("Invalid file type. Only images are allowed.");
    return { error: true, message: "Invalid file type. Only images are allowed." };
  }

  // Get user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Failed to retrieve user", userError);
    return { error: true, message: "Failed to retrieve user info" };
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}.${fileExt}`;

  // Get the current avatar before uploading the new one
  const oldAvatar = user?.user_metadata?.avatar;

  // Upload new avatar
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, { upsert: true });

  if (uploadError) {
    console.error("Error uploading avatar:", uploadError);
    return { error: true, message: "Error uploading avatar" };
  }

  // Remove old avatar if it exists and is different from the new one
  if (oldAvatar && oldAvatar !== fileName) {
    const { error: removeError } = await supabase.storage
      .from("avatars")
      .remove([oldAvatar]);
      
    if (removeError) {
      console.error("Error removing old avatar:", removeError);
      // Continue anyway since the new avatar is uploaded
    }
  }

  // Save only the file name in user metadata
  const { error: metadataError } = await supabase.auth.updateUser({
    data: {
      avatar: fileName
    }
  });

  if (metadataError) {
    console.error("Error updating user metadata:", metadataError);
    return { error: true, message: "Error updating user data" };
  }

  revalidatePath("/dashboard/settings/avatar");

  return { error: false, message: "Avatar uploaded successfully!" };
}

export async function updateSettings(
  prevState: { error: boolean; message: string },
  formData: FormData
) {
  const supabase = await createClient()
  const {error} = await supabase.auth.updateUser({
    data:{
        fullName : formData.get("fullName") as string,
        email: formData.get("email") as string,
        defaultView: formData.get("defaultView") as string
    }
  });
  
  if (error){
      console.error("Error updating settings:", error);
      return { error: true, message: "Error updating settings" };
  }
  
  revalidatePath("/dashboard/settings");
  return { error: false, message: "Settings updated successfully!" };
}