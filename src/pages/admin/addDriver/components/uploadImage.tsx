import { Form, Image } from "antd";
import { useEffect, useRef } from "react";
import { FiPlus } from "react-icons/fi";

const UploadImage = ({
  setImageFile,
  imageFile,
  setImageBase64,
  imageBase64,
  imageError,
  setImageError,
}: any) => {
  const hiddenFileInput: any = useRef(null);
  const handleClick = (event: any) => {
    hiddenFileInput && hiddenFileInput?.current?.click();
  };

  const convertBase64 = async (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (event: any) => {
    setImageError(false);
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    setImageFile(fileUploaded);
  };

  const handleRemoveImage = (event: any) => {
    setImageBase64(null);
    setImageFile(null);
    setImageError(false);
  };

  useEffect(() => {
    (async () => {
      imageFile && setImageBase64(await convertBase64(imageFile));
    })();
    console.log(imageFile);
  }, [imageFile]);

  return (
    <div className=" flex flex-row items-center gap-2">
      {imageBase64 && (
        <div className=" overflow-hidden rounded-xl">
          <Image src={imageBase64} height={110} alt="Drivers Photo" />
        </div>
      )}
      {!(imageBase64 && imageFile) ? (
        <>
          <button
            type="button"
            className={` flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-white hover:brightness-95 ${
              imageError ? "text-red-500" : "text-gray-700"
            }`}
            onClick={handleClick}
          >
            <div className=" text-2xl">
              <FiPlus />
            </div>
            Upload Image
          </button>
          {imageError && <div className=" text-red-500">Photo is required</div>}
          <input
            accept="image/png, image/gif, image/jpeg"
            type="file"
            onChange={handleChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </>
      ) : (
        <button
          type="button"
          onClick={handleRemoveImage}
          className=" cursor-pointer rounded border border-solid border-gray-500 bg-white text-gray-500 hover:brightness-95"
        >
          Remove Image
        </button>
      )}
    </div>
  );
};

export default UploadImage;
