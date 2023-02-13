import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: "dkyialww7",
    api_key: "252867222822417",
    api_secret: "7JMJwL5bjpmYUKxikhJgzUPkmto",
  });
};

export default cloudinaryConfig;
