<template>
  <div class="youtube-video">
    <iframe
      :width="width"
      :height="height"
      :src="embedUrl"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "YoutubeVideo",
  props: {
    videoId: {
      type: String,
      required: true,
    },
    width: {
      type: [String, Number],
      default: 560,
    },
    height: {
      type: [String, Number],
      default: 315,
    },
  },
  computed: {
    embedUrl() {
      return `https://www.youtube.com/embed/${this.videoId}`;
    },
  },
};
</script>

<style scoped>
.youtube-video {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  /* 16:9 aspect ratio */
  overflow: hidden;
}

.youtube-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
