import axios from "axios";
import { Base_url } from "../BAseUrl";

export const fetchAnimals = async () => {
  const response = await axios.get(`${Base_url}/programe/all`);
  return response.data;
};

export const fetchTestimonials = async () => {
  const res = await fetch(`${Base_url}/testimonials/all`);
  if (!res.ok) {
    throw new Error("Failed to fetch testimonials");
  }
  return res.json();
};

export const fetchTeamData = async () => {
  const response = await fetch(`${Base_url}/ourteam/all`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchGalleryData = async () => {
  const res = await fetch(`${Base_url}/gallery/all`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data;
};

export const fetchEmail = async () => {
  const res = await fetch(`${Base_url}/email/all`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data;
};
export const fetchSocialmedia = async () => {
  const res = await fetch(`${Base_url}/socialmedia/all`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data;
};

export const fetchAddress = async () => {
  const res = await fetch(`${Base_url}/address/all`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data;
};
export const fetchPhonenumber = async () => {
  const res = await fetch(`${Base_url}/phone/all`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data;
};
export const fetchServices = async () => {
  const res = await fetch(`${Base_url}/service/all`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data;
};

export const fetchWishlist = async () => {
  const res = await fetch(`${Base_url}/wishlist`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data?.items || [];
};

export const fetchRescuestories = async () => {
  const res = await fetch(`${Base_url}/rescue-story`);
  if (!res.ok) throw new Error("Network response was not ok ");
  const data = await res.json();
  return data;
};

export const fecthSingleNeeds = async (id) => {
  const res = await fetch(`${Base_url}/needs/single/${id}`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data;
};
export const fetchServiceById = async (id) => {
  const res = await fetch(`${Base_url}/service/single/${id}`);
  if (!res.ok) throw new Error("Failed to fetch service details");
  return res.json();
};

export const fecthNeeds = async () => {
  const res = await fetch(`${Base_url}/needs/all`);
  if (!res.ok) throw new Error("Network response was not ok ");
  const data = await res.json();
  return data;
};

export const fetchBlogs = async () => {
  const res = await fetch(`${Base_url}/blog/all`);
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data;
};
