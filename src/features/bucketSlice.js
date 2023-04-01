import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buckets: [
    {
      key: "1",
      label: "SNL Videos",
      videos: [
        { link: "GfqjuRwqzZE", title: "Video 1" },
        { link: "QZvClZxlkYE", title: "Video 2" },
      ],
    },
    {
      key: "2",
      label: "Songs",
      videos: [{ link: "wIft-t-MQuE", title: "Video 1" }],
    },
  ],
  active: 1,
};

const YouTubeGetID = (url) => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match[7];
};

const bucketSlice = createSlice({
  name: "bucket",
  initialState,
  reducers: {
    currentBucket: (state, action) => {
      state.active = Number(action.payload);
    },
    createNewBucket: (state, action) => {
      state.buckets.push({
        key: String(state.buckets.length),
        videos: [],
        label: action.payload,
      });
    },
    editBucket: (state, action) => {
      state.buckets[action.payload.ind].label = action.payload.bucket;
    },
    addVideo: (state, action) => {
      state.buckets.forEach((b) => {
        if (b.label === action.payload.label) {
          b.videos.push({
            title: action.payload.title,
            link: YouTubeGetID(action.payload.link),
          });
        }
      });
      console.log(action);
    },
    deleteVideo: (state, action) => {
      const { inds, label } = action.payload;
      console.log(action.payload);
      state.buckets[label].videos = state.buckets[label].videos.filter(
        (_, ind) => {
          return !(ind in inds);
        }
      );
    },
    moveVideo: (state, action) => {
      const { inds, labelFrom, labelTo } = action.payload;
      console.log(labelFrom);
      let i2;
      state.buckets.forEach((b, i) => {
        if (b.label === labelTo) i2 = i;
      });
      console.log("%s %d", typeof i2, i2);
      inds.forEach((i) => {
        console.log(inds);
        state.buckets[i2].videos.push(state.buckets[labelFrom].videos[i]);
        console.log(state.buckets[i2].videos);
      });

      state.buckets[labelFrom].videos = state.buckets[labelFrom].videos.filter(
        (_, ind) => {
          return !(ind in inds);
        }
      );
    },
  },
});

export const {
  createNewBucket,
  editBucket,
  currentBucket,
  addVideo,
  deleteVideo,
  moveVideo,
} = bucketSlice.actions;

export const selectBucketLabels = (state) => {
  return state.bucket.buckets.map((b, ind) => {
    return { label: b.label, key: ind + 1, value: b.label };
    // return { label: b.label, key: b.key };
  });

  // return [
  //   { label: "SNL", key: 0 },
  //   { label: "Songs", key: 1 },
  // ];
};

export const selectBuckets = (state) => state.bucket.buckets;

export const selectActiveBucket = (state) => state.bucket.active;

export default bucketSlice.reducer;
