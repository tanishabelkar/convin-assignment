import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buckets: [
    {
      key: "1",
      label: "TV Shows",
      videos: [
        {
          link: "nhB5oQgQpOI",
          title: "How I Met Your Mother Alternate Ending",
        },
        { link: "XYzfGMihLjQ", title: "Modern Family" },
        { link: "gO8N3L_aERg", title: "Fire Drill - The Office" },
        { link: "uuSwnbb65f4", title: "Cold Opens Parks and Rec" },
        { link: "rNCKPt0ghqs", title: "Game Night - TBBT" },
      ],
    },
    {
      key: "2",
      label: "Songs",
      videos: [
        { link: "YcSP1ZUf1eQ", title: "Nonsense - Sabrina Carpenter" },
        { link: "mt9xg0mmt28", title: "Tum Se Hi - Jab We Met" },
        { link: "uPD0QOGTmMI", title: "Die For You - Weeknd" },
        { link: "fdubeMFwuGs", title: "Ilahi - Yeh Jawani Hai Deewani" },
        { link: "SmaY7RfBgas", title: "Gul - Anuv Jain" },
        { link: "mWRsgZuwf_8", title: "Demons - Thunder" },
        { link: "YykjpeuMNEk", title: "Hymn for the Weekend - Coldplay" },
      ],
    },
    {
      key: "3",
      label: "Marvel",
      videos: [
        {
          link: "sj9J2ecsSpo",
          title: "Wanda Vision Trailer",
        },
        {
          link: "5VYb3B1ETlk",
          title: "Hawkeye Trailer",
        },
      ],
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
