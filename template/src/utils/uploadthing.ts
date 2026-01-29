import {
  generateUploadButton,
} from "@uploadthing/react";

import type { OurFileRouter } from "../app/api/v1/uploadthing/core";

// UploadButton component for uploading files using Uploadthing
export const UploadButton = generateUploadButton<OurFileRouter>({
    url: "/api/v1/uploadthing",
});
