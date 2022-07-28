interface Urls {
  full: string;
  raw: string;
  regular: string;
  small: string;
  small_s3: string;
  thumb: string;
}

interface Links {
  download: string;
  download_location: string;
  html: string;
  self: string;
}

interface FoodDrink {
  approved_on: Date;
  status: string;
}

interface TopicSubmissions {
  "food-drink": FoodDrink;
}

interface Links2 {
  followers: string;
  following: string;
  html: string;
  likes: string;
  photos: string;
  portfolio: string;
  self: string;
}

interface ProfileImage {
  large: string;
  medium: string;
  small: string;
}

interface Social {
  instagram_username: string;
  paypal_email?: any;
  portfolio_url: string;
  twitter_username?: any;
}

interface User {
  accepted_tos: boolean;
  bio: string;
  first_name: string;
  for_hire: boolean;
  id: string;
  instagram_username: string;
  last_name: string;
  links: Links2;
  location: string;
  name: string;
  portfolio_url: string;
  profile_image: ProfileImage;
  social: Social;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  twitter_username?: any;
  updated_at: Date;
  username: string;
}

interface Type {
  pretty_slug: string;
  slug: string;
}

interface Category {
  pretty_slug: string;
  slug: string;
}

interface Subcategory {
  pretty_slug: string;
  slug: string;
}

interface Ancestry {
  category: Category;
  subcategory: Subcategory;
  type: Type;
}

interface Health {
  approved_on: Date;
  status: string;
}

interface TopicSubmissions2 {
  health: Health;
}

export interface CoverPhoto {
  alt_description: string;
  blur_hash: string;
  categories: any[];
  color: string;
  created_at: Date;
  current_user_collections: any[];
  description: string;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: Links;
  promoted_at: Date;
  sponsorship?: any;
  topic_submissions: TopicSubmissions2;
  updated_at: Date;
  urls: Urls;
  user: User;
  width: number;
}

interface Source {
  ancestry: Ancestry;
  cover_photo: CoverPhoto;
  description: string;
  meta_description: string;
  meta_title: string;
  subtitle: string;
  title: string;
}

interface Tag {
  source?: Source;
  title: string;
  type: string;
}

export interface Post {
  alt_description: string;
  blur_hash: string;
  categories: any[];
  color: string;
  created_at: Date;
  current_user_collections: any[];
  description: string;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: Links;
  promoted_at: Date;
  sponsorship?: any;
  tags: Tag[];
  topic_submissions: TopicSubmissions;
  updated_at: Date;
  urls: Urls;
  user: User;
  width: number;
}
