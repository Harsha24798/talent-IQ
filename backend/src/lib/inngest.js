import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({
  id: "harsha-talent-iq",
  dev: true,
});

export const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    console.log("🔥 syncUser triggered:", event.data.id);

    await connectDB();

    const {
      id,
      email_addresses,
      first_name,
      last_name,
      profile_image_url,
    } = event.data;

    // Safety check
    if (!email_addresses?.length) {
      console.log("❌ No email found for user:", id);
      return;
    }

    await User.create({
      clerkId: id,
      email: email_addresses[0].email_address,
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      profileImage: profile_image_url ?? "",
    });
  }
);

// ✅ MUST be exported (critical)
export const deleteUser = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    console.log("🔥 deleteUser triggered:", event.data.id);

    await connectDB();

    await User.deleteOne({ clerkId: event.data.id });
  }
);

// ✅ Functions array
export const functions = [syncUser, deleteUser];
