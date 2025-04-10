import { getProfileDataService } from "../models/profileModel.js";
import { getRecentSupportsService } from "../models/profileModel.js";
import { updatePublicProfileService } from "../models/profileModel.js";
import { createPublicProfileService } from "../models/profileModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const getProfileData = async (req, res, next) => {
  const { username } = req.params;
  try {
    const profiledata = await getProfileDataService(username);
    handleResponse(res, 201, "Fetched Data successfully", profiledata);
    next();
  } catch (error) {
    next(error);
  }
};

export const getRecentSupports = async (req, res, next) => {
  const { username } = req.params;

  try {
    const recentsupports = await getRecentSupportsService(username);
    if (recentsupports) {
      handleResponse(res, 201, "Fetched Data successfully", recentsupports);
    } else {
      handleResponse(res, 200, "No records found");
    }
  } catch {
    next(error);
  }
};

export const updatePublicProfileData = async (req, res, next) => {
  const { user_id } = req.params;
  const { bio, instagram, twitter, linkedin, github } = req.body;

  try {
    const updatedProfile = await updatePublicProfileService(
      user_id,
      bio,
      instagram,
      twitter,
      linkedin,
      github
    );
    if (updatedProfile) {
      handleResponse(res, 200, "Profile updated successfully", updatedProfile);
    } else {
      handleResponse(res, 400, "Failed to update profile");
    }
  } catch (error) {
    next(error);
  }
};

export const createPublicProfileData = async (req, res, next) => {
  const { user_id } = req.params;
  const { bio, instagram, twitter, linkedin, github } = req.body;

  try {
    const updatedProfile = await createPublicProfileService(
      user_id,
      bio,
      instagram,
      twitter,
      linkedin,
      github
    );
    if (updatedProfile) {
      handleResponse(res, 200, "Profile created successfully", updatedProfile);
    } else {
      handleResponse(res, 400, "Failed to create profile");
    }
  } catch (error) {
    next(error);
  }
};
