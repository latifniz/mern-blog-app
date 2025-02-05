import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Axios } from "../config/api";
import { handleAxiosError } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import ShowAlert from "../components/showAlert";
import axios from "axios";

type FormData = {
  title?: string;
  content?: string;
  image?: string;
  category?: string;
};

const CreatePost = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState<
    number | null
  >(null);
  const [imageFileUploadError, setImageFileUploadError] = useState<
    string | null
  >(null);
  const [formData, setFormData] = useState<FormData>({});
  const [publishError, setPublishError] = useState<string | undefined>(
    undefined
  );
  const navigate = useNavigate();

  // Upload the image to Cloudinary
  const handleUploadImage = async () => {
    try {
      if (!imageFile) {
        setImageFileUploadError("Please select an image");
        return;
      }

      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      ); // Use Vite environment variable
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME); // Use Vite environment variable

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: any) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setImageFileUploadingProgress(progress);
        },
      };

      // Upload the image to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData,
        config
      );

      const cloudinaryImageURL = response.data.secure_url;
      setFormData((prev) => ({ ...prev, image: cloudinaryImageURL }));
      setImageFileUploadingProgress(null);
      setImageFileUploadError(null);
    } catch (error) {
      setImageFileUploadError("Image upload failed");
      setImageFileUploadingProgress(null);
      console.error(error);
    }
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(`/post/create`, formData);
      navigate(`/post/${data.data.post.slug}`);
    } catch (error) {
      const err = await handleAxiosError(error);
      console.error(err);
      setPublishError(err);
    }
  };

  return (
    <div className="max-w-4xl p-3 mx-auto mb-20">
      <h1 className="text-3xl font-semibold text-center my-7">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Select
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="webtech">WebTech</option>
            <option value="history">History</option>
            <option value="science">Science</option>
            <option value="science-fiction">Science & Fiction</option>
            <option value="mystery">Mystery</option>
            <option value="facts">Facts</option>
            <option value="kids">Kids</option>
            <option value="philosophy">Philosophy</option>
          </Select>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 p-3 border-2 border-teal-500 border-dashed md:flex-row">
          <FileInput
            className="w-full md:flex-1"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          <Button
            type="button"
            gradientDuoTone={"purpleToBlue"}
            size={"sm"}
            outline
            onClick={handleUploadImage}
            disabled={imageFileUploadingProgress !== null}
            className="w-full md:w-32"
          >
            {imageFileUploadingProgress ? "Uploading..." : "Upload image"}
          </Button>
        </div>
        {imageFileUploadError && (
          <ShowAlert
            message={imageFileUploadError}
            type="failure"
            onClose={() => setImageFileUploadError(null)}
            className={"-m-0 mx-1/2"}
          />
        )}
        {formData?.image && (
          <img
            src={formData.image}
            alt="uploaded image"
            className="object-cover w-full h-72"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="mb-12 h-72"
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, content: value }));
          }}
        />
        <Button type="submit" gradientDuoTone={"purpleToPink"}>
          Publish
        </Button>
      </form>
      {publishError && (
        <ShowAlert
          message={publishError}
          type="failure"
          onClose={() => setPublishError(undefined)}
          errorDuration={10000}
        />
      )}
    </div>
  );
};

export default CreatePost;
