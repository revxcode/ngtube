import { defineStore } from "pinia";

export const useQuerySearch = defineStore("querySearch", {
  state: () => ({
    query: "",
  }),

  actions: {
    setQuery(query) {
      this.query = query;
    },
  },
});
