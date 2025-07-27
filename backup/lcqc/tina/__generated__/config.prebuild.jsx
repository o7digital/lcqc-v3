// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: "47bc5fe7-6887-4669-a245-f6c384126521",
  token: "5cb6c30bbf0bf643747ce33b885d45241d9579a1",
  // ← lo consigues en tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "posts",
        label: "Posts",
        path: "content/posts",
        format: "md",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string"
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
