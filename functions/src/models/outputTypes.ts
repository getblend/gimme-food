interface Urls {
  regular: string;
  small_s3: string;
  download: string;
  blur_hash: string;
}

interface User {
  id: string;
  updated_at: Date;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  bio: string;
  location: string;
  profile_image: string;
  social: {
    twitter_username?: string;
    instagram_username?: string;
    paypal_email?: string;
    portfolio_url: string;
  };
}

export interface BlendPost {
  id: string;
  created_at: Date;
  width: number;
  height: number;
  color: string;
  description: string;
  alt_description: string;
  urls: Urls;
  likes: number;
  user: User;
  tags: Tag[];
}

interface Tag {
  unique: string;
  title: string;
  description: string;
}
