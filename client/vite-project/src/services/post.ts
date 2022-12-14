import { toastFail, toastSuccess } from "../components/Provider/Toast";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { httpClient } from "./service-axios";
import { api } from "./service-api";

export type IPosts = {
  _id?: string;
  title: string;
  message: string;
  creator: string;
  tags: string;
  selectedFile: File[];
  likeCount?: {
    type: number;
  };
  createdAt?: {
    type: Date;
  };
};
const fetchAllPosts = () => {
  return httpClient.get<Array<IPosts>>(api.getPosts);
};
const useGellAllPosts = () => {
  return useQuery(api.getPosts, fetchAllPosts, {
    select: ({ data }) => {
      return data;
    },

    onError: () => {
      toastFail("Failed to Fetch Post");
    },
  });
};

const sendPosts = (post: IPosts) => {
  return httpClient.post(api.createPosts, post);
};
const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation(sendPosts, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.getPosts);
      toastSuccess("Post Created Successfully");
    },
    onError: () => {
      toastFail("Failed to create post");
    },
  });
};

const updatePosts = (post: IPosts) => {
  return httpClient.patch(
    api.updatePost.replace(":id", post._id as string),
    post
  );
};

const useUpdatePosts = () => {
  const queryClient = useQueryClient();

  return useMutation([api.updatePost], updatePosts, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.getPosts);
      toastSuccess("Post Updated Successfully");
    },
    onError: () => {
      toastFail("Failed to update post");
    },
  });
};

const deletePost = (id: string) => {
  return httpClient.delete(api.deletePost.replace(":id", id));
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation([api.deletePost], deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.getPosts);
      toastSuccess("Deleted Successfully");
    },
    onError: () => {
      toastFail("FAiled to Delete post");
    },
  });
};
export { useGellAllPosts, useCreatePost, useUpdatePosts, useDeletePost };
