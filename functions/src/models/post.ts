import { db } from "../db";
import { BlendPost } from "./outputTypes";

export const createPost = async (post: BlendPost) => {
  const batch = db().batch();
  const postsRef = db().collection("posts");
  const postDocRef = postsRef.doc(post.id);

  const tagsRef = db().collection("tags");
  const tags = post.tags.reduce((acc, tag) => {
    const tagDocRef = tagsRef.doc(tag.unique);
    batch.set(tagDocRef, {
      title: tag.title,
      description: tag.description,
    });
    return {
      ...acc,
      [tag.unique]: tagDocRef,
    };
  }, {});

  const usersRef = db().collection("users");
  const userDocRef = usersRef.doc(post.user.id);
  batch.set(userDocRef, {
    ...post.user,
    updated_at: new Date(post.user.updated_at),
  });

  batch.set(postDocRef, {
    ...post,
    created_at: new Date(post.created_at),
    user: {
      username: post.user.username,
      profile_image: post.user.profile_image,
      name: post.user.name,
      details: userDocRef,
    },
    tags,
  });

  await batch.commit();
};

export const createPosts = async (posts: BlendPost[]) => {
  let batch = db().batch();
  const postsRef = db().collection("posts");
  const tagsRef = db().collection("tags");
  const usersRef = db().collection("users");

  const tagsCollection = posts.reduce((tags, post) => {
    post.tags.map((tag) => {
      if (tags.has(tag.unique)) {
        return;
      }

      const tagDocRef = tagsRef.doc(tag.unique);
      batch.set(tagDocRef, {
        title: tag.title,
        description: tag.description,
      });
      tags.set(tag.unique, tagDocRef);
    });

    return tags;
  }, new Map<string, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>());

  await batch.commit();
  batch = db().batch();

  const usersCollection = posts.reduce((users, post) => {
    if (users.has(post.user.id)) {
      return users;
    }

    const userDocRef = usersRef.doc(post.user.id);
    batch.set(userDocRef, {
      ...post.user,
      updated_at: new Date(post.user.updated_at),
    });

    users.set(post.user.id, userDocRef);
    return users;
  }, new Map<string, FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>());

  await batch.commit();
  batch = db().batch();

  for (const post of posts) {
    const postDocRef = postsRef.doc(post.id);
    batch.set(postDocRef, {
      ...post,
      created_at: new Date(post.created_at),
      user: {
        username: post.user.username,
        profile_image: post.user.profile_image,
        name: post.user.name,
        details: usersCollection.get(post.user.id),
      },
      tags: post.tags.reduce((tags, tag) => {
        return {
          ...tags,
          [tag.unique]: tagsCollection.get(tag.unique),
        };
      }, {}),
    });
  }

  await batch.commit();
};
