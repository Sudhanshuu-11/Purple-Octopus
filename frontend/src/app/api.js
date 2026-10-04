import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "";

export async function createInquiry(payload) {
  try {
    const response = await axios.post(`${apiBaseUrl}/api/inquiries`, payload);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "We could not send your enquiry. Please try again.");
  }
}

export async function getProjects() {
  const response = await axios.get(`${apiBaseUrl}/api/projects`);
  return (response.data.data || []).map((project) => {
    const imageUrl = (value) => value && value.startsWith("/") ? `${apiBaseUrl}${value}` : value;
    return { ...project, image: imageUrl(project.image), avatar: imageUrl(project.avatar) };
  });
}

export async function createProject(formData) {
  try {
    const response = await axios.post(`${apiBaseUrl}/api/projects`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Could not save this profile. Please try again.");
  }
}
