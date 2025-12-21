import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

export const inngest = new Inngest({
  id: "talent-iq",
});

const syncUser = inngest.createFunction(

  { id: "sync-user" },
  { event: "clerk/user.created" },

  async ({ event }) => {

    console.log("🔥 syncUser triggered:", event.data.id);

    await connectDB();

    const { id, email_addresses, first_name, last_name, profile_image_url, } = event.data;

    // Safety check
    if (!email_addresses?.length) {
      console.log("❌ No email found for user:", id);
      return;
    }

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      profileImage: profile_image_url ?? "",
    }

    await User.create(newUser);

    await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });
  }
);

const deleteUser = inngest.createFunction(

  { id: "delete-user" },
  { event: "clerk/user.deleted" },

  async ({ event }) => {
    console.log("🔥 deleteUser triggered:", event.data.id);

    await connectDB();

    await User.deleteOne({ clerkId: event.data.id });

    await deleteStreamUser(id.toString());
  }
);

export const functions = [syncUser, deleteUser];
