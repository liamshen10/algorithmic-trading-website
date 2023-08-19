import { createAsyncThunk } from '@reduxjs/toolkit';
import * as profileService from "./profile-service";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile", async (profileId) => {
    const profile = await profileService.getProfile(profileId);
    return profile;
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile", async (id, profileUpdate) => {
    const updatedProfile = await profileService.updateProfile(id, profileUpdate);
    return updatedProfile;
  }
);
